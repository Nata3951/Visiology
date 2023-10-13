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

## Tooltip formatting
```javascript
w.tooltip.formatter = function () {
    var s = '<b>' + this.x + '</b>';

    $.each(this.points, function () {
        var symbol = '●';
        if (this.series.name != "area")
        s += '<br/>' + '<span style="color:' + this.series.color + '">' + symbol + '</span>' + ' ' + this.series.name + ': ' + this.y;
    });

    return s;
};
```

##// using formatter
w.plotOptions.series.dataLabels.formatter = function() {
    return this.y + '%';
};

w.plotOptions.series.dataLabels.formatter = function() {
    console.log('test this', this);
    return this.y + '%';
};
