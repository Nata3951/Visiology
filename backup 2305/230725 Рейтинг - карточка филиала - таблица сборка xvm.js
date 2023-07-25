// Создаем полный объект w
let wDup = JSON.parse(JSON.stringify(w))

// Отфильтровываем строки, если отсутствуют данные по базовому периоду
wDup.data.records = w.data.records.filter((el, ind) => (el['column 0'] !== 0 && el['column 1'] !== 0 && el['column 2'] !== 0));
// Период базовый,  динамика 
wDup.data.records = wDup.data.records.map((el, ind) => {
    return {
        "rowNames": el.rowNames,
        "column 0": el["column 3"],
        "column 1": el["column 4"],
        "column 2": el["column 5"],
        "column 3": el["column 3"] - el["column 0"],
        // "column 4": el["column 4"] - el["column 1"], 
        // "column 5": el["column 5"] - el["column 2"],
        // "column 3": el["column 0"] - el["column 3"],
        "column 4": el["column 1"] - el["column 4"], 
        "column 5": el["column 2"] - el["column 5"],
        "recid": el.recid
    } 
})

// Перемещаем колонки периода сравнения правее базового периода
wDup.data.colNames = [
    wDup.data.colNames[3],
    wDup.data.colNames[4],
    wDup.data.colNames[5],
    wDup.data.colNames[0],
    wDup.data.colNames[1],
    wDup.data.colNames[2]
];

wDup.data.colNames.forEach((el, ind) => { 
    // Меняем названия колонок
    if (el[0] == 'Рейтинг РЭС в обществе') {
        el[0] = 'Рейтинг в Обществе';
    }
    // Меняем названия колонок
    if (el[0] == 'Рейтинг РЭС в филиале') {
        el[0] = 'Рейтинг в филиале';
    }
    

    // Меняем формат даты (Период базовый / период сравнения)
    if ((ind == 0) || (ind == 1) || (ind == 2)) {
        el[1] = el[1].split('-')[0]
    } else {
        let date = w.data.colNames[0][1];
        el[1] = "Динамика в сравнении с " + date
    }
    
    // Переварачиваем названия колонок
    el = el.reverse()
    
    wDup.data.columns[ind+1].captions = el
})



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



// фиксируем шапку
$('#table-' + w.general.renderTo).css({'border-collapse':'collapse'});
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
  var translate = "translate(0,"+this.scrollTop+"px)";
  this.querySelector("thead").style.transform = translate;
});
    
// форматируем шапку (текст в нижней строке заголовка таблицы)
$('#table-'+w.general.renderTo+' > thead  div span').css({ 
    'text-align' : 'left',
    'word-break' : 'normal',
});

// настраиваем колонки
$('#table-' + w.general.renderTo + ' th:nth-child(1)').css({
    "width":"25%"
});

// Позиционируем текст внутри ячеек
[2,3,4,5,6,7].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        $(td).css({
            'text-align': 'right',
            "padding-right" : "10px"
        });
    }); 
});     

// раскрашиваем ячейки
[5,6,7].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        td.innerText = td.innerText > 0 ? "+"+td.innerText : td.innerText;
        $(td).css({
            'color': chooseColor(td.innerText)
        });
    }); 
});


// вставляем пробелы и округляем цифры
function numberWithSpaces(x) { 
  var parts = x.toString().split(".");
  let head = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  let tail = parts[1] ? (parts[1]+"00").slice(0,2) : "00";
  return head+'.'+ tail;
}

// Выбираем цвет
function chooseColor(v) {
    if (v < 0) {
        return '#ff595a';
    } else {
        if (v == 0) {
            return '#49aff8';
        } else {
            return '#56ad83';
        }
    }
}
