const files = {
    monstats: {
        source: "/sources/monstats.txt",
        target: "/data/global/excel/monstats.txt"
    }
};

const applyChanges = (files) => {
    const newFiles = { ...files };
    const valuesToCheck = getValuesToCheck();

    for (let key in newFiles.monstats.info) {
        const monster = newFiles.monstats.info[key];

        if (monster.Align == 0) {// if monster is evil
            valuesToCheck.forEach(valueKey => {
                if (parseInt(monster[valueKey]) > 100 && monster[valueKey] != '1000') {
                    monster[valueKey] = '100';
                }
            });
        }
    };

    return newFiles;
};

const getValuesToCheck = () => {
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


export {
    files,
    applyChanges
};