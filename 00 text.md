## Текстовый виджет

### граница виджета
```javascript
$('#widget-' + w.general.renderTo).css({
    'border-right': "2px solid #494b6f",
});
```

### выровнять текст по нижней границе
https://www.freecodecamp.org/news/how-to-center-an-absolute-positioned-element/

```javascript
// align text at bottom v1
$(`#widget-${w.general.renderTo} .va-widget-body`).css({
    'display': 'flex',
   'align-items' : 'flex-end',
   
});

$(`#widget-${w.general.renderTo} .va-widget-body div`).css({
   'height' : 'auto',
});


// align text at bottom v2
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
