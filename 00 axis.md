### // поджать ось, чтобы бар занимал больше места на графике 
```javascript
w.yAxis.OnTick = false;
w.yAxis.endOnTick = false;
```

### // запретим поворот подписей оси X
w.xAxis.labels.autoRotation = undefined;

### цвет и настройки шрифта первичной и вторичной оси Y
```javascript
w.yAxis[0].labels.style.color = '#1c4680';
w.yAxis[1].labels.style.color = '#4db6ac';
w.yAxis[1].labels.style.fontFamily = "Open Sans";
w.yAxis[1].labels.style.fontSize = "12px";
```
### задать tick positions
```javascript
w.yAxis.tickPositions = [0, 1.4, 2.4, 3.4, 4.4];
```

### // форматирование подписей оси
```javascript
w.xAxis.labels.formatter = function() {
    return this.value.substring(0,4);
};

w.xAxis.labels.formatter = function() {
    return this.value.replace('-', '</br>');
};

w.xAxis.labels.formatter = function() {
    return this.value.substring(0,4) + '</br>' + this.value.split('-')[1];
};
```

### дополнительная ось для серии

```javascript
w.series[id].yAxis = 1; // до кода виджета
```

w.yAxis.labels.formatter = function() {
    let label = this.value;
    if (label == 4.4) return 'D';
    else if (label == 3.4) return 'C';
    else if (label == 2.4) return 'B';
    else if (label == 1.4) return 'A';
    return '';
};
```
