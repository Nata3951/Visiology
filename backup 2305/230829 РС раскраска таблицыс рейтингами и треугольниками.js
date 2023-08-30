//dashboardGuid=e4b4d7bd7b87467a90861809cf458f3f&sheetGuid=5d4f134680a44cf6b0b007a52b902092

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

// Добавляем/заменяем заголовки
let header = {1:'Уровень проблем-ти', 2:'Клиент', 3:'Предмет лизинга'};

for (let key in header) {
    $(`#table-${w.general.renderTo} > thead > tr:nth-child(1) > th:nth-child(${key}) > div > span:nth-child(1)`)
    .text(header[key]);
}

// ширина колонок
let width = {1:'10%', 2:'12%', 3:'15%', 10:'22%'};

for (let key in width) {
    $(`#table-${w.general.renderTo} th:nth-child(${key})`)
    .css({"width": width[key],});
}

let red = '#ff8a8080';
let orange = '#ffab4080';
let yellow = '#ffea0080';
let green = '#aed58180';

// раскрасим первый столбец
$('#table-' + w.general.renderTo + ' tr > td:nth-child(1)').each(function(i, td) {
        if (td.innerText.includes('робле')) {
            $(td).css({'background-color' : red});
        }
        else if (td.innerText.includes('контр')) {
            $(td).css({'background-color' : yellow});
        }
    });
    
// раскрасим столбцы с рейтингами
let colors = {'A' : green, 'B': yellow, 'C': orange, 'D': red};

[4,5].forEach(function (j) {
   $(`#table-${w.general.renderTo} tr > td:nth-child(${j})`).each(function (i, td) {
         $(td).css({
            'background-color': colors[td.innerText[0]],
        });
    });
});
