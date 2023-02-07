# Visiology vidget modifications

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

## 150. Фильтры

#### 150.100 Элементы

```javascript
// скрытие радиобаттонов выбора "включить" и "исключить"
$('#'+ w.general.renderTo +' div.rb-filter-exclude-container').css({'display': 'none'});

// кнопка Выбрать отображаемые
$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({'background-color': 'tomato'});

// кнопка Снять выделение
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({'background-color': 'green'});



// кнопка применить
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({'background-color': 'green'});

// кнопка отмена
$("#" + w.general.renderTo + " .rb-filter-cancel-button").css({'background-color': 'tomato'});

// весь выпадающий фильтр
rb-filter-body-container

// видимое всегда окошко фильтра
rb-filter-header-container
```

#### 150.150 Размер шрифта на кнопках

```javascript
// Уменьшаем размер шрифта на кнопках
// кнопка Выбрать отображаемые
$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({'font-size': '10px'});
// кнопка Снять выделение
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({'font-size': '10px'});
// кнопка применить
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({'font-size': '10px'});
// кнопка отмена
$("#" + w.general.renderTo + " .rb-filter-cancel-button").css({'font-size': '10px'});
```
