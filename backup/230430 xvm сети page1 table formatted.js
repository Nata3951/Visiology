// Разворачиваем заголовки
w.data.colNames = w.data.colNames.map(el => el.reverse())

// Отрисовываем таблицу    
TableRender({
    table: w.general,
    style: w.style,
    columns: w.data.columns,
    records: w.data.records,
    editMask: w.data.editMask,
    rowNames: w.data.rowNames,
    colNames: w.data.colNames,
    showToolbar: false
});

// Удаляем ненужные ячейки заголовков
$("#table-"+w.general.renderTo+" > thead > tr:nth-child(2) > th:nth-child(1), #table-"+w.general.renderTo+" > thead > tr:nth-child(2) > th:nth-child(2), #table-"+w.general.renderTo+" > thead > tr:nth-child(2) > th:nth-child(3), #table-"+w.general.renderTo+" > thead > tr:nth-child(2) > th:nth-child(8)").remove();
// Увеличиваем размер оставшихся ячеек по вертикали
$("#table-"+w.general.renderTo+" > thead > tr:nth-child(1) > th:nth-child(1), #table-"+w.general.renderTo+" > thead > tr:nth-child(1) > th:nth-child(2), #table-"+w.general.renderTo+" > thead > tr:nth-child(1) > th:nth-child(3), #table-"+w.general.renderTo+" > thead > tr:nth-child(1) > th:nth-child(8)").attr('rowspan', '2');

// Добавляем/заменяем заголовки
$("#table-"+w.general.renderTo+" > thead > tr:nth-child(1) > th:nth-child(1) > div > span:nth-child(1)").text('Показатель');
$("#table-"+w.general.renderTo+" > thead > tr:nth-child(1) > th:nth-child(2) > div > span:nth-child(1)").text('Ед. измерения');
$("#table-"+w.general.renderTo+" > thead > tr:nth-child(1) > th:nth-child(3) > div > span:nth-child(1)").text('Факт 2017'); 
$("#table-"+w.general.renderTo+" > thead > tr:nth-child(1) > th:nth-child(8) > div > span:nth-child(1)").text('Бизнес план 2030');



// HTML код кнопки "Перейти в филиал"
const transferButton = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="transfer" x="0px" y="0px" viewBox="0 0 300.1 30" style="enable-background:new 0 0 160.1 30; position:absolute; cursor:pointer; width:300px; height: 30px; bottom:30px;  right:10px;" xml:space="preserve"><style type="text/css">.st0{fill:#505DA7;}.st1{fill:#FAFAFA;}</style><g><path d="M7.5 0C3.375 0 0 1.8 0 4V26C0 28.2 3.375 30 7.5 30H292.5C296.625 30 300 28.2 300 26V4C300 1.8 296.625 0 292.5 0H7.5Z" fill="#505DA7"/><text x="145" y="20" text-anchor="middle" style="font-Size: 13px; font-family: Open Sans; fill: white; font-weight: bold">Перейти на соответствующую страницу </text><path class="st1" d="M285.7,9.5c-0.2,0.2-0.2,0.4,0,0.6l5.3,5.3l-5.3,5.3c-0.2,0.2-0.2,0.4,0,0.6c0.2,0.2,0.4,0.2,0.6,0l5.6-5.6"/></g></svg>'

// Вешаем click вызывающий функцию добавления кнопки
$("#table-"+w.general.renderTo+" > tbody > tr:nth-child(1) > td:nth-child(1)").click(() => addTransferButton(4));
$("#table-"+w.general.renderTo+" > tbody > tr:nth-child(2) > td:nth-child(1)").click(() => addTransferButton(2));
$("#table-"+w.general.renderTo+" > tbody > tr:nth-child(3) > td:nth-child(1)").click(() => addTransferButton(6));

// Добавляем кнопку и вешаем click вызывающий функцию перехода на другие листы
function addTransferButton(page) {
    $('#'+w.general.renderTo).append(transferButton)
    $('#'+w.general.renderTo).find('svg#transfer').click(() => goToSheetByNumber(page)) 
}

// Функция для перехода между листами одного дашборда (без перезагрузки страницы)
function goToSheetByNumber(sheetNumber) {
    $("#va-sheet-tabs>li:nth-child(" + sheetNumber + ")").trigger("click");
}
