import fs from 'fs';
import { exec, spawn } from "child_process";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatedfolder = __dirname + "/mod";

const MAIN = async () => {

    const folderList = getFolderListOfParentDirectory();
    resetGeneratedModFolder();

    folderList.forEach(async folderName => {
        const modPath = fs.realpathSync(__dirname + '/../' + folderName);
        if (!fs.existsSync(modPath + '/mod.js')) return;

        const childProcess = spawn(
            'node',
            [
                "-r",
                __dirname + '/wrapper_d2rmm.js',
                modPath + '/mod.js'
            ], {
            env: {
                ...process.env,
                GENERATED_FOLDER: generatedfolder,
                CURRENT_FOLDER: modPath
            },
            stdio: 'inherit'
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Mod process for ${folderName} exited with code ${code}`);
            }
        });
    });

}

const resetGeneratedModFolder = () => {
    if (fs.existsSync(generatedfolder)) {
        fs.rmSync(generatedfolder, { recursive: true });
    }

    fs.mkdirSync(generatedfolder);
}

const getFolderListOfParentDirectory = () => {
    return fs.readdirSync(__dirname + '/..', { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(name => name[0] !== '_');
}

MAIN();