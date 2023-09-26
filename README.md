# Visiology vidget modifications

### text outline
w.plotOptions.series.dataLabels.style.textOutline = 'white';
w.plotOptions.series.dataLabels.style.textOutline = false;

## замена текста в series.name
```javascript
wDup.series.forEach(series => series.name = series.name.replace("Количество РЭС - ",""));
```

## Управление основными параметрами виджета
```javascript
w.general.type = 'spline';
```

## Подсветка элемента, выбранного на фильтре, столбчатая диаграмма с одной серией

blob:https://web.telegram.org/f3f66671-615a-491a-b8e1-d45306e43370

```javascript
var subscribeN = '1234',
filterGuid = 'eb06a1ff3e3b42fcb08cc2343ea8163d';
visApi().onSelectedValuesChangedListener({guid: subscribeN, widgetGuid: filterGuid }, function (info) {
    if (info.selectedValues.length == 1) {
        hChart.series[0].data.forEach(function(data){
            data.update({
                color: info.selectedValues[0][0] == data.name ? '#ffc106' : ''
            });
        });
    } else {
        hChart.series[0].data.forEach(function(data){
            data.update({
                color: ''
            });
        });
    }
});
```

## дополнительная ось для серии

```javascript
w.series[id].yAxis = 1; // до кода виджета
```

## Массивы

### Нормализация

```javascript
wDup.series.forEach((seriesElem, ind) => { 
    seriesElem.data.forEach(el => el.y = (el.y / arr[ind]) * 100)
});
```

### Подсчет уникальных значений

```javascript
function unique(arr) {
  return Array.from(new Set(arr));
}

w.general.text = unique(w.data.values);

TextRender({
    text: w.general,
    style: w.style
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

## Обращение к данным другого виджета

```javascript
let filterValue = visApi().getSelectedValues("5e8ff6bd76524e5b96aadb265211be19")
```
### Изменение цвета факта в зависимости от плана

```javascript
// GuId виджета "План"
const planGuId = '43bfa42ef4364cf3814e6f35393995f8';

visApi().getWidgetDataByGuid(planGuId).then(function (widgetData) {
    const planValue = widgetData.data.values.length ? widgetData.data.values[0][0] : 0
    const thisFactValue = w.data.values.length ? w.data.values[0][0] : 0
    console.log(planValue, thisFactValue, w)
    
    w.style.color = planValue > thisFactValue ? 'tomato' : 'green'
    
    TextRender({
        text: w.general,
        style: w.style
    });    
});
```

## Ссылки на страницу дашборда
&showNav=true   показывает навигацию по страницам

https://portal/viewer/public?dashboardGuid=575867ee1f43d637074f0d0&showNav=true&fit=true

## Таблица

### стиль шрифта заголовка

```javascript
const thHeader = document.createElement('th')
thHeader.innerHTML = `<span>По ${colSparkLineName}</br> <span style="color:#1c4680"> ● </span> план,<span style="color:#ba68c8"> ● </span> факт </span>`;
thHeader.style.font = 'bold 12px sans-serif ';
```

### стиль шрифта заголовка ВИДЖЕТА
```javascript
let filterValue = visApi().getSelectedValues("3fea8f5b80f342ffb5cc3ea53baed849")[0][0].split('-')[0],
    records; 
    
if (filterValue == '2022') {
    records = w.data.records.filter(el => el['column 0'] <= 113);
    $('#widget-header-' + w.general.renderTo + ' > a')[0].innerHTML = 'Попали в ТОП-113   <span style="color:green; font-weight:bold; font-size:120%; vertical-align:middle;">' + records.length + '</span>';
} else {
    records = w.data.records.filter(el => el['column 0'] <= 100);
    $('#widget-header-' + w.general.renderTo + ' > a')[0].innerHTML = 'Попали в ТОП-100   <span style="color:green; font-weight:bold; font-size:120%; vertical-align:middle;">' + records.length + '</span>';

}

//// вертикальное позиционирование 
$("#widget-header-" + w.general.renderTo + "> a").css({
    'height':'50%',
    'position':'absolute',
    'bottom':'2',
});

 ```
### скругление углов таблицы
```javascript
// Задаем скругление углов для таблицы
$('#grid-' + w.general.renderTo).css({'border-radius': '8px'})
```

### раскрасить ячейки
```javascript
<div style="color: ${data[2][el] < 0 ? '#93a4ad' : '#49aff8'}" class="table-body-element table-body-element-value">${data[2][el] < 0 ? data[2][el] : `+${data[2][el]}`}</div>

// v2
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


## Плоская таблица
NB единственное преимущество плоской таблицы - прогружает не весь датасет, а постранично. Плохо кастомизируется. По умолчанию лучше использовать обычную таблицу. 

### пофиксить пустые страницы, если пользователь меняет количество строк к показу, и на обновленной странице нет данных
```javascript
w.dataGridOptions.remoteOperations = false   
```

## Check if value is number and format number
```javascript
typeof @value == 'number' ? @value.toFixed(1).replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') : @value
```

## Текстовый виджет

### выровнять по нижней границе
```javascript
// align text at bottom
$('#widget-' + w.general.renderTo + ' > div.va-widget-body-container > div').css({
    'position' : 'absolute',
    'bottom' : 0,
});
```

### обращение к данным текстового виджета
```javascript
w.general.text = w.data.cols[0] + w.data.cols[1]; // названия колонок
w.general.text = w.data.rows[0]; // названия строк
w.general.text =w.data.values[0][0] + w.data.values[1][0];  // значения, [col][row]

```

### Text card sort by index
```javascript
w.general.text = "Данные обновлены " + w.data.rows.sort((a,b) => a > b ? -1 : 1  )[0];
```

### Text card format

#### в свойствах
```
Math.round(@value/1000000).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')  + `<br\>
<div style="color:black; font-size:15px">Запланировано оплат</div> 
<div style="color:grey; font-size:15px">(млн руб.) </div>`

@value < 0 ? (@value * 100).toFixed() +'%' :  '<div style = "color:green">' + (@value * 100).toFixed()+'%</div>'

```
#### граница виджета
```
<style>
.vl {
  border-left: 2px solid grey;
  height: 100%;
}
</style>
<div class="vl"; style="padding-left:5px">
Согласование условий, млн руб.
```


#### JS code

```javascript

let fact = w.data.values[0][0].toFixed(1);
let plan = w.data.values[1][0].toFixed(1);

if (+fact > +plan) {
    
    w.general.text =(
        '<div>' + fact 
        + '</div><div style="color:grey; font-size:16px;line-height: 25px;">' + plan + '</div>'
        );
    
    } else {
       w.general.text =(
        '<div style="color:coral;  ">' + fact 
        + '</div><div style="color:black; font-size:16px; font-weight:bold; line-height: 25px;">' + plan + '</div>'
        );
    }


TextRender({
    text: w.general,
    style: w.style
});

```

## Line marker symbol

```
w.series[0].marker.symbol = 'circle';
```

## Plot band
```
w.yAxis.plotBands = {color: "red", from:0.9, to: 1.1};
```

## 100. Круговая диаграмма

#### 100.100	Cумма в центре

```javascript
"<b>" + @total + "</b>"
```
# Поменять заглушку "у виджета нет данных"

```javascript
// Скрипт с содержимым в папку customjs и каждые 200 мс меняет надпись
setInterval(function() {
$.each($(".va-widget-error"), function () {
var text = $(this).find("div").text();
if (text == "У виджета нет данных") {
$(this).find("div").text("Другой текст");
}
});
}, 200);
```
