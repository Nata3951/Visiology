// сделать легенду неактивной
$('#' + w.general.renderTo).find('.highcharts-legend').css({ 
    'pointer-events': 'none',
   });

// рассчитаем разницу между второй и первой серией
w.series[0].data.forEach((el, ind) => el.y = w.series[1].data[ind].y - w.series[0].data[ind].y);
// удалим ненужную серию
w.series.pop();

// зададим цвет отрицательных значений
w.series[0].negativeColor = '#ff1744';

// text box padding + border
$("#"+w.general.renderTo).css({
   padding: '10px 10px',
   borderLeft: '1px solid #cccccc'
});

// форматирование подписей оси
w.xAxis.labels.formatter = function() {
    return this.value.substring(0,4);
};

w.xAxis.labels.formatter = function() {
    return this.value.replace('-', '</br>');
};

w.xAxis.labels.formatter = function() {
    return this.value.substring(0,4) + '</br>' + this.value.split('-')[1];
};

// положение подписи точки
w.plotOptions.series.dataLabels.y = 100;

// using formatter
w.plotOptions.series.dataLabels.formatter = function() {
    return this.y + '%';
};

w.plotOptions.series.dataLabels.formatter = function() {
    console.log('test this', this);
    return this.y + '%';
};

// подписи столбцов переместим в основание столбцов
// подписи столбцов переместим в основание столбцов
w.series[1].data.forEach( el => el.dataLabels = {
    y: 100,
    // inside: true,
    style : {textOutline: false},
});

