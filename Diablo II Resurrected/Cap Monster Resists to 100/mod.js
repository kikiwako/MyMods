const monstatsFile = "/data/global/excel/monstats.txt";
const monstatsData = D2RMM.readTsv(monstatsFile);

const valuesToCheck = getValuesToCheck();

for (let key in monstatsData.rows) {
    const monster = monstatsData.rows[key];

    if (monster.Align == 0) {// if monster is evil
        valuesToCheck.forEach(valueKey => {
            if (parseInt(monster[valueKey]) > 100 && monster[valueKey] != '1000') {
                monster[valueKey] = '100';
            }
        });
    }
};

D2RMM.writeTsv(monstatsFile, monstatsData);

function getValuesToCheck() {
    const values = [];

    const elements = ['Dm', "Ma", "Fi", "Li", "Co", "Po"];
    const difficulties = ['', '(N)', '(H)'];

    elements.forEach(element => {
        difficulties.forEach(difficulty => {
            values.push(`Res${element}${difficulty}`);
        });
    });

    return values;
}
