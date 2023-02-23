
// ---------------------------------------------

window.render1 = function (dynamics) {
    console.log("10 лучших", w)
    w.data.columns[0].captions[0] = "Филиал|Подразделение";
    w.data.columns[1].captions[0] = "Дин";
    w.data.colNames[0] = "Дин";
    

    TableRender({
        table: w.general,
        style: w.style,
        columns: w.data.columns,
        records: dynamics,
        editMask: w.data.editMask,
        rowNames: w.data.rowNames,
        colNames: w.data.colNames,
        showToolbar: false
    });  
    
    $("#" + "table-" + w.general.renderTo).find("th:nth-child(2)").css( "width", "50px");
    $('td').css({"padding": "2px"});
    document.querySelectorAll("#table-" + w.general.renderTo + " > tbody > tr").forEach(el => el.children[1].innerText > 0 ? el.children[1].style.color = "#4caf50" : el.children[1].style.color = "#ff8a80")

// ---------------------------------------------

var cssimg = '';

// сортировка по первой колонке
w.data.rowNames.sort(function(a, b) {
    return (Number(a[0]) > Number(b[0])) ? 1: -1;
});
w.data.records.sort(function(a, b) {
    return Number(Number(a.rowNames[0]) > Number(b.rowNames[0])) ? 1: -1;
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

// hardcoding column names, alignment
$('#table-' + w.general.renderTo + ' th:nth-child(1)')
.text('КПЭ')
.css({
    "text-align": "center"
});

$('#table-' + w.general.renderTo + ' th:nth-child(2)')
.text('Наименование показателя')
.css({
    "text-align": "center"
});

// фиксируем шапку
$('#table-' + w.general.renderTo).css({'border-collapse':'collapse'});
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});

// запрещаем перенос строк и прячем остаток строки
$('#table-' + w.general.renderTo + ' td')
.css({"overflow":"hidden", 'white-space':'nowrap'})

// ширина колонок
$('#table-' + w.general.renderTo + ' th:nth-child(1)')
.css({
    "width":"100px"
});
$('#table-' + w.general.renderTo + ' th:nth-child(2)')
.css({
    "width":"500px"
});

// добавляем высоту строк
$('#table-' + w.general.renderTo + ' tbody > tr > td').css({
    'margin-block-start': '0',
    'padding':'7px 10px'
});

// форматирование колонок
[1].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        var value = +td.innerHTML;
        $(td).css({
            'text-align': 'left',
          //  'font-weight' : '600',
            'vertical-align': 'top',
            'color': '#696969',
            'font-size': 16
        });
    }); 
}); 
[2,3,4].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        var value = +td.innerHTML;
        $(td).css({
            'text-align': 'left',
         //   'font-weight' : '600',
            'vertical-align': 'center',
            'color': '#696969',
            'font-size': 16
        });
    }); 
}); 
[5].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        $(td).css({
        'background-color' : 'rgba(85, 131, 164, 0.07)',

        });
    }); 
}); 
[5,6,7,8,9].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        var value = +td.innerHTML;
   //     td.innerText = numberWithSpaces(td.innerText); 
        $(td).css({
            'text-align': 'center',
            'font-weight' : '600',
            'color': '#607D8B',
            'font-size': 16
     //     'background-color' : '#000000'
        });
    }); 
}); 
$('#table-' + w.general.renderTo + ' tr > td:nth-child(5)').each(function(i, td) { // child(4) - раскраска для ячеек 4 столбца
    var value = +td.innerHTML;
    var color = '#049D4B'; 
    // if (value >= 1)
    //    color = '#049D4B';
    //       else if (value < 90) 
    //       color = 'tomato';
    $(td).css({ // размещение данных в столбце
        "color": color, // установленного цвета
    });
});
var rows = $('#table-' + w.general.renderTo + ' tbody').children();
$.each(rows, function(key, value) {
    if (/[a-zа-яё]/i.test(value.cells[4].innerHTML)) {
    value.cells[4].innerHTML;
    }else{
        value.cells[4].innerHTML = value.cells[4].innerHTML.substr(0, value.cells[4].innerHTML.indexOf('.') + 3);
    }
});
$.each(rows, function(key, value) {
    if (/[а-яё]/i.test(value.cells[5].innerHTML)) {
    value.cells[5].innerHTML;
    }else{
        value.cells[5].innerHTML = value.cells[5].innerHTML.substr(0, value.cells[5].innerHTML.indexOf('.') + 3);
        value.cells[6].innerHTML = value.cells[6].innerHTML.substr(0, value.cells[6].innerHTML.indexOf('.') + 3);
        value.cells[7].innerHTML = value.cells[7].innerHTML.substr(0, value.cells[7].innerHTML.indexOf('.') + 3);
        value.cells[8].innerHTML = value.cells[8].innerHTML.substr(0, value.cells[8].innerHTML.indexOf('.') + 3);
    }
});      
$('#table-' + w.general.renderTo + ' tbody tr').each(function(index,item){
    var val = +$(item.children[2]).innerHTML; //children[2] - берем значение третьего столбца
    if (val == 1){
        $(item).css({background: "#eceff1"}); //Цвет, если больше нуля
    }else{
         $(item).css({background: "#ffffff"});  //Цвет, если меньше нуля
    }
});        
 $('#table-' + w.general.renderTo + ' tbody tr').each(function(index,item){
    var val = +$(item.children[1]).text(); //children[2] - берем значение третьего столбца
    if (val == 1 || val == 2 || val == 3 || val == 4|| val == 5|| val == 6|| val == 7|| val == 8|| val == 9|| val == 10|| val == 11|| val == 12
    || val == 13|| val == 14|| val == 15|| val == 16|| val == 17|| val == 18|| val == 19|| val == 20|| val == 21|| val == 22|| val == 23|| val == 24){
        $(item).css({background: "#ffffff", 'font-weight': 'bold' }); //Цвет, если больше нуля
    }else{
        $(item).css({background: "#ffffff"});  //Цвет, если меньше нуля
    }
});
$('#table-' + w.general.renderTo + ' tbody > tr > td:nth-child(1)').remove();
$('#table-' + w.general.renderTo + ' th:nth-child(9)').remove();
$('#table-' + w.general.renderTo + ' th').css({
    'border': 'none'
});
$('#table-' + w.general.renderTo + ' th:last-child').css({
    'display': 'none'
});

$('#table-' + w.general.renderTo + ' tbody > tr > td:last-child').css({
    'display': 'none'
});

// Добавляем доп.столбец в заголовок
let colSparkLineName = ''
if (periodValue === 'year') {
    colSparkLineName = 'годам'
}
if (periodValue === 'quartal') {
    colSparkLineName = 'кварталам'
}
if (periodValue === 'month') {
    colSparkLineName = 'месяцам'
}
if (periodValue === 'week') {
    colSparkLineName = 'неделям'
}
const thHeader = document.createElement('th')
thHeader.innerHTML = `<span style="font-family: ${w.style.header.textStyle.fontFamily}">По ${colSparkLineName}</br> <span style="color:#1c4680"> ● </span> план,<span style="color:#ba68c8"> ● </span> факт </span>`
thHeader.style.background = '#fff'
thHeader.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)'
thHeader.style.height = '50px'
document.querySelectorAll('#widget-' + w.general.renderTo + ' thead th')[sparklineSetColumn].after(thHeader)

## Number with spaces

// вставляем пробелы и округляем цифры 


function numberWithSpaces(x) {
  var parts = x.toString().split(".");
  let head = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  let tail = parts[1] ? parts[1].slice(0,1) : 0;
  return head +'.'+ tail;
}

[4].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        var value = +td.innerHTML;
        td.innerText = numberWithSpaces(td.innerText); 
        $(td).css({
            'text-align': 'right',
        });
    }); 
}); 
