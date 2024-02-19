## заголовок виджета

### отступ 
```javascript
// отступ в заголовке виджета
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'padding-left': '15px',
    'padding-top': '20px',
});
```
### выровнять текст по вертикали
```javascript
// выровнять текст заголовка по вертикали
$(`#widget-${w.general.renderTo} .va-widget-header-container`).css({
    'display': 'flex',
   'align-items' : 'flex-end',
});
```


### два блока, выровненных вправо и влево
```javascript

// текст в заголовке виджета
$(`#widget-${w.general.renderTo} .va-widget-header`)
    .html(`<span>Готовность маршрута, тонн</span> <span style='font-size:80%; color:coral'>Отправление маршрута: 05.10.2023</span>`)
    .css({
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items':'end',
    });
```

### Поменять текст
```javascript

// добавим единицы измерения
$(`#widget-${w.general.renderTo} .va-widget-header:not(:contains('руб'))`).append(
`<span style="color:${text_light}; font-weight: normal"> млн руб./% </span>`
);



$(`#widget-header-${w.general.renderTo} > a`)[0]
.innerHTML = '<span style="display:inline-block;width:90%"> Динамика ПДЗ </span> <span style="font-weight:normal"> млн руб.</span>';

\\----------------------------------------------
    $('#widget-header-' + w.general.renderTo + ' > a')[0].innerHTML = 'Попали в ТОП-113 <span style="color:#4CAF50; font-size:120%; vertical-align:bottom;">' + var + '</span>';

```


## поля виджета

```javascript
w.general.marginLeft = 50
w.general.marginRight = 10
w.general.marginTop = 60
```


```javascript
 $(`#widget-${w.general.renderTo}  > div.va-widget-body-container`).css({
      'padding-left': '25px'
 });
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
