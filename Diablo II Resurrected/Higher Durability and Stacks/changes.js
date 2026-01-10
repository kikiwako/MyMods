const files = {
    weapons: {
        source: "/sources/weapons.txt",
        target: "/data/global/excel/weapons.txt"
    },
    npc: {
        source: "/sources/npc.txt",
        target: "/data/global/excel/npc.txt"
    }
};

const weaponTypesToExclude = [
    "abow",
    "aspe",
    "bow",
    "orb",
    "tpot",
    "xbow",
];

const applyChanges = (files) => {
    const newFiles = { ...files };

    // Lower repair cost multiplier from merchants
    for (let key in newFiles.npc.info) {
        newFiles.npc.info[key]["rep mult"] = 32
    }

    for (let key in newFiles.weapons.info) {
        if (key == "Expansion") continue;
        if (key == "Phase Blade") continue;

        const weapon = newFiles.weapons.info[key];

        if (isToBeModified(weapon)) {
            weapon.durability = 999;

            if (weapon.stackable) {
                weapon.maxstack = 500;
                weapon.spawnstack = 250;
            }
        }
    }

    newFiles.weapons.info.Javelin.cost = 1;
    newFiles.weapons.info.Javelin.minstack = 250;

    return newFiles;
};

const isToBeModified = (weapon) => {
    if (weaponTypesToExclude.includes(weapon["type"]) || weapon.questdiffcheck == 1) {
        return false;
    }

    return true;
};

export {
    files,
    applyChanges
};