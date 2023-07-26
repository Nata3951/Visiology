// Дублируем полный объект w
let wDup = JSON.parse(JSON.stringify(w));

// создаем новые колонки
wDup.data.records = wDup.data.records.map((el, ind) => {
    return {
        "rowNames": el.rowNames,
        "column 0": el["column 0"],
        "column 1": el["column 1"],
        "column 2": el["column 2"] +"% ("+ el["column 3"] + ")",
        "column 3": el["column 4"]+"% ("+ el["column 5"] + ")",
        "recid": el.recid,
    }; 
});

// создаем новые заголовки колонок

wDup.data.columns[0].captions = [""];
wDup.data.columns[1].captions = ["Предмет лизинга/ аренды"];
wDup.data.columns[2].captions = ["Кол-во, ед."];
wDup.data.columns[3].captions = ["LTV"];
wDup.data.columns[4].captions = ["Простой"];
wDup.data.columns[5].captions = ["Неработосп."];

// удалим ненужные заголовки колонок
wDup.data.columns.splice(6,2);

// Отрисовываем виджет
TableRender({
    table: wDup.general,
    style: wDup.style, 
    columns: wDup.data.columns,
    records: wDup.data.records,
    editMask: wDup.data.editMask,
    rowNames: wDup.data.rowNames,
    colNames: wDup.data.colNames,
    showToolbar: false
});


// функция выбора цвета
function chooseColor(value, min, med, max) {
    if (isNaN(value)) return '';
    else if (value < min) return '#ccebdb';
    else if (value < med) return '#FFFFCC';
    else if (value < max) return '#FCC1C1';
    else return '#FF6666';
}


// зададим цвет фона ячеек
// LTV
$('#table-' + w.general.renderTo + ' tr > td:nth-child(4)').each(function(i, td) {
    let cell_value = +td.innerText;
        $(td).css({
        "background-color": chooseColor(cell_value, 1, 1.11, 1.21),
    });
});

let industry = wDup.data.rowNames[0][0];

// простой
$('#table-' + w.general.renderTo + ' tr > td:nth-child(5)').each(function(i, td) {
        let cell_value = +(td.innerText.split('%')[0]);
        if (industry === 'Водный транспорт')  {
            $(td).css({"background-color": chooseColor(cell_value, 0.001, 11, 20)});
        }
        else if (industry === 'Авиация' || industry === 'Ж/Д Транспорт') {
            $(td).css({"background-color": chooseColor(cell_value, 6, 16, 30)});
        }
        else $(td).css({"background-color": ""});
});

// неработоспособность
$('#table-' + w.general.renderTo + ' tr > td:nth-child(6)').each(function(i, td) {
        let cell_value = +(td.innerText.split('%')[0]);
        if (industry === 'Ж/Д Транспорт')  {
            $(td).css({"background-color": chooseColor(cell_value, 6, 16, 30)});
        }
        else $(td).css({"background-color": chooseColor(cell_value, 10, 21, 30)});
});


// зафиксируем шапку таблицы
$('#table-' + w.general.renderTo).css({'border-collapse':'collapse'}); // initial - жирные разделители столбцов; collapse - тонкие разделители

document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});

// уберем первую колонку таблицы
$('#table-' + w.general.renderTo + ' th:first-child').remove();
$('#table-' + w.general.renderTo + ' tbody > tr > td:first-child').remove();
    

// создадим сводный ряд
let final = document.getElementById('table-' + w.general.renderTo);
let newRow = final.insertRow(-1);

var cell_total = newRow.insertCell(0);
var cell_qty = newRow.insertCell(1);
var cell_ltv = newRow.insertCell(2);
var cell_idle = newRow.insertCell(3);
var cell_eff = newRow.insertCell(4);

// функция для подсчета суммы колонки в исходном наборе данных
function columnSum(col_number) {
    let sum = 0;
    for (let i = 0; i < w.data.records.length; i++) {
        let value = w.data.records[i]["column "+col_number]; // извлекаем числовое значение из ячейки
        if (!isNaN(value))  sum += value;
    }
    return sum;
}

cell_total.innerText = 'ИТОГО';
cell_qty.innerText = columnSum(0); // см. номера колонок в привязке данных
cell_ltv.innerHTML = '';
cell_idle.innerHTML = columnSum(3);
cell_eff.innerHTML = columnSum(5);

// отформатируем таблицу

// заголовок, первая ячейка
$('#table-' + w.general.renderTo + ' th:nth-child(1)')
.css({
    "width":"25%",
    'padding-left' : '10px',
    'word-break':'normal',
});

// заголовок, текст всех ячеек
$('#table-' + w.general.renderTo + ' thead div span')
.css({
    "text-align":'left',
    'font-weight':'500'
});

// тело, первая колонка
$('#table-' + w.general.renderTo + ' td:nth-child(1)').css({
    "padding-left":"10px",
    'font-weight':'500'
});

// тело, все колонки кроме первой
$('#table-' + w.general.renderTo + ' td:not(:nth-child(1))').css({
    "text-align":'right',
    "padding-right":"10px",
});

// последняя строка
$('#table-' + w.general.renderTo + '> tbody > tr:last-child > td').css({
    'backgroundColor':'#fff',
    'position':'sticky',
    'bottom' : 0,
    'font' : '500 15px Open Sans',
    'height' : '30px', // высота строки
    'border-top' : '1px solid grey',
});


// форматируем числа в колонке кол-во единиц
$('#table-' + w.general.renderTo + ' tr > td:nth-child(2)').each(function(i, td) {
    td.innerText = td.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}); 

// форматируем числа в последней строке
$('#table-' + w.general.renderTo + '> tbody > tr:last-child > td').each(function(i, td) {
    td.innerText = td.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}); 





