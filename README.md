# Visiology vidget modifications

## Ссылки
&showNav=true   показывает навигацию по страницам

https://portal/viewer/public?dashboardGuid=575867ee1f43d637074f0d0&showNav=true&fit=true

## Таблица

```javascript
\\ стиль шрифта заголовка
const thHeader = document.createElement('th')
thHeader.innerHTML = `<span>По ${colSparkLineName}</br> <span style="color:#1c4680"> ● </span> план,<span style="color:#ba68c8"> ● </span> факт </span>`;
thHeader.style.font = 'bold 12px sans-serif ';


\\ раскрасить ячейки
<div style="color: ${data[2][el] < 0 ? '#93a4ad' : '#49aff8'}" class="table-body-element table-body-element-value">${data[2][el] < 0 ? data[2][el] : `+${data[2][el]}`}</div>
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

