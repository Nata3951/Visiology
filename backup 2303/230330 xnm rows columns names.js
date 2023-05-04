let wDup = JSON.parse(JSON.stringify(w));

console.log('test w.data.columns[1];', w.data.columns[1]);

delete wDup.data.columns[2]; // deletes only column header
delete wDup.data.records[2]; // deletes whole row
// wDup.data.columns = w.data.columns.slice(0,1); - doesn't work, object!
// wDup.data.colNames = w.data.colNames.slice(0,1); - не видны в выводимой таблице
// wDup.data.rowNames = w.data.rowNames.slice(0,1); - не видны в выводимой таблице

wDup.data.columns[3].captions[0] = "new col B"; // changes column name
wDup.data.records[0]["column 0"] = "another cell A1"; // changes cell value

var $col1 = $('#table-' + w.general.renderTo + ' td:nth-child(1)'); //Второй столбец


console.log('test wDup', wDup );
console.log('test', typeof w.data.columns );


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

// $('#table-' + w.general.renderTo + ' th:last-child').remove(); // remove last header cell
$('#table-' + w.general.renderTo + ' tbody > tr > td:last-child').remove(); // remove last column
