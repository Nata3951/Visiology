// поджать ось, чтобы бар занимал больше места на графике 
w.yAxis.OnTick = false;
w.yAxis.endOnTick = false;

// сделать легенду некативной
$('#' + w.general.renderTo).find('.highcharts-legend').css({ 
    'pointer-events': 'none',
   });
