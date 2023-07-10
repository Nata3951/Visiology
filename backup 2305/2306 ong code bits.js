// поджать ось, чтобы бар занимал больше места на графике 
w.yAxis.OnTick = false;
w.yAxis.endOnTick = false;

// сделать легенду неактивной
$('#' + w.general.renderTo).find('.highcharts-legend').css({ 
    'pointer-events': 'none',
   });

// запретим поворот подписей оси X
w.xAxis.labels.autoRotation = undefined;

// цвет и настройки шрифта первичной и вторичной оси Y
w.yAxis[0].labels.style.color = '#1c4680';
w.yAxis[1].labels.style.color = '#4db6ac';
w.yAxis[1].labels.style.fontFamily = "Open Sans";
w.yAxis[1].labels.style.fontSize = "12px";


// рассчитаем разницу между второй и первой серией
w.series[0].data.forEach((el, ind) => el.y = w.series[1].data[ind].y - w.series[0].data[ind].y);
// удалим ненужную серию
w.series.pop();

// зададим цвет отрицательных значений
w.series[0].negativeColor = '#ff1744';
