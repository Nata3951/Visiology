const basePeriodGuid = 'be35959358a045099e617a1d5a5edfc5';
const comparisonPeriodGuid = '68a5ea4f1101442eb0b7f5a38034ebdc';

let period1 = "2019 год";
let period2 = "2020 год";
let period3 = "2021 год";
let period4 = "2022 год";

let periods = [period1, period2, period3, period4];

let wDup = JSON.parse(JSON.stringify(w));

// создадим новый массив названий колонок
wDup.data.colNames = w.data.colNames.filter(el => periods.includes(el[1]));

// сохраним индексы колонок, которые нужно оставить
let periodsIndex = w.data.colNames.map(el => el[1]);
let colsToKeep = periods.map(el => periodsIndex.indexOf(el));

let x = Object.entries(wDup.data.records[0]);

console.log('test2 => ', colsToKeep);

wDup.data.records.forEach((el, ind) => {
    el['column 0'] = w.data.records[ind]['column '+ colsToKeep[0]];
    el['column 1'] = w.data.records[ind]['column '+ colsToKeep[1]];
    el['column 2'] = w.data.records[ind]['column '+ colsToKeep[2]];
    el['column 3'] = w.data.records[ind]['column '+ colsToKeep[2]] - w.data.records[ind]['column '+ colsToKeep[1]];
    el['column 4'] = w.data.records[ind]['column '+ colsToKeep[2]] * w.data.records[ind]['column '+ colsToKeep[1]];
});


TableRender({
    table: w.general,
    style: w.style,
    columns: wDup.data.columns,
    records: wDup.data.records,
    editMask: wDup.data.editMask,
    rowNames: wDup.data.rowNames,
    colNames: wDup.data.colNames,
    showToolbar: false
});


// console.log('test => ', wDup);
// console.log('test => ', periods.includes(w.data.colNames[0][1]));
