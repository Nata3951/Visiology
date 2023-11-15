w.yAxis.gridLineColor = '#e0e0e0';
w.plotOptions.series.borderRadius = 6;
w.xAxis.crosshair = true;

w.series[0].data.forEach(series => {
    series.name = (series.name.split(' - ')[1]).slice(0,3).toLowerCase() + ' ' + series.name.split(' - ')[0].slice(2,5);
});

// Прозрачность начала градиента
const opacityGradStart = 0.3;
// Прозрачность конца градиента
const opacityGradEnd = 0;


// Выставляем градиент под графиками - начало кода
w.series.forEach((s, index) => {  
    setGradient(index, s.color);
});

w.series[0].type = 'areaspline';

function setGradient(serieNum, serieColor) {
    w.series[serieNum].type = 'area',
    w.series[serieNum].fillColor = {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, Highcharts.color(serieColor).setOpacity(opacityGradStart).get('rgba')],
          [1, Highcharts.color(w.colors[serieNum + w.series.length]).setOpacity(opacityGradEnd).get('rgba')]  
        ] 
    };
}
// Выставляем градиент под графиками - конец кода

Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: {
        borderWidth: 1,
        borderRadius: 8,
        headerFormat: '<span style="font-size:12px;color:#757575;font-family:Open Sans">{point.key}</span><table>',
        pointFormat: '<tr><td style="font-size:12px;font-family:Open Sans;color:{series.color};padding:10">{series.name}: </td>' +
        '<td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">{point.y:,.0f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
});

$(`#widget-header-${w.general.renderTo} > a`)[0]
    .innerHTML = '<span style="display:inline-block;width:93%;"> Динамика заявок </span><span style="font-weight:normal;color: #757575;">шт</span>';
    
$('#widget-header-' + w.general.renderTo + ' > a').css({
    'padding-top': '10px',
    'padding-bottom': '10px',
    'padding-left': '10px'
});
