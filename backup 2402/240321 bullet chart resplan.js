let background =  'white';
let line = '#33465b';
let fontSizeMain = '22px';
let fontSizeSupport = '16px';
let fontFamily = 'Open Sans';
let text1 = 'black';
let text2 = 'gray';


// график 
let series_colors = [
    "#FFB74D", // orange
    'navy', // purple2
    '#9c27b0', // purple 
    "#2196f3", // azure
    '#00bcd4', // бирюза
    '#3d90a8', // бирюза 2
    '#cddc39' // lime
    ];
    
// bar chart
w.yAxis.OnTick = false; 
w.yAxis.endOnTick = false;
w.series.forEach((el, ind) => {
    el.borderWidth = 0;
    el.color = series_colors[ind];
    });
    
let axLabelStyle = ({
    'color' : text2,
    'fontSize': fontSizeSupport,
    'fontFamily' : fontFamily,
    'wordBreak' : 'break-all', 
    'textOverflow': 'allow'
});

w.xAxis.labels.style = axLabelStyle;
w.yAxis.labels.style = axLabelStyle;
    
w.plotOptions.series.dataLabels.style = ({
    'color' : text1,
    'fontSize': fontSizeSupport,
    'fontFamily' : fontFamily,
    'fontWeight' : 'normal',
});



w.legend.itemStyle = ({
    'color' : text2,
    'fontSize': fontSizeSupport,
    'fontFamily' : fontFamily,
    'fontWeight' : 'normal',
}); 

// ГРАФИК 
w.yAxis.gridLineColor = line;//линии, направляющие
w.yAxis.gridLineWidth = 0;
w.xAxis.lineColor = line;
// w.plotOptions.bar = { borderWidth: 0 };


var h = $('#' + w.general.renderTo).height(); 
w.general.height = w.series[0].data.length * 72 + 100; 

// Выставляем подписи сверху
w.xAxis.labels.align = 'left';
w.xAxis.labels.x = 0;
w.xAxis.labels.y = -12;
w.xAxis.labels.style.whiteSpace = 'nowrap';
// w.plotOptions.series.pointPlacement = -0.2;
w.plotOptions.series.groupPadding = 0.2;

w.series[0].pointPadding = 0;
w.series[0].pointPlacement = -0.3;

w.series[1].pointPadding = 0.25;


Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});

//  фон виджета
 $(`#widget-${w.general.renderTo}`).css({
    'background-color': 'white',
    'border-radius' : '8px',
    'padding-right' : '10px',
    'padding-bottom': '0px',
     });

 
// заголовок виджета: отступы и высота
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'padding-left': '15px',
    'height' : '20px',
    'text-align' : 'left',
});


// заголовок виджета: шрифт и текст
$(`#widget-${w.general.renderTo} .va-widget-header`)
    .css({
        'text-align' : 'left',
        'fontSize': fontSizeMain,
        'fontFamily' : fontFamily,
        'position': 'absolute',
        'top' : '5px',
        'color' : text1
    });

// scroll
$(`#widget-${w.general.renderTo} .va-widget-body`).css({
'overflow-y': 'auto'
 });
