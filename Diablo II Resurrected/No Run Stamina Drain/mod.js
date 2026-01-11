const charstats = D2RMM.readTsv("/data/global/excel/charstats.txt");
charstats.rows.forEach(row => {
    row.RunDrain = 0;
});
D2RMM.writeTsv("/data/global/excel/charstats.txt", charstats);