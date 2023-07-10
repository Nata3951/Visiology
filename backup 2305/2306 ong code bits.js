// поджать ось, чтобы бар занимал больше места на графике 
w.yAxis.OnTick = false;
w.yAxis.endOnTick = false;

// сделать легенду неактивной
$('#' + w.general.renderTo).find('.highcharts-legend').css({ 
    'pointer-events': 'none',
   });

// цвет шрифта первичной и вторичной оси Y
w.yAxis[0].labels.style.color = '#1c4680';
w.yAxis[1].labels.style.color = '#4db6ac';
