const files = {
    belts: {
        source: "/sources/belts.txt",
        target: "/data/global/excel/belts.txt"
    }
};

const applyChanges = (files) => {
    const newFiles = { ...files };

    const reference = newFiles.belts.info.uber_belt;
    const valuesToCopy = [
        "numboxes",
    ];

    for (let i = 5; i <= 16; i++) {
        valuesToCopy.push(`box${i}right`);
        valuesToCopy.push(`box${i}left`);
        valuesToCopy.push(`box${i}top`);
        valuesToCopy.push(`box${i}bottom`);
    }

    for (let key in newFiles.belts.info) {
        if (['uber belt', 'Expansion'].includes(key)) return;

        const belt = newFiles.belts.info[key];

        valuesToCopy.forEach(key => {
            if (belt[key] != reference[key]) {
                belt[key] = reference[key];
            }
        });
    };

    return newFiles;
};


export {
    files,
    applyChanges
};