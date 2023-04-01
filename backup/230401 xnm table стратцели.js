const basePeriodGuid = 'be35959358a045099e617a1d5a5edfc5';
const comparisonPeriodGuid = '68a5ea4f1101442eb0b7f5a38034ebdc';

let period1 = "2019 год";
let period2 = "2020 год"; // заменить на фильтр
let period3 = "2021 год"; // заменить на фильтр 
let period4 = "2022 год";

let periods = [period1, period2, period3, period4];

let wDup = JSON.parse(JSON.stringify(w));

//ИНДЕКСЫ НУЖНЫХ КОЛОНОК

let colNames = JSON.parse(JSON.stringify(w.data.colNames));

// заменим первый элемент массива colNames индексом колонки
colNames.forEach((el, index) => el[0] = index);

// оставим только 4 нужных периода (итого останется 6 колонок, т.к. у 2017 нет плана, а у 2030 факта)
colNames = colNames.filter(el => periods.includes(el[1]));

// сортируем по второму и третьему элементу
colNames.sort(function (a , b) {
    let result = 0;
    if(a[1]!=b[1]) result = a[1]>b[1]?1:-1;
    else if(a[2]!=b[2]) result = a[2]>b[2]?1:-1;
    return result;
});

console.log('test colNames => ', colNames);

// сохраним индексы колонок для нужных периодов
let colsToKeep = colNames.map(el => el[0]);
console.log('test colsToKeep => ', colsToKeep);

// RECORDS 

let colsToKeepCount = colNames.length;
let totalColumnsCount = w.data.colNames.length;

wDup.data.records.forEach((el, ind) => {
    for (let i = 0; i < (totalColumnsCount); i++) {
        if (i >= colsToKeepCount) {
            delete el['column ' + i]; // убираем лишние колонки
        } else { 
            el['column ' + i] = wDup.data.records[ind]['column '+ colsToKeep[i]]; // формируем нужные
        } 
    }
});


// COLUMNS
// оставляем нужное количество колонок; 
wDup.data.columns = wDup.data.columns.slice(0, colsToKeepCount+2);

// первые две колонки - измерения, дальше соответственно уменьшаем индекс на два
wDup.data.columns.forEach((el, ind) => {
    el.captions = el.captions.slice(1,3); // уберем лишний уровень
    if (ind > 1) {el.captions = colNames[ind-2].slice(1,3);} // заменим названия колонок на сохраненные рантше
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

console.log('test wDup => ', wDup);
console.log('test cols slice => ', colNames[0].slice(1,3));
