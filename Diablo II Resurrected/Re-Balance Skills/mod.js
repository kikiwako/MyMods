import { get } from "node:http";

const skillsFile = "/data/global/excel/skills.txt";

const skills = D2RMM.readTsv(skillsFile);
const monsters = D2RMM.readTsv("/data/global/excel/monstats.txt");

const seconds = (s) => s * 25;
const minutes = (m) => m * 60 * 25;

// Paladin
skills.Vengeance.mana = 10;
skills.Vengeance.Param1 = 175; // base damage
skills.Vengeance.Param2 = 12;  // damage per level
skills.Vengeance.Param7 = 3;  // synergy: salvation

skills["Holy Shield"].Param1 = minutes(10); // duration in ticks

// Barbarian
skills["Increased Speed"].reqskill1 = ""; // no longer requires Increased Stamina
skills.Frenzy.auralencalc = "par7+skill('Increased Speed'.blvl)*10"; // swap synergy from Increased Stamina to Increased Speed

skills["Grim Ward"].auratargetstate = "decrepify"; // change from terror to decrepify

// Druid
skills["Spirit of Barbs"].MinDam = 50;
skills["Spirit of Barbs"].MinLevDam1 = 10;
skills["Spirit of Barbs"].MinLevDam2 = 30;
skills["Spirit of Barbs"].MinLevDam3 = 60;
skills["Spirit of Barbs"].MinLevDam4 = 100;
skills["Spirit of Barbs"].MinLevDam5 = 150;

const spirits = [
    "spiritofbarbs",
    "heartofwolverine",
    "oaksage",
]

spirits.forEach(spiritName => {
    monsters[spiritName].threat = 0;
    getAllResKeysNormal().forEach(resKey => monsters[spiritName][resKey] = 95);
    getAllResKeysNightmare().forEach(resKey => monsters[spiritName][resKey] = 135);
    getAllResKeysHell().forEach(resKey => monsters[spiritName][resKey] = 195);
});

function getAllResKeysNormal() {
    const values = [];
    const elements = ['Dm', "Ma", "Fi", "Li", "Co", "Po"];

    elements.forEach(element => {
        values.push(`Res${element}`);
    });

    return values;
}

function getAllResKeysNightmare() {
    const values = [];
    const elements = ['Dm', "Ma", "Fi", "Li", "Co", "Po"];

    elements.forEach(element => {
        values.push(`Res${element}(N)`);
    });

    return values;
}

function getAllResKeysHell() {
    const values = [];
    const elements = ['Dm', "Ma", "Fi", "Li", "Co", "Po"];

    elements.forEach(element => {
        values.push(`Res${element}(H)`);
    });

    return values;
}