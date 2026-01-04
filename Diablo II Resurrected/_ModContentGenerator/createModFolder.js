import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatedfolder = __dirname + "/generatedModFolder";

const MAIN = async () => {
    const folderList = getFolderListOfParentDirectory();

    resetGeneratedModFolder();

    folderList.forEach(async folderName => {
        const modPath = fs.realpathSync(__dirname + '/../' + folderName);
        if (!fs.existsSync(modPath + '/changes.js')) return;

        const modChanges = await import(modPath + '/changes.js');

        const filesData = {};

        for (let key in modChanges.files) {
            let source = modPath + modChanges.files[key].source;

            if (fs.existsSync(generatedfolder + modChanges.files[key].target)) {
                console.log(`Source file ${source} was already modified.`, `Using generated file as source instead.`);
                source = generatedfolder + modChanges.files[key].target;
            }

            if (source.includes("bankexpansion")) {
                let bob = 1;
                bob++;
            }

            const file = {
                ...modChanges.files[key],
                ...getDataObjectFromFile(source) || {}
            };

            filesData[key] = file;
        }

        const updatedFilesData = modChanges.applyChanges(filesData);

        for (let key in updatedFilesData) {
            writeFileFromDataObject(
                generatedfolder + updatedFilesData[key].target,
                updatedFilesData[key]
            );
        }
    });

}

const writeFileFromDataObject = (filePath, data) => {
    fs.mkdirSync(dirname(filePath), { recursive: true });

    if (filePath.endsWith(".txt")) {
        fs.writeFileSync(filePath, getTxtTableFromData(data));
    }

    if (filePath.endsWith(".json")) {
        fs.writeFileSync(filePath, JSON.stringify(data.json));
    }
}

const getDataObjectFromFile = (filePath) => {
    if (filePath.endsWith(".txt")) return getDataObjectsFromTxtTableFile(filePath);
    if (filePath.endsWith(".json")) return getObjectFromD2RJSON(filePath);

    console.error("File type for " + filePath + "is not handled");
    return {};
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

const getFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8') || '';

    if (!content) {
        console.error(`File at path ${filePath} is empty or cannot be read.`);
        return null;
    }

    return content;
}

const getDataObjectsFromTxtTableFile = (filePath) => {
    const content = getFile(filePath);

    if (content == null) return {};

    const lines = content.split("\r\n");
    const header = lines.shift().split("\t");

    const info = {};

    lines.forEach(line => {
        const obj = {};

        const lineValues = line.split("\t");

        lineValues.forEach((value, index) => {
            obj[header[index]] = value;
        });

        const name = lineValues[0].replaceAll(" ", "_");

        if (name) info[name] = obj;
    });

    return {
        header,
        info
    };
}

const getTxtTableFromData = (data) => {
    let output = data.header.join("\t") + "\r\n";

    for (let key in data.info) {
        data.header.forEach(headerKey => {
            output += data.info[key][headerKey] || '';
            output += '\t';
        });
        output += '\r\n';
    }

    return output;
}

const getObjectFromD2RJSON = (filePath) => {
    const d2rJsonString = getFile(filePath);

    if (d2rJsonString == null) return {};


    let jsonString = ``;

    d2rJsonString.split("\n").forEach(line => {
        if (!line.trim().startsWith("//")) {
            jsonString += line.trim().split("//")[0];
        }
    });

    jsonString = jsonString.replaceAll(",}", "}");
    jsonString = jsonString.replaceAll(",]", "]");

    return { json: JSON.parse(jsonString) };
}

MAIN();


