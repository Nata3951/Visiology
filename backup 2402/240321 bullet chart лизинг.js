let blue = '#1c4680',
    orange = '#ffab40',
    lightPurple = '#f3e5f5',
    purple = '#8d24aa',
    green = '#aed581',
    yellow = '#ffea00',
    red = '#E65100',
    grey = '#d1dae5'

    

// форматируем оси
w.yAxis.OnTick = false; 
w.yAxis.endOnTick = false;
w.yAxis.opposite = true; 

// распределяем серии по высоте
var h = $('#' + w.general.renderTo).height(); 
w.general.height = w.series[0].data.length * 60 + 100; 

// Выставляем подписи сверху
w.xAxis.labels.align = 'left';
w.xAxis.labels.x = 0;
w.xAxis.labels.y = -14;
w.xAxis.labels.style.whiteSpace = 'nowrap';


// форматируем серии 

let init = w.series[0];
let last = w.series[1];
let diff = w.series[2];

init.color = '#eceff1';
init.borderColor = 'lightgrey';
last.color = '#607d8b';
diff.color = orange;



// форматируем расположение баров
// w.plotOptions.series.pointPlacement = -0.2;
// w.plotOptions.series.groupPadding = 0.1;
// init.pointPadding = 0;
// init.pointPlacement = -0.3;
// last.pointPadding = 0.25;

init.pointWidth = 59;
last.pointWidth = 20;
diff.pointWidth = 15;

init.pointPadding = 0;
last.pointPadding = 0;
diff.pointPadding = 0;

init.pointPlacement = -0.2;
diff.pointPlacement = -0.1;


Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip,
    zoomType: 'y',
});

// заголовок виджета: отступы и высота
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'padding-left': '15px',
});

// scroll
$(`#widget-${w.general.renderTo} .va-widget-body`).css({
'overflow-y': 'auto'
 });
