### // расстояние до оси
w.general.marginLeft = 300; 

###  horizontal bar

// расположим подписи в центре бара
w.plotOptions.series.dataLabels.inside = true;


### // форматирование подписей stacked bar

```javascript
w.yAxis.stackLabels.formatter = function(){
    return Math.round(this.total).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}

w.yAxis.stackLabels.style.fontFamily = 'Open Sans';
w.yAxis.stackLabels.style.fontSize = '14px';
```

### подписи осей
```javascript
w.xAxis.labels.style = ({
    'color' : text1,
    'fontSize': '18px',
    'fontFamily' : 'Open Sans',
    'wordBreak' : 'break-all', 
    'textOverflow': 'allow'
});
```
