let green = '#aed58199',
    darkGreen = '#4caf50',
    yellow = '#ffea0066',
    darkYellow = '#ffab40',
    red = '#ff8a8066',
    darkRed = '#ff1744',
    borderColor = '#e7e7e7';

// убираем значки сортировки колонок
w.data.columns.forEach((el) => {
    el.sortable = false;
});


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

// зафиксируем заголовок
$('#table-' + w.general.renderTo)
    .css({
    'border-collapse' : 'separate',
    'border-spacing' : 0,
    });

$('#table-' + w.general.renderTo + ' th')
    .css({
    position: 'sticky',
    top: -2,
    border: `1px solid ${borderColor}`,
    backgroundColor : 'white',
    });

// создадим сводную строку
var final = document.getElementById('table-' + w.general.renderTo);
var newRow = final.insertRow(-1);

var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);


cell1.innerHTML = '<span>ИТОГО</span>';

// функция для подсчета суммы колонки в исходном наборе данных
function columnSum(col_number) {
    let sum = 0;
    for (let i = 0; i < w.data.records.length; i++) {
        let value = w.data.records[i]["column "+col_number]; // извлекаем числовое значение из ячейки
        if (!isNaN(value))  sum += value;
    }
    return Math.round(sum).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
}

cell2.innerHTML = columnSum(0);
cell3.innerHTML = columnSum(1);
cell4.innerHTML = columnSum(2);

newRow.style.fontWeight = 'bold';
newRow.style.fontFamily = 'Open Sans';
newRow.style.fontSize = '12px';
newRow.style.position  = 'sticky';
newRow.style.bottom  = 0;
newRow.style.backgroundColor  = 'white';
// устанавливаем высоту строки
newRow.style.height = '30px'; 
newRow.style.border = `1px solid ${borderColor}`;


// форматируем текст шапки 
$(`#table-${w.general.renderTo} thead tr th`).css({ 
    verticalAlign : 'bottom',
});


// добавим единицы измерения к названиям колонок

let colName = {
    1: {
        val : 'ТИП ВАГОНА',
        width : '12%',
        align : 'left',
        padding_left : 10,
    },
    2: {val : 'КОЛ-ВО ВАГОНОВ',},
    3: {val : 'В Т.Ч. ПЕРЕДАНО',},
    4 : {
        val : `ОСТАТОК НЕВОЗМЕЩЕННЫХ ИНВЕСТИЦИЙ, <span class="unit"> млн руб.</span>`,
        width : '12%',
    },
    5 : {
        val : `СРЕДНЕВЗВ. СТАВКА ПО ДОГОВОРАМ + РЕМОНТЫ, <span class="unit">руб./вагон/сутки</span>`,
        width : '14%',
    },
    6 : {
        val : `ТЕКУЩАЯ РЫНОЧНАЯ СТАВКА <span class="unit">руб./вагон/сутки</span>`,
        width : '12%',
    },
};

for (let key in colName) {
$(`#table-${w.general.renderTo} th:nth-child(${key})`)
    .css({
        'text-align' : colName[key].align == 'left' ? 'left' : 'right',
        'word-break' : 'normal',
        width : colName[key].width,
    })
    .html(colName[key].val);    
}

$(`#table-${w.general.renderTo} span.unit`).css({
    color : 'grey',
    fontWeight : 'normal',
})

$(`#table-${w.general.renderTo} > thead  th *`).css({ 
    'text-align' : 'right',
    'word-break' : 'normal',
});

// форматируем числа

function numberWithSpaces(value, points=0, div=',') { 
    if(!value) return "";
    let parts = value.toString().split(".");
    let head = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let tail = parts[1] ? (parts[1]+"0000000").slice(0,points) : "0".repeat(points);
    return head+div+tail;
}

[2,3, 4, 5, 6].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        var value = +td.innerHTML;
        td.innerText = numberWithSpaces(td.innerText, 0, ''); 
        $(td).css({
            'text-align': 'right',
            'padding-right' : '10px',
        });
    }); 
});

// раскрасим колонку "запас прочности" и добавим знак %
[7].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        $(td).css({
            backgroundColor: 
                td.innerText > 20 ? green : 
                td.innerText > 0 || td.innerText === 0 ? yellow : 
                td.innerText < 0 ? red : '',
            textAlign: 'right',
            paddingRight : 5,
        });
        td.innerText = numberWithSpaces(td.innerText, 0, '%');
    }); 
});

// отформатируем колонку "прогноз рыночных ставок"
[8].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        let color_ = td.innerText < 0 ? darkRed : darkGreen;
        let sign = td.innerText < 0 ? '&#9660;' : '&#9650;';
        td.innerText = numberWithSpaces(td.innerText, 1, ',')+'%';
        td.innerHTML +=`<span style="color: ${color_}"> ${sign} </span>`;
        $(td).css({
            textAlign: 'right',
            paddingRight : 10,
        });
    }); 
});

// сделаем текст всех ячеек, кроме первых, жирным
$('#table-' + w.general.renderTo + ' tr > td').not(":first-child").css({fontWeight:'bold'})

// добавим padding в первую колонку
$('#table-' + w.general.renderTo + ' tr > td:first-child').css({paddingLeft:10});
$('#table-' + w.general.renderTo + ' th:first-child').css({paddingLeft:10});

// console.log('test w', w)
