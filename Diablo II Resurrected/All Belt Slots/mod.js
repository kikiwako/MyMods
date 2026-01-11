const beltsFile = "/data/global/excel/belts.txt";
const beltsData = D2RMM.readTsv(beltsFile);

const uberBelt = beltsData.rows['uber belt'];
const valuesToCopy = [
    "numboxes",
];

for (let i = 5; i <= 16; i++) {
    valuesToCopy.push(`box${i}right`);
    valuesToCopy.push(`box${i}left`);
    valuesToCopy.push(`box${i}top`);
    valuesToCopy.push(`box${i}bottom`);
}

for (let key in beltsData.rows) {
    if (['uber belt', 'Expansion'].includes(key)) continue;

    const belt = beltsData.rows[key];

    valuesToCopy.forEach(key => {
        if (belt[key] != uberBelt[key]) {
            belt[key] = uberBelt[key];
        }
    });
};

D2RMM.writeTsv(beltsFile, beltsData);
