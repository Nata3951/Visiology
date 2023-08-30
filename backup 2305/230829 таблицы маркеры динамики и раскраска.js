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
let yellow = '#ffea0066'; // прозрачность 40%
let green = '#aed58180';

// раскрасим первый столбец
$('#table-' + w.general.renderTo + ' tr > td:nth-child(1)').each(function(i, td) {
        if (td.innerText.slice(0,3) == 'Про') {
            $(td).css({'background-color' : red});
        }
        else if (td.innerText.slice(0,3) == 'Пре') {
            $(td).css({'background-color' : orange});
        }
        else if (td.innerText.slice(0,2) == ('На')) {
            $(td).css({'background-color' : yellow});
        }
    });
    
// добавим переносы строк в столбец 3
$('#table-' + w.general.renderTo + ' tr > td:nth-child(3)').each(function(i, td) {
        td.innerHTML = td.innerHTML.replaceAll(";", "</br>")
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

// добавим маркеры динамики рейтинга
let curr_rating = $(`#table-${w.general.renderTo} tr > td:nth-child(4)`);
let prev_rating = $(`#table-${w.general.renderTo} tr > td:nth-child(5)`);

curr_rating.each(function (i, td) {
    if (curr_rating[i].innerText >  prev_rating[i].innerText) {
       td.innerHTML += '<span style="color: crimson"> ▼</span>';
    }
});

// добавим маркеры динамики ПДЗ
let curr_pdz = $(`#table-${w.general.renderTo} tr > td:nth-child(6)`);
let prev_pdz = $(`#table-${w.general.renderTo} tr > td:nth-child(7)`);

curr_pdz.each(function (i, td) {
    if (+curr_pdz[i].innerText <  +prev_pdz[i].innerText) {
       td.innerHTML += '<span style="color: crimson"> ▼</span>';
    }
    else if (+curr_pdz[i].innerText >  +prev_pdz[i].innerText) {
       td.innerHTML += '<span style="color: green"> ▲</span>';
    }

});
