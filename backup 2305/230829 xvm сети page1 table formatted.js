// Разворачиваем заголовки
w.data.colNames = w.data.colNames.map(el => el.reverse());

// переписываем заголовки строк
w.data.rowNames.forEach(el => {
    if (el[0].includes('ыручка')) el[0] = '2. Увеличение нетарифной выручки по конкурентным видам услуг';
    if (el[0].includes('отери')) el[0] = '1. Снижение потерь электрической энергии 0,4 - 20 кВ';
    if (el[0].includes('роизводит')) el[0] = '3. Повышение производительности труда';
    // для единиц измерения добавляем пробел перед открывающей скобкой, чтобы руб./(чел*час) правильно переносилось
    el[1] = el[1].replace('(', ' (');
});

// сортируем по возрастанию заголовков строк

w.data.rowNames.sort(function (a, b) {
    return (a[0] > b[0]) ? 1 : -1;
});

w.data.records.sort(function (a, b) {
    return (a.rowNames[0] > b.rowNames[0]) ? 1 : -1;
});

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
$("#table-" + w.general.renderTo + " > thead > tr:nth-child(2) > th:nth-child(1), #table-" + w.general.renderTo + " > thead > tr:nth-child(2) > th:nth-child(2)").remove();
// Увеличиваем размер оставшихся ячеек по вертикали
$("#table-" + w.general.renderTo + " > thead > tr:nth-child(1) > th:nth-child(1), #table-" + w.general.renderTo + " > thead > tr:nth-child(1) > th:nth-child(2)").attr('rowspan', '2');

// Добавляем/заменяем заголовки
$("#table-" + w.general.renderTo + " > thead > tr:nth-child(1) > th:nth-child(1) > div > span:nth-child(1)").text(
    'Показатель'
).css({
    "text-align": "left",
    "padding-left": "10px",
});

$("#table-" + w.general.renderTo + " > thead > tr:nth-child(1) > th:nth-child(2) > div > span:nth-child(1)").text(
    'Ед. изм.'
).css({
    "text-align": "left",
    "padding-left": "10px",
});

$("#table-" + w.general.renderTo + " > thead > tr:nth-child(1) > th:nth-child(3) > div > span:nth-child(1)").text('2017');
$("#table-" + w.general.renderTo + " > thead > tr:nth-child(1) > th:nth-child(8) > div > span:nth-child(1)").text('2030');

// добавляем высоту строк
$('#table-' + w.general.renderTo + ' tbody > tr > td').css({
    //    'margin-block-start': '0',
    /* top | right | bottom | left */
    'padding': '40px 0px 40px 15px',
});

// ширина колонок
$('#table-' + w.general.renderTo + ' th:nth-child(1)')
    .css({
        "width": "240px",

    });

$('#table-' + w.general.renderTo + ' th:nth-child(2)')
    .css({
        "width": "110px",
    });

// цвет текста второй колонки
$('#table-' + w.general.renderTo + ' tr > td:nth-child(2)').css({
    'color': '#9e9e9e',
});

// раскраска ячеек факта по сравнию с планом
// номер колонки с фактом = [4,6]
// selector для строка 2, ячейка 4
// #table-681806a576554d5cb4c51970abc268a3 > tbody > tr:nth-child(2) > td:nth-child(4)


function chooseColor(v) {
    if (v < 0) return '#ff595a';
    else return '#56ad83';
}

/* функция для раскраски колонки факта. Задаем номер ряда и направление оценки 
(1 если лучше, когда факт меньше плана и -1 если наоборот) */

function colorFactColumn(measureRow, direction) {
    factColumns.forEach(function (j) {
        $(`#table-${w.general.renderTo} > tbody > tr:nth-child(${measureRow}) > td:nth-child(${j})`).each(
            function (i, td) {
                let fact = $(`#table-${w.general.renderTo} > tbody > tr:nth-child(${measureRow}) > td:nth-child(${j})`)[0].innerText;
                let plan = $(`#table-${w.general.renderTo} > tbody > tr:nth-child(${measureRow}) > td:nth-child(${j + 1})`)[0].innerText;
                let diff = (plan - fact) * direction;

                $(td).css({
                    'color': chooseColor(diff),
                });
            });
    });
}

let factColumns = [4, 6];

colorFactColumn(1, 1);
colorFactColumn(2, -1);
colorFactColumn(3, -1);


// Меняем курсор
$('#table-' + w.general.renderTo + ' th').css({ 'cursor': 'default' });
$('#table-' + w.general.renderTo + ' tbody').css({ 'cursor': 'pointer' });

// Задаем скругление углов для таблицы
$('#grid-' + w.general.renderTo).css({ 'border-radius': '8px' })

// раскраска зеброй, четные строки
$('#table-' + w.general.renderTo + ' tr:nth-child(even)').css({
    'background-color': '#3f4268',
});

// раскраска зеброй, нечетные строки
$('#table-' + w.general.renderTo + ' tr:nth-child(odd)').css({
    'background-color': '#494b6f',
});


$('#table-' + w.general.renderTo + ' tr').hover(
    function () {
        $(this).css("background-color", "#545887"); // Задайте нужный цвет для выделения при наведении
    },
    function () {
        if ($(this).children()[0].innerText == "Потери э/э") {
            $(this).css("background-color", "#3f4268"); // Задайте нужный цвет для выделения при наведении
        } else {
            $(this).css("background-color", "#494b6f"); // Задайте нужный цвет для выделения при наведении
        }
    }
);


function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    let head = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let tail = parts[1] ? (parts[1] * 100 + "").slice(0, 2) : "00";
    return head + ',' + tail;
}

// для цифровых колонок добавим разделители разрядов, две цифры после запятой, отбивку справа
[3, 4, 5, 6, 7, 8].forEach(function (j) {
    $(`#table-${w.general.renderTo} tr > td:nth-child(${j})`).each(function (i, td) {
        var value = +td.innerHTML;
        td.innerText = td.innerText ? numberWithSpaces(td.innerText) : '';
        $(td).css({
            'text-align': 'right',
            'padding-right': '15px',
            'font-weight': 'bold',
        });
    });
});

// для строки с % добавляем знак процента к числу

let percentRow = 1;

[3, 4, 5, 6, 7, 8].forEach(function (j) {
    $(`#table-${w.general.renderTo} tr:nth-child(${percentRow}) > td:nth-child(${j})`).each(function (i, td) {
        if (td.innerText)
            td.innerText = td.innerText + '%';
    });
});

// убираем знаки после запятой для ряда 2 и 3

[3, 4, 5, 6, 7, 8].forEach(function (j) {
    $(`#table-${w.general.renderTo} tr:nth-child(2) > td:nth-child(${j})`).each(function (i, td) {
        if (td.innerText)
            td.innerText = td.innerText.split(",")[0];
    });
});

[3, 4, 5, 6, 7, 8].forEach(function (j) {
    $(`#table-${w.general.renderTo} tr:nth-child(3) > td:nth-child(${j})`).each(function (i, td) {
        if (td.innerText)
            td.innerText = td.innerText.split(",")[0];
    });
});


// Вешаем click вызывающий функцию добавления кнопки
$("#table-" + w.general.renderTo + " > tbody > tr:nth-child(1)").click(() => addTransferButton(2, 'Потери электроэнергии'));
$("#table-" + w.general.renderTo + " > tbody > tr:nth-child(2)").click(() => addTransferButton(4, 'Нетарифная выручка'));
$("#table-" + w.general.renderTo + " > tbody > tr:nth-child(3)").click(() => addTransferButton(5, 'Производительность труда'));


// Добавляем кнопку и вешаем click вызывающий функцию перехода на другие листы
function addTransferButton(page, name) {
    // Удаляем предыдущую кнопку
    $('#' + w.general.renderTo).find('div#transfer').remove()

    // HTML код кнопки "Перейти в филиал"
    let transferButton = '<div id="transfer" style="position: absolute; cursor: pointer; width: 240px; height: 30px; bottom: 30px; right: 10px; background-color: #505DA7; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; border-radius: 4px;">' +
        '<span style="font-size: 13px; font-family: Open Sans; color: white; font-weight: bold;">' + name + '</span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="30" height="30"><path d="M15.7,4.5c-0.2,0.2-0.2,0.4,0,0.6l2.8,2.8l-2.8,2.8c-0.2,0.2-0.2,0.4,0,0.6c0.2,0.2,0.4,0.2,0.6,0l3.1-3.1c0.2-0.2,0.2-0.4,0-0.6l-3.1-3.1C16.1,4.3,15.9,4.3,15.7,4.5z" fill="#FAFAFA"/></svg>' +
        '</div>';

    $('#' + w.general.renderTo).append(transferButton)
    $('#' + w.general.renderTo).find('div#transfer').click(() => goToSheetByNumber(page))
}

// Функция для перехода между листами одного дашборда (без перезагрузки страницы)
function goToSheetByNumber(sheetNumber) {
    $("#va-sheet-tabs>li:nth-child(" + sheetNumber + ")").trigger("click");
}
