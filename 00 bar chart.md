### // форматирование подписей stacked bar

```javascript
w.yAxis.stackLabels.formatter = function(){
    return Math.round(this.total).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}

w.yAxis.stackLabels.style.fontFamily = 'Open Sans';
w.yAxis.stackLabels.style.fontSize = '14px';
```
