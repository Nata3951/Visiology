## Шапка

### Отформатировать текст всех заголовков; запретить разрывать слово
```javascript
// форматируем текст шапки 
$(`#table-${w.general.renderTo} > thead  th`).css({ 
    'text-align' : 'left',
    'word-break' : 'normal',
});
```

### Переименовать колонки
```javascript
w.data.columns[0].captions[0] = "Филиал|Подразделение";
```    

### сортировка по первой колонке
```javascript
w.data.rowNames.sort(function(a, b) {
    return (Number(a[0]) > Number(b[0])) ? 1: -1;
});
w.data.records.sort(function(a, b) {
    return Number(Number(a.rowNames[0]) > Number(b.rowNames[0])) ? 1: -1;
});
```
### убираем лишнюю сортировку
```javascript
// убираем значки сортировки
// NB над шапкой дополнительно положим заглушку
w.data.columns.forEach((el) => {
    el.sortable = false;
});
```


### CSS hardcoding column names, alignment
```javascript
$(`#table-${w.general.renderTo} th:nth-child(1)`)
.text('КПЭ')
.css({
    textAlign: 'left',
    width: '80%',
});
```

### вертикальное выравнивание текста в заголовке таблицы
```javascript
// вертикальное выравнивание текста в заголовке таблицы
$(`#table-${w.general.renderTo}> thead > tr > th `)
.css({
    'vertical-align' : 'top',
     'padding-top' : '1px',
});
```
### многоуровневая шапка
```javascript

[2,3,4,5,6,7].forEach(function(j) {
    $(`#table-${w.general.renderTo} > thead > tr:nth-child(2) > th:nth-child(${j})`)
        .attr("rowspan", "2");
});

$(`#table-${w.general.renderTo} th:contains("актические")`)
.attr("colspan", "2");

```

### фиксируем шапку
#### better
```javascript
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
border: '0px solid white',
});
```

### переименовываем верхний уровень шапки
```javascript
$("#table-"+w.general.renderTo+" > thead > tr.tablesorter-ignoreRow > th:nth-child(2) > div > span:nth-child(1)")[0].innerText = w.data.colNames[3][0];
$("#table-"+w.general.renderTo+" > thead > tr.tablesorter-ignoreRow > th:nth-child(5) > div > span:nth-child(1)")[0].innerText = w.data.colNames[0][0];
```

#### old
```javascript
$('#table-' + w.general.renderTo).css({'border-collapse':'collapse'});
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});
```

### переименовываем верхний уровень шапки
```javascript
$("#table-"+w.general.renderTo+" > thead > tr.tablesorter-ignoreRow > th:nth-child(2) > div > span:nth-child(1)")[0].innerText = w.data.colNames[3][0];
$("#table-"+w.general.renderTo+" > thead > tr.tablesorter-ignoreRow > th:nth-child(5) > div > span:nth-child(1)")[0].innerText = w.data.colNames[0][0];
```



## Другое

### заменить текст в ячейках
```javascript
$(`#table-${w.general.renderTo} td`)
    .each(function(i, td) {
        td.innerText = td.innerText.replace("2018", '2023'); 
    });
```

### выбрать все кроме
колонки кроме первой
```javascript
var $cols = $('#table-' + w.general.renderTo + ' td:not(:nth-child(1))');
$cols.css({
    "font-weight":"500",
});

// ячейки кроме первой и последней

// выравниваем числовые ячейки по правому краю
$(`#table-${w.general.renderTo} td`)
    .not(":last-child")
    .not(":first-child")
    .css({ 
        "text-align" : "right",
        "padding-right" : '10px',
});

```



### queryselector
```javascript
    document.querySelectorAll("#table-" + w.general.renderTo + " > tbody > tr").forEach(el => el.children[1].innerText > 0 ? el.children[1].style.color = "#4caf50" : el.children[1].style.color = "#ff8a80")
```


    
### запрещаем перенос строк в ячейках и прячем остаток строки

```javascript
// запрещаем перенос строк в ячейках и прячем остаток строки
$('#table-' + w.general.renderTo + ' td')
.css({"overflow":"hidden", 'white-space':'nowrap'})
```

### ширина колонок
```javascript
// ширина колонок (1-based)
$(`#table-${w.general.renderTo} th:nth-child(1)`)
.css({
"width":"50%",
});

// настраиваем ширину колонок

let width = {'Номер МЦ':'7%','Наименование':'15%', 'ЕП':'3%', 'Итого':'4%', 'Резерв':'4%', 'Дата рез':'5%', 'дата договора':'8%', '№ ПКП':'5%' };

for (let key in width) {
    $(`#table-${w.general.renderTo} th:contains(${key})`)
    .css({
            "width":width[key]
        });
}

```

### добавляем высоту строк; padding
```javascript
$('#table-' + w.general.renderTo + ' tbody > tr > td').css({
    'margin-block-start': '0',
    'padding':'7px 10px'
});
```

## форматирование колонок

```javascript
[2,3,4].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        var value = +td.innerHTML;
        $(td).css({
            'text-align': 'left',
            'font-weight' : '600',
            'vertical-align': 'top',
            'color': '#696969',
            'font-size': 16
        });
    }); 
});

// v2
$('#table-' + w.general.renderTo + ' tbody tr')
    .each(function(index,item){
    $(item.children[4]).css({"text-align": "center"});
    $(item.children[5]).css({"text-align": "center"});
    $(item.children[6]).css({"text-align": "right"});
    $(item.children).css({"padding-left": "10px", "padding-right": "10px"});
})
.css("height", "40px");


 
```

### раскрасить положительные и отрицательные значения
```javascript
// раскрашиваем ячейки
[5,6,7].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        td.innerText = td.innerText > 0 ? "+"+td.innerText : td.innerText;
        $(td).css({
            'color': chooseColor(td.innerText)
        });
    }); 
});

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
```

### раскрасить ячейки
```javascript
<div style="color: ${data[2][el] < 0 ? '#93a4ad' : '#49aff8'}" class="table-body-element table-body-element-value">${data[2][el] < 0 ? data[2][el] : `+${data[2][el]}`}</div>

// v2

// раскрасим ячейки
[5,6,7].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        $(td).css({
            'color': 
                td.innerText < 0 ? '#ff595a' : 
                td.innerText === 0 ? '#49aff8' : '#56ad83'
        });
    }); 
});

```

### добавить цветные треугольники к тексту
```javascript
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

/// v2

function setMarker(difference) {
    if (difference < 0) return `<span style = "color:tomato">&#9660;</span>`;
    else return `<span style = "color:green">&#9650;</span>`;
}

```



### удалить столбцы

```javascript
$('#table-' + w.general.renderTo + ' tbody > tr > td:nth-child(1)').remove();

$('#table-' + w.general.renderTo + ' th:nth-child(9)').remove();

$('#table-' + w.general.renderTo + ' th').css({
    'border': 'none'
});

$(`#table-${w.general.renderTo} th:last-child`).css({
    'display': 'none'
});

$(`#table-${w.general.renderTo} tbody > tr > td:last-child`).css({
    'display': 'none'
});
```

### поменять местами столбцы

```javascript
let wDup = JSON.parse(JSON.stringify(w));

w.data.records.forEach((el, ind) => {
    el['column 0'] = wDup.data.records[ind]['column 3'];
    el['column 1'] = wDup.data.records[ind]['column 4'];
    el['column 2'] = wDup.data.records[ind]['column 5'];
    el['column 3'] = wDup.data.records[ind]['column 3'] - wDup.data.records[ind]['column 0'];
    el['column 4'] = wDup.data.records[ind]['column 4'] - wDup.data.records[ind]['column 1'];
    el['column 5'] = wDup.data.records[ind]['column 5'] - wDup.data.records[ind]['column 2'];
});
```

### Number with spaces
```javascript
// вставляем пробелы и округляем цифры 

#### v1
function numberWithSpaces(x) {
  var parts = x.toString().split(".");
  let head = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  let tail = parts[1] ? parts[1].slice(0,1) : 0;
  return head +'.'+ tail;
}

#### v2
function numberWithSpaces(value, points=0, div=',') { 
    if(!value) return "";
    let parts = value.toString().split(".");
    let head = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let tail = parts[1] ? (parts[1]+"0000000").slice(0,points) : "0".repeat(points);
    return head+div+tail;
}

// 0-based
[4].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        var value = +td.innerHTML;
        td.innerText = numberWithSpaces(td.innerText); 
        $(td).css({
            'text-align': 'right',
            'padding-right' : '10px',
        });
    }); 
});

#### v3

$('#table-' + w.general.renderTo + ' tbody tr')
    .each(function(index,item){
    $(item.children[4]).css({"text-align": "center"});
    $(item.children[5]).css({"text-align": "center"});
    $(item.children[6]).css({"text-align": "right"})
    .text(function(x) {
            return $(this).text().replace(/\B(?=(\d{3})+(?!\d))/g, " ") ;
    });
    $(item.children).css({"padding-left": "10px", "padding-right": "10px"});
});

```

 
$('#table-' + w.general.renderTo).css({
    'width': '350', 'vertical-align':'top', 'margin': '0 20px' // ширина таблицы и её отступ от края виджета (могут быть 4 разных отступа со всех сторон)
});

$('#table-' + w.general.renderTo + ' tbody > tr > td:nth-child(1n+2)').css({
    'vertical-align':'top', 'text-align':'right' //свойства к колонок с цифрами
});

### чересполосица
```javascript
//четные строки для чресполосицы
$('#table-' + w.general.renderTo + ' tr:nth-child(even) td').css({
    'background-color': '#ffffff', 'border':'1px solid #eeeeee' 
});

//нечетные строки для чресполосицы
$('#table-' + w.general.renderTo + ' tr:nth-child(odd) td').css({
    'background-color': '#f5f5f5', 'border':'1px solid #eeeeee' 
});
```    

// раскрашиваем ячейки и добавляем плюсы к значениям больше ноля
[5,6,7].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        td.innerText = td.innerText > 0 ? "+"+td.innerText : td.innerText;
        $(td).css({
            'color': 
                chooseColor(td.innerText)
        });
    }); 
});

## Сводный ряд

### снизу

```javascript
// создадим сводную строку
var final = document.getElementById('table-' + w.general.renderTo);
var newRow = final.insertRow(-1);

var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);


cell1.innerHTML = '<span style="padding-left:5px">ИТОГО</span>';

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
newRow.style.fontSize = 13;
// newRow.style.backgroundColor = 'pink';
newRow.style.position  = 'sticky';
newRow.style.bottom  = 1;
// устанавливаем высоту строки
newRow.style.height = '30px'; 
newRow.style.border = '1px solid #fafafa';

```

### сверху
```javascript
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

// создадим сводную строку
let final = document.getElementById('table-' + w.general.renderTo);
let newRow = final.insertRow(1);

var cell_total = newRow.insertCell(0);
var cell_qty = newRow.insertCell(1);


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

// зафиксируем шапку таблицы
$('#table-' + w.general.renderTo + '> thead').css({
    'backgroundColor':'gold', // выставить белый фон, чтобы не просвечивали другие строки при прокрутке
    'position':'sticky',
    'height' : '30px', // высота строки
    'top' : 0,
});

// зафиксируем сводную строку
$('#table-' + w.general.renderTo + '> tbody > tr:first-child > td').css({
    'backgroundColor':'pink', // выставить белый фон, чтобы не просвечивали другие строки при прокрутке
    'position':'sticky',
    'height' : '30px',
    'top' : 30,


### скругление углов таблицы
```javascript
// Задаем скругление углов для таблицы
$('#grid-' + w.general.renderTo).css({'border-radius': '8px'})
```



