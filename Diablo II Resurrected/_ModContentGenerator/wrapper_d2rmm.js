import fs from 'fs';
import { dirname, basename } from 'path';

const GENERATED_FOLDER = process.env.GENERATED_FOLDER;
const CURRENT_FOLDER = process.env.CURRENT_FOLDER;

const getFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8') || '';

    if (!content) {
        console.error(`File at path ${filePath} is empty or cannot be read.`);
        return null;
    }

    return content;
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

    return JSON.parse(jsonString);
}

const getDataObjectsFromTxtTableFile = (filePath) => {
    const content = getFile(filePath);

    if (content == null) return {};

    const lines = content.split("\r\n");
    const headers = lines.shift().split("\t");

    const rows = {};

    lines.forEach(line => {
        const obj = {};

        const lineValues = line.split("\t");

        lineValues.forEach((value, index) => {
            obj[headers[index]] = value;
        });

        const name = lineValues[0];

        if (name) rows[name] = obj;
    });

    return {
        headers,
        rows
    };
}

const WRAP_readJson = (filename) => {
    const localSourcePath = CURRENT_FOLDER + "/sources/" + basename(filename);
    return getObjectFromD2RJSON(localSourcePath);
}

const WRAP_writeJson = (filename, jsonObject) => {
    const localTargetPath = GENERATED_FOLDER + "/" + filename;

    fs.mkdirSync(dirname(localTargetPath), { recursive: true });

    fs.writeFileSync(localTargetPath, JSON.stringify(jsonObject));
}

const WRAP_copyFile = (sourceSubPath, targetSubPath, overwrite = false) => {
    const localSourcePath = CURRENT_FOLDER + sourceSubPath;
    const localTargetPath = GENERATED_FOLDER + targetSubPath;

    // lazy way to check if both are directories or both are files
    const bothAreDirs = !localSourcePath.includes(".") && !localTargetPath.includes(".");
    const bothArefiles = localSourcePath.includes(".") && localTargetPath.includes(".");

    const overwriteFlag = overwrite ? undefined : fs.constants.COPYFILE_EXCL;

    // copy directory contents
    if (bothAreDirs) {
        fs.mkdirSync(localTargetPath, { recursive: true });
        fs.readdirSync(localSourcePath, { recursive: true }).forEach(file => {
            const sourceFilePath = localSourcePath + file;
            const targetFilePath = localTargetPath + file;

            if (targetFilePath.includes(".")) {
                fs.copyFileSync(sourceFilePath, targetFilePath, overwriteFlag);
            } else {
                fs.mkdirSync(targetFilePath, { recursive: true });
            }
        });
    } else if (bothArefiles) {
        fs.mkdirSync(dirname(localTargetPath), { recursive: true });
        fs.copyFileSync(localSourcePath, localTargetPath, overwriteFlag);
    } else {
        console.error("Source and Target must both be directories or both be files.");
    }
}

const getTxtTableFromData = (data) => {
    let output = data.headers.join("\t") + "\r\n";

    for (let key in data.rows) {
        data.headers.forEach(headerKey => {
            output += data.rows[key][headerKey] || '';
            output += '\t';
        });
        output += '\r\n';
    }

    return output;
}

const WRAP_readTsv = (filename) => {
    const localSourcePath = CURRENT_FOLDER + "/sources/" + basename(filename);
    return getDataObjectsFromTxtTableFile(localSourcePath)
}

const WRAP_writeTsv = (filename, tsvObject) => {
    const localTargetPath = GENERATED_FOLDER + filename;

    fs.mkdirSync(dirname(localTargetPath), { recursive: true });

    fs.writeFileSync(localTargetPath, getTxtTableFromData(tsvObject));
}

const D2RMM = {
    readJson: WRAP_readJson,
    writeJson: WRAP_writeJson,
    copyFile: WRAP_copyFile,
    readTsv: WRAP_readTsv,
    writeTsv: WRAP_writeTsv,
};

global.D2RMM = D2RMM;

export default D2RMM