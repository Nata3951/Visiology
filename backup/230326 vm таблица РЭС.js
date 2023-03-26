// console.log('test => w: ', w);

w.data.colNames.forEach(el => el = el.reverse());
 
w.data.records = w.data.records.filter((el, ind) => {
    if (el['column 3'] == 0 && el['column 4'] == 0 && el['column 5'] == 0) { 
        return false;
    } else { 
        return true;
    }
});

let wDup = JSON.parse(JSON.stringify(w));

w.data.records.forEach((el, ind) => {
    el['column 0'] = wDup.data.records[ind]['column 3'];
    el['column 1'] = wDup.data.records[ind]['column 4'];
    el['column 2'] = wDup.data.records[ind]['column 5'];
    el['column 3'] = wDup.data.records[ind]['column 0'] - wDup.data.records[ind]['column 3'];
    el['column 4'] = wDup.data.records[ind]['column 1'] - wDup.data.records[ind]['column 4'];
    el['column 5'] = wDup.data.records[ind]['column 2'] - wDup.data.records[ind]['column 5'];
});


// правим column names

w.data.colNames.forEach(el => el[1] = el[1].replace("РЭС", ""));
w.data.colNames.forEach(el => el[1] = el[1].replace("обществе", "Обществе"));

// console.log("dataset =>", w);

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

// переименовываем верхний уровень шапки
let nameFirstColumn = (w.data.colNames[3][0].split('-')[1] == '12' ? w.data.colNames[3][0].split('-')[0] : "6 мес " + w.data.colNames[3][0].split('-')[0])
let nameSecondColumn = (w.data.colNames[0][0].split('-')[1] == '12' ? "Динамика в сравнении с " + w.data.colNames[0][0].split('-')[0] : "Динамика в сравнении с 6 мес " + (w.data.colNames[0][0].split('-')[0]))
// console.log(nameFirstColumn)
// console.log(nameSecondColumn)
$("#table-"+w.general.renderTo+" > thead > tr.tablesorter-ignoreRow > th:nth-child(2) > div > span:nth-child(1)")[0].innerText = nameFirstColumn;
$("#table-"+w.general.renderTo+" > thead > tr.tablesorter-ignoreRow > th:nth-child(5) > div > span:nth-child(1)")[0].innerText = nameSecondColumn;

// фиксируем шапку
$('#table-' + w.general.renderTo).css({'border-collapse':'collapse'});
document.getElementById("grid-"+ w.general.renderTo).addEventListener(
    "scroll", function(){
      var translate = "translate(0,"+this.scrollTop+"px)";
      this.querySelector("thead").style.transform = translate;
    });
    

// форматируем шапку
// текст в нижней строке заголовка таблицы
$('#table-a1ff7434ad284c39a678f2634b457ce9 > thead  div span').css({ 
    'text-align' : 'left',
    'word-break' : 'normal',
});

// настраиваем колонки

$('#table-' + w.general.renderTo + ' th:nth-child(1)').css({
    "width":"100px",
});

[3,4,6,7].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        $(td).css({
            'text-align': 'right',
            "padding-right" : "10px",

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

[2,5].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        td.innerText = numberWithSpaces(td.innerText); 
        $(td).css({
            'text-align': 'right',
            "padding-right" : "10px",
        });
    }); 
});

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

// раскрашиваем ячейки
[5,6,7].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        td.innerText = td.innerText > 0 ? "+"+td.innerText : td.innerText;
        $(td).css({
            'color': 
                chooseColor(td.innerText)
        });
    }); 
});
