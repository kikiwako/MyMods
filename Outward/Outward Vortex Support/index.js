const path = require('path');
const winapi = require('winapi-bindings');
const { fs, log, util } = require('vortex-api');

const NEXUS_GAME_ID = 'outward';
const STEAMAPP_ID = '794260';
const GOGAPP_ID = '2147483078';

const GAME_ART = 'gameart.jpg';

// Need to confirm if this is the right ID for epic store
// const EPICAPP_ID = 'b9fcb93638bc4ff4baa77cc0a71ded42';

const BEPINEX_DOWNLOAD = "https://github.com/BepInEx/BepInEx/releases";
const PARTIALITY_WRAPPER_DOWNLOAD = "https://github.com/sinai-dev/BepInEx-Partiality-Wrapper/releases";

const MONO_BRANCH_WIKI = "https://outward.gamepedia.com/Installing_Mods#Modding_Branch";
const BEPINEX_WIKI = "https://outward.gamepedia.com/Installing_Mods#BepInEx_Loader";

function main(context) {
    context.registerGame({
        id: NEXUS_GAME_ID,
        name: 'Outward',
        mergeMods: true,
        queryPath: findGame,
        supportedTools: [],
        queryModPath: () => '',
        logo: 'gameart.jpg',
        executable: () => 'Outward.exe',
        requiredFiles: [
            'Outward.exe',
            'UnityPlayer.dll'
        ],
        setup: (discovery) => prepareForModding(discovery, context.api),
        environment: {
            SteamAPPId: STEAMAPP_ID,
        },
        details: {
            steamAppId: STEAMAPP_ID,
            gogAppId: GOGAPP_ID,
        },
    });

    context.registerInstaller(
        'outward-mod',
        25,
        (files, gameId) => testSupportedContent(files, gameId, context.api),
        installContent
    );

    return true
}

function findGame() {
    try {
        const instPath = winapi.RegGetValue(
            'HKEY_LOCAL_MACHINE',
            'SOFTWARE\\WOW6432Node\\GOG.com\\Games\\' + GOGAPP_ID,
            'PATH');
        if (!instPath) {
            throw new Error('empty registry key');
        }
        return Promise.resolve(instPath.value);
    } catch (err) {
        return util.GameStoreHelper.findByAppId([STEAMAPP_ID, GOGAPP_ID])
            .then(game => game.gamePath);
    }
}

function prepareForModding(discovery, api) {
    return checkMonoBranch(discovery, api)
        && checkBepInExInstallation(discovery, api)
        && checkPartialityWrapperInstallation(discovery, api);
}

function checkMonoBranch(discovery, api) {
    return fs.readdirAsync(path.join(discovery.path, 'MonoBleedingEdge'))
        .catch(() => {
            api.sendNotification({
                id: 'mono-missing',
                type: 'warning',
                title: 'Mono branch not activated',
                message: 'Setting your game to Mono branch is required to mod Outward.',
                actions: [
                    {
                        title: 'Set Outward to Mono branch',
                        action: () => showMonoBranchInstructions(api)
                    }
                ]
            })
        });
}

function showMonoBranchInstructions(api) {
    api.showDialog('info', 'Setting Your Game to Mono Branch', {
        bbcode: `
        In order to use mods, you need to be on a Mono branch of Outward.<br/>
        <br/>
        • On Steam: <br/>
        -- Right-click Outward in your Steam library <br/>
        -- Select "Properties" <br/>
        -- Go to the "Betas" tab <br/>
        -- In the dropdown, select "default-mono - Public default branch (mono)" <br/>
        * There is no need to enter an access code <br/>
        <br/>
        • On GoG Galaxy: <br/>
        -- From the Outward screen (where the play button is), click on the Options button to the right of the play button. <br/>
        -- From there, go to "Manage Installation" > "Configure..." <br/>
        -- Go to the "Installation" tab <br/>
        -- In the dropdown, select "default-mono" <br/>
        * If you see the "radio buttons", make sure to click the radio button titled Version X.X.X:mono
        * (where "X.X.X" is the highest version number you can see) <br/>
         <br/>
        • On Epic Store: <br/>
        -- You are on mono by default and dont need to do anything.<br/>
        <br/>
        <br/>
        [url=${MONO_BRANCH_WIKI}]Outward's Official Wiki - Modding Branch[/url]`
    }, [{ label: 'Close', action: () => dismiss() }])
}

function checkBepInExInstallation(discovery, api) {
    return fs.readFileAsync(path.join(discovery.path, 'BepInEx', 'core', 'BepInEx.dll'))
        .catch(() => {
            api.sendNotification({
                id: 'bepinex-missing',
                type: 'warning',
                title: 'BepInEx not installed',
                message: `Bepinex is required to mod Outward.`,
                actions: [
                    {
                        title: 'Install BepInEx',
                        action: () => showBepInExInstructions(api)
                    }
                ]
            });
        });
}

function showBepInExInstructions(api) {
    api.showDialog('info', 'BepInEx Installation', {
        bbcode: `
        Bepinex is required to mod Outward.<br/>
        <br/>
        - Download the BepInEx .zip file corresponding to your system: [url=${BEPINEX_DOWNLOAD}]BepInex Download link[/url] <br/>
        - Go to the "Mods" tab on the left of Vortex <br/>
        - Drop the zip file on the bottom of the page <br/>
        - Install it like you would any other mod <br/>
        <br/>
        <br/>
        * In case the link is outdated, use the link on this page. <br/>
        [url=${BEPINEX_WIKI}]Outward's Official Wiki - Installing BepInEx[/url]`
    }, [{ label: 'Close', action: () => dismiss() }])
}

function checkPartialityWrapperInstallation(discovery, api) {
    return fs.readFileAsync(path.join(discovery.path, 'BepInEx', 'plugins', 'PartialityWrapper', 'Partiality.dll'))
        .catch(() => {
            api.sendNotification({
                id: 'partiality-wrapper-missing',
                type: 'warning',
                title: 'Partiality Wrapper not installed',
                message: `BepInEx's Partiality Wrapper is required to install partiality mods.`,
                actions: [
                    {
                        title: 'Install Partiality Wrapper',
                        action: () => showPartialityInstructions(api)
                    }
                ]
            });
        });
}

function showPartialityInstructions(api) {
    api.showDialog('info', "BepInEx's Partiality Wrapper Installation", {
        bbcode: `
        BepInEx's Partiality Wrapper is required to install partiality mods.<br/>
        <br/>
        - Download the Partiality Wrapper .zip file: [url=${PARTIALITY_WRAPPER_DOWNLOAD}]Partiality Wrapper Download link[/url] <br/>
        - Go to the "Mods" tab on the left of Vortex <br/>
        - Drop the zip file on the bottom of the page <br/>
        - Install it like you would any other mod <br/>
        <br/>
        <br/>
        * In case the link is outdated, use the link on this page. <br/>
        [url=${BEPINEX_WIKI}]Outward's Official Wiki - Installing BepInEx[/url]`
    }, [{ label: 'Close', action: () => dismiss() }])
}

function testSupportedContent(files, gameId, api) {
    let supported = false;

    if (gameId === NEXUS_GAME_ID) {
        if (isBepInExMod(files)) {
            supported = true;

        } else if (isMaybePartialityMod(files)) {
            supported = true;

            api.sendNotification({
                id: 'partiality-mod',
                type: 'info',
                title: 'Partiality mods compatibility not guaranteed',
                message: 'If this mod causes issues, you might have to install it manually.'
            });
        }
    }

    // For some reason if supported is false it installs the mod anyway
    // By not returning the promise I ensure that the mod is not installed
    if (supported) {
        return Promise.resolve({
            supported,
            requiredFiles: [],
        });
    } else {
        api.sendNotification({
            id: 'incompatible-mod',
            type: 'error',
            title: 'Incompatible Mod',
            message: 'This mod is not supported. You will need to install it manually.'
        })
    }
}

function isBepInExMod(files) {
    return files.find(file => path.dirname(file).toLowerCase().startsWith('bepinex')) !== undefined;
}

function isMaybePartialityMod(files) {
    return (files.find(file => path.extname(file).toLowerCase() === ".dll") !== undefined)
        || (files.find(file => path.extname(file).toLowerCase() === ".xml") !== undefined)
        || (files.find(file => path.extname(file).toLowerCase() === ".json") !== undefined);
}

function installContent(files) {
    // Filter out directories, as these cause a warning. 
    files = files.filter(file => !file.endsWith(path.sep));

    if (isBepInExMod(files)) {
        return installBepInExMod(files);
    } else {
        return installPartialityMod(files);
    }
}

function installBepInExMod(files) {
    const instructions = files.map(file => {
        return {
            type: 'copy',
            source: file,
            destination: file,
        };
    });

    return Promise.resolve({ instructions });
}

function installPartialityMod(files) {
    const instructions = files.map(file => {
        return {
            type: 'copy',
            source: file,
            destination: path.join('BepInEx', 'plugins', file),
        };
    });

    return Promise.resolve({ instructions });
}

module.exports = {
    default: main,
};