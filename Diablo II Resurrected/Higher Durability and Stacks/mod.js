const weaponsFile = "/data/global/excel/weapons.txt";
const npcFile = "/data/global/excel/npc.txt";

const weaponTypesToExclude = [
    "abow",
    "aspe",
    "bow",
    "orb",
    "tpot",
    "xbow",
];

// Lower repair cost multiplier from merchants
const npcData = D2RMM.readTsv(npcFile);
for (let key in npcData.rows) {
    npcData.rows[key]["rep mult"] = 32
}
D2RMM.writeTsv(npcFile, npcData);

// Increase durability and stack sizes for weapons
const weaponsData = D2RMM.readTsv(weaponsFile);
for (let key in weaponsData.rows) {
    if (key == "Expansion") continue;
    if (key == "Phase Blade") continue;

    const weapon = weaponsData.rows[key];

    if (isToBeModified(weapon)) {
        weapon.durability = 999;

        if (weapon.stackable) {
            weapon.maxstack = 500;
            weapon.spawnstack = 250;
        }
    }
}
weaponsData.rows.Javelin.cost = 1;
weaponsData.rows.Javelin.minstack = 250;

D2RMM.writeTsv(weaponsFile, weaponsData);

function isToBeModified(weapon) {
    if (weaponTypesToExclude.includes(weapon["type"]) || weapon.questdiffcheck == 1) {
        return false;
    }

    return true;
};
