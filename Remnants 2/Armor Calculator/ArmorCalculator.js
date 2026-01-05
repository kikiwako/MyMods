class equipment {
    constructor(name, armor, weight, bleed, fire, shock, corrosive, blights) {
        this.name = name;
        this.armor = armor;
        this.weight = weight;
        this.bleed = bleed;
        this.fire = fire;
        this.shock = shock;
        this.corrosive = corrosive;
        this.blights = blights;
    }
}

const maxSetValues = {
    armor: 0,
    weight: 0,
    bleed: 0,
    fire: 0,
    shock: 0,
    corrosive: 0,
    blights: 0,
    totalResists: 0
};

class equipSet {
    constructor(helm, chest, leg, glove) {
        this.helm = helm;
        this.chest = chest;
        this.leg = leg;
        this.glove = glove;

        this.pieces = [helm, chest, leg, glove];

        this.armor = addValues(this.pieces, "armor");
        this.weight = addValues(this.pieces, "weight");
        this.bleed = addValues(this.pieces, "bleed");
        this.fire = addValues(this.pieces, "fire");
        this.shock = addValues(this.pieces, "shock");
        this.corrosive = addValues(this.pieces, "corrosive");
        this.blights = addValues(this.pieces, "blights");

        this.totalResists = this.bleed + this.fire + this.shock + this.corrosive + this.blights;

        for (const key in maxSetValues) {
            maxSetValues[key] = Math.max(maxSetValues[key], this[key]);
        }
    }

    getName() {
        return this.pieces.map(piece => "    -" + piece.name + "\n").join("");
    }

    getPercentiles() {
        if (!this.percentiles) {

            const ouput = {};
            let total = 0;

            for (const key in maxSetValues) {
                ouput[key] = this[key] / maxSetValues[key] * 100;
                total += ouput[key];
            }

            ouput.weight -= 100;
            ouput.weight *= -1;

            ouput.total = total - ouput.weight - ouput.totalResists;
            ouput.average = total / (Object.keys(maxSetValues).length - 2);

            this.percentiles = ouput;
        }

        return this.percentiles;
    }

    getValue(id) {
        switch (id) {
            case PRIORITIES.ARMOR:
                return this.armor;
            case PRIORITIES.BLEED:
                return this.bleed;
            case PRIORITIES.FIRE:
                return this.fire;
            case PRIORITIES.SHOCK:
                return this.shock;
            case PRIORITIES.CORROSIVE:
                return this.corrosive;
            case PRIORITIES.BLIGHTS:
                return this.blights;
            case PRIORITIES.TOTAL_RESISTS:
                return this.totalResists;
            case "average":
                return this.getPercentiles().average;
            default:
                return 0;
        }
    }
}

const padForWidth = (info, width, pad = " ") => {
    const numberText = info.toString();
    const padStart = Math.floor((width - numberText.length) / 2);
    const padEnd = width - numberText.length - padStart;

    const start = "".padStart(padStart, pad);
    const end = "".padEnd(padEnd, pad);

    return start + numberText + end;
}

const PRIORITIES = {
    ARMOR: "armor",
    BLEED: "bleed",
    FIRE: "fire",
    SHOCK: "shock",
    CORROSIVE: "corrosive",
    BLIGHTS: "blights",
    TOTAL_RESISTS: "totalResists",
};

const addValues = (list, valueName) => {
    let total = 0;

    list.forEach(item => { total += item[valueName] });

    return Math.round(total * 10) / 10;
}

const forEachSet = (callbackfn) => {
    let index = 0;
    const total = gameEquipments.helms.length * gameEquipments.chests.length * gameEquipments.gloves.length * gameEquipments.legs.length;

    gameEquipments.helms.forEach(helm => {
        gameEquipments.chests.forEach(chest => {
            gameEquipments.gloves.forEach(glove => {
                gameEquipments.legs.forEach(leg => {
                    const set = new equipSet(helm, chest, leg, glove);
                    callbackfn(set, index, total);

                    index++;
                });
            });
        });
    });
};

const isFilteredOut = (set) => {
    let output = false;

    gameEquipments.filterOut.forEach(filter => {
        const included = set.getName().toLowerCase().includes(filter.toLowerCase());
        if (included) output = true;
    });

    return output;
}

const getBestSetForWeight = (targetWeight, priority = "armor") => {
    let bestSet = [];
    let equivalents = [];

    forEachSet(set => {
        if (set.weight <= targetWeight && !isFilteredOut(set)) {
            if (bestSet.length == 0) {
                bestSet = set;
                console.log(`no best set, using first set as basis for comparison`);
                set.print();
            }

            else if (set[priority] > bestSet[priority]) {
                bestSet = set;
                equivalents = [];

                console.log(`found better set with ${set[priority]} ${priority}:`);
                set.print();
            }

            else if (set[priority] == bestSet[priority]) {
                equivalents.push(set);

                console.log(` found equivalent set with ${set[priority]} ${priority}:`);
                set.print();
            }
        }
    });

    return [bestSet, ...equivalents];
};

const getSortedSetsForWeight = (targetWeight, priority, number = 10) => {
    const sets = [];
    let progress = 1;

    forEachSet((set, index, total) => {
        if (index == total - 1 || index / total * 100 >= progress) {
            console.log(
                `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
                `Compiling sets with weight equal or below ${targetWeight}\n`,
                `    Sets checked: ${index}\n`,
                `    Sets kept: ${sets.length}\n`,
                `    Total sets: ${total}\n\n`,
                `    Progress: ${progress}%`
            );
            progress++;
        }
        if (set.weight <= targetWeight && !isFilteredOut(set)) {
            sets.push(set);
        }
    });

    // console.log(`Progress: 100%`);
    console.log();
    console.log("Sorting sets based on average stats" + (priority ? " and " + priority : "") + "...");
    sets.sort((a, b) => {
        const prioritySort = b.getValue(priority) - a.getValue(priority);

        return prioritySort || b.getValue("average") - a.getValue("average")
    });

    const output = sets.slice(0, number).reverse();

    return output;
};

const appendStringsPerLine = (strings, separator = " ") => {
    let mostLines = 0;
    const splitStrings = strings.map(string => {
        const lines = string.split("\n");
        if (lines.length > mostLines) mostLines = lines.length;
        return lines;
    });

    let output = "";

    for (let i = 0; i < mostLines; i++) {
        let line = "";

        splitStrings.forEach(string => {
            line += separator + string[i] || "";
        });

        output += line + "\n";
    }

    return output;
}

const printTable = (header, table) => {
    const columnsWidth = header.map(header => header.length);

    table.forEach((row) => {
        row.forEach((item, colIndex) => {
            columnsWidth[colIndex] = Math.max(columnsWidth[colIndex], item.toString().length);
        })
    })


    const headerLine = `| ${header.map((item, index) => padForWidth(item, columnsWidth[index])).join(" | ")} |`;
    const separatorEnds = ` ${padForWidth("", headerLine.length - 2, "-")} `;
    const separatorMiddle = `|${separatorEnds.trim()}|`;

    let output = "";
    output += separatorEnds + "\n";
    output += headerLine + "\n";
    output += separatorMiddle + "\n";

    table.forEach((row) => {
        output += `| ${row.map((item, index) => padForWidth(item, columnsWidth[index])).join(" | ")} |` + "\n";
    })


    console.log(output);
}

const gameEquipments = {
    helms: [
        new equipment("Academic's Hat", 12.7, 5.2, 1, 0, 0, 3, 2),
        new equipment("Bandit's Mask", 6.8, 2.7, 2, 0, 0, 3, 3),
        new equipment("Battle Helmet", 13.1, 5.3, 5, 2, 0, 0, 0),
        new equipment("Bloodless Crown", 6.6, 2.7, 15, -3, 3, -3, -3),
        new equipment("Bruiser Helmet", 17.6, 8.1, 1, 2, 0, 1, 0),
        new equipment("Crimson Guard Shroud", 15.6, 6.7, 2, 2, 0, 0, 2),
        new equipment("Crown of The Red Prince", 6, 6, -6, 25, -6, -6, 13),
        new equipment("Cultist Hat", 11.1, 4.6, 1, 1, 1, 1, 1),
        new equipment("Dandy Topper", 12.8, 5.3, 0, 0, 0, 0, 5),
        new equipment("Dendroid Mask", 7.7, 3.1, 2, 0, 0, 2, 0),
        new equipment("Disciple Headpiece", 16, 7.2, 0, 2, 2, 1, 0),
        new equipment("Elder Headdress", 7.5, 3, 0, 3, 0, 0, 2),
        new equipment("Fae Royal Headcover", 15.4, 6.6, 2, 2, 0, 0, 2),
        new equipment("Field Medic Hat", 10.6, 4.4, 0, 0, 0, 1, 2),
        new equipment("Field Medic Mask", 10.6, 4.4, 0, 0, 0, 1, 2),
        new equipment("High Noon Hat", 11.7, 4.9, 0, 1, 1, 1, 0),
        new equipment("Knotted Helm", 15.5, 6.9, 0, 0, 0, 2, 1),
        new equipment("Labyrith Headplate", 12, 7, 0, 2, 3, 0, 0),
        new equipment("Leto Mark I Helmet", 22.6, 11.9, 3, 4, 2, 4, 2),
        new equipment("Leto Mark II Helmet", 21.8, 11.1, 2, 3, 1, 2, 1),
        new equipment("Lodestone Crown", 6.5, 2.6, -2, 0, -1, 0, 5),
        new equipment("Mudtooth's Hat", 10.4, 4.4, 1, 1, 1, 1, 2),
        new equipment("Nanoplated Transmitter", 12.4, 5, 2, 1, 0, 0, 2),
        new equipment("Navigator's Helm", 16, 7.6, -1, -1, 2, 3, -1),
        new equipment("Nightstalker Shroud", 10.9, 4.5, 0, 1, 1, 0, 3),
        new equipment("Phetyr Sensor", 19.8, 9.8, 3, 3, 3, 4, 5),
        new equipment("Radiant Visage", 17.2, 7.9, 1, 1, 3, 0, 1),
        new equipment("Realmwalker Beret", 7.2, 2.9, 0, 0, 1, 0, 1),
        new equipment("Red Widow Headdress", 13.2, 5.6, 2, 0, 0, 0, 2),
        new equipment("Space Worker Mask", 7, 2.8, 1, 0, 2, 2, 0),
        new equipment("Technician Helmet", 16.6, 7.5, 0, 1, 2, 2, 0),
        new equipment("Trainer Cap", 10, 4.1, 0, 0, 0, 1, 0),
        new equipment("True Crimson Crown", 16.6, 10, -6, 35, -6, -6, -6),
        new equipment("Void Skull", 15.9, 7.1, 0, 1, 2, 1, 0),
        new equipment("Welding Goggles", 9, 4, 0, 3, 0, 0, 0),
        new equipment("Zealot's Hat", 11.3, 4.7, 0, 0, 1, 0, 1),
        new equipment("* no helm *", 0, 0, 0, 0, 0, 0, 0)
    ],
    gloves: [
        new equipment("Academic's Gloves", 12.3, 5.2, 0, 0, 0, 2, 1),
        new equipment("Bandit Gloves", 6.8, 2.7, 2, 0, 0, 2, 1),
        new equipment("Battle Gloves", 7.9, 3.2, 1, 1, 0, 1, 1),
        new equipment("Bruiser Gloves", 17.6, 8.1, 1, 2, 0, 1, 0),
        new equipment("Crimson Guard Gauntlets", 15.2, 6.7, 1, 1, 0, 0, 1),
        new equipment("Cultist Gloves", 11.1, 4.6, 0, 1, 1, 1, 1),
        new equipment("Dendroid Grips", 7.7, 3.1, 1, 0, 0, 1, 1),
        new equipment("Disciple Vambraces", 16, 7.2, 0, 1, 2, 0, 0),
        new equipment("Elder Gloves", 7.5, 3, 0, 2, 0, 1, 1),
        new equipment("Fae Royal Vambraces", 15, 6.6, 1, 1, 0, 0, 1),
        new equipment("Field Medic Gloves", 10.6, 4.4, 2, 0, 0, 1, 1),
        new equipment("High Noon Armguards", 11.7, 4.9, 0, 2, 2, 1, 0),
        new equipment("Knotted Gloves", 15.5, 6.9, 1, 0, 0, 2, 1),
        new equipment("Labyrinth Gauntlets", 12.9, 5.4, 0, 3, 4, 0, 0),
        new equipment("Leto Mark I Gloves", 22.6, 11.9, 2, 1, 2, 3, 2),
        new equipment("Leto Mark II Gloves", 21.8, 11.1, 2, 1, 2, 3, 1),
        new equipment("Nanotplated Hands", 7.4, 3, 1, 1, 0, 0, 1),
        new equipment("Nightstalker Gloves", 10.9, 4.5, 2, 1, 1, 0, 7),
        new equipment("Phetyr Crushers", 17.4, 8.6, 2, 2, 1, 2, 1),
        new equipment("Radiant Bracers", 17.2, 7.9, 1, 1, 2, 0, 0),
        new equipment("Realmwalker Gloves", 7.2, 2.9, 0, 1, 1, 0, 1),
        new equipment("Red Widow Bracers", 13.1, 5.6, 2, 0, 0, 0, 2),
        new equipment("Space Worker Gloves", 7, 2.8, 1, 1, 1, 1, 0),
        new equipment("Survivor Gloves", 8, 4, 1, 1, 1, 1, 1),
        new equipment("Technician Gloves", 16.6, 7.5, 0, 1, 2, 1, 0),
        new equipment("Trainer Bracer", 10.1, 4.1, 2, 0, 3, 1, 1),
        new equipment("Void Wraps", 15.9, 7.1, 0, 1, 1, 1, 0),
        new equipment("Zealot's Wraps", 11.3, 4.7, 0, 1, 1, 0, 1),
        new equipment("* no gloves *", 0, 0, 0, 0, 0, 0, 0)
    ],
    chests: [
        new equipment("Academic's Overcoat", 49.2, 20.8, 2, 0, 0, 6, 3),
        new equipment("Bandit Jacket", 27.2, 10.8, 3, 0, 0, 2, 2),
        new equipment("Battle Shirt", 31.6, 12.8, 2, 3, 0, 2, 2),
        new equipment("Bruiser Bodyplate", 70.2, 32.4, 2, 6, 0, 2, 0),
        new equipment("Crimson Guard Plate", 60.8, 26.8, 4, 3, 0, 0, 2),
        new equipment("Cultist Duster", 44.6, 18.4, 1, 1, 2, 3, 2),
        new equipment("Dendroid Chest", 30.8, 12.4, 4, 0, 0, 5, 2),
        new equipment("Disciple Mantle", 64, 28.8, 0, 4, 5, 2, 0),
        new equipment("Elder Raiment", 29.6, 12, 0, 4, 0, 2, 4),
        new equipment("Fae Royal Bodyplate", 60, 26.4, 4, 3, 0, 0, 2),
        new equipment("Field Medic Overcoat", 42.8, 17.6, 9, 0, 0, 0, 3),
        new equipment("High Noon Duds", 47.1, 19.6, 0, 4, 4, 2, 0),
        new equipment("Knotted Cage", 62.2, 27.6, 1, 0, 0, 7, 3),
        new equipment("Labyrinth Mantle", 37, 20, 0, 4, 6, 0, 0),
        new equipment("Leto Mark I Armor", 90.4, 47.5, 4, 5, 5, 5, 5),
        new equipment("Leto Mark II Armor", 88.8, 45.2, 3, 4, 4, 3, 5),
        new equipment("Nanoplated Vestments", 29.6, 12, 4, 2, 0, 0, 4),
        new equipment("Nightstalker Garb", 43.8, 18, 2, 3, 2, 0, 2),
        new equipment("Phetyr Chassis", 80.6, 39.9, 4, 6, 6, 7, 3),
        new equipment("Radiant Protector", 69, 31.6, 2, 2, 4, 0, 1),
        new equipment("Realmwalker Tunic", 29, 11.6, 3, 2, 3, 0, 4),
        new equipment("Red Widow Raiment", 52.8, 22.4, 5, 0, 0, 1, 4),
        new equipment("Space Worker Body", 28, 11.2, 1, 1, 4, 2, 0),
        new equipment("Survivor Overcoat", 46, 19, 3, 2, 2, 2, 2),
        new equipment("Technician Bodyplate", 66.4, 30, 0, 2, 6, 2, 0),
        new equipment("Trainer Clothes", 40, 16.4, 3, 0, 4, 3, 1),
        new equipment("Void Carapace", 63.6, 28.4, 0, 3, 4, 4, 0),
        new equipment("Zealot's Overcoat", 45.2, 18.8, 3, 2, 3, 0, 4),
        new equipment("* no chest *", 0, 0, 0, 0, 0, 0, 0),
    ],
    legs: [
        new equipment("Academic's Trousers", 24.6, 10.4, 2, 0, 0, 4, 1),
        new equipment("Bandit Trousers", 13.6, 5.4, 2, 0, 0, 2, 1),
        new equipment("Battle Slacks", 15.8, 6.4, 1, 1, 0, 1, 2),
        new equipment("Bruiser Boots", 35, 16.2, 1, 4, 0, 2, 0),
        new equipment("Crimson Guard Sabatons", 30.4, 13.4, 2, 3, 0, 0, 2),
        new equipment("Cultist Britches", 22.2, 9.2, 1, 1, 1, 2, 2),
        new equipment("Dendroid Leggings", 15.4, 6.2, 3, 0, 2, 0, 2),
        new equipment("Disciple Greaves", 32, 14.4, 0, 2, 3, 1, 0),
        new equipment("Elder Leggings", 14.8, 6, 0, 3, 0, 1, 2),
        new equipment("Fae Royal Greaves", 30, 13.2, 2, 3, 0, 0, 2),
        new equipment("Field Medic Trousers", 21.4, 8.8, 4, 0, 0, 0, 2),
        new equipment("High Noon Soles", 23.4, 9.8, 0, 3, 2, 2, 0),
        new equipment("Knotted Greaves", 31.1, 13.8, 1, 0, 0, 4, 2),
        new equipment("Labyrinth Treads", 19, 10, 0, 3, 4, 0, 0),
        new equipment("Leto Mark I Leggings", 45.2, 23.7, 4, 3, 4, 3, 4),
        new equipment("Leto Mark II Leggings", 44.4, 22.6, 3, 2, 3, 2, 3),
        new equipment("Nanoplated Waist", 14.8, 6, 3, 2, 0, 0, 2),
        new equipment("Nightstalker Pants", 21.8, 9, 2, 2, 1, 0, 1),
        new equipment("Phetyr Locomotor", 43.8, 21.7, 2, 2, 3, 4, 2),
        new equipment("Radiant Greaves", 34.5, 15.8, 1, 1, 3, 0, 1),
        new equipment("Realmwalker Pantaloons", 14.5, 5.8, 2, 1, 2, 0, 3),
        new equipment("Red Widow Leggings", 26.2, 11.2, 3, 0, 0, 1, 3),
        new equipment("Space Worker Legs", 14, 5.6, 1, 1, 3, 2, 0),
        new equipment("Survivor Leggings", 24, 10, 1, 1, 1, 2, 1),
        new equipment("Technician Greaves", 33.2, 15, 0, 1, 3, 2, 0),
        new equipment("Trainer Workboots", 20, 8.2, 1, 0, 1, 2, 1),
        new equipment("Void Greaves", 31.8, 14.2, 0, 2, 2, 3, 0),
        new equipment("Zealot's Seaboots", 22.4, 9.4, 2, 1, 2, 0, 3),
        new equipment("* no legs *", 0, 0, 0, 0, 0, 0, 0)
    ],
    filterOut: [
        "Bloodless",
        "Crimson Guard",
        "Disciple ",
        "Mudtooth",
        "Nanoplated ",
        "True Crimson"
    ]
}

const generateTabletoPrint = (params) => {
    const header = [
        "Armor",
        "Total Resists",
        "Bleed",
        "Blight",
        "Corrosive",
        "Fire",
        "Shock",
        "Weight",
        "Average",
        "Head",
        "Chest",
        "Legs",
        "Gloves"
    ];
    const lines = getSortedSetsForWeight(...params).map(set => {
        const percentiles = set.getPercentiles();

        return [
            set.armor + ` (${parseInt(percentiles.armor)}%)`,
            set.totalResists + ` (${parseInt(percentiles.totalResists)}%)`,
            set.bleed + ` (${parseInt(percentiles.bleed)}%)`,
            set.blights + ` (${parseInt(percentiles.blights)}%)`,
            set.corrosive + ` (${parseInt(percentiles.corrosive)}%)`,
            set.fire + ` (${parseInt(percentiles.fire)}%)`,
            set.shock + ` (${parseInt(percentiles.shock)}%)`,
            set.weight + ` (${parseInt(percentiles.weight)}%)`,
            `${(percentiles.average).toFixed(2)}%`,
            set.helm.name,
            set.chest.name,
            set.leg.name,
            set.glove.name];
    });

    return {
        header,
        lines
    }
}

const params = [85, PRIORITIES.ARMOR]

const { header, lines } = generateTabletoPrint(params);

console.log();
printTable(header, lines.reverse());