w.series[0].data =  w.series[0].data.sort(function(a,b){
    return a.y > b.y? -1: 1 ;
});
w.xAxis.categories = undefined;

w.plotOptions.series.dataLabels.formatter = function(){
    return (this.y).toFixed();
};
w.xAxis.crosshair = true;
w.yAxis.gridLineColor = '#e0e0e0';
w.plotOptions.series.borderRadius = 6;


// Выставляем высоту
var h = $('#' + w.general.renderTo).height();
// w.general.height = w.xAxis.categories.length * 60 + 60;   


const chart = Highcharts.chart({
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
            '<td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">{point.y:,.2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
});

// const svgContainer = document.createElement('div');
// svgContainer.classList.add(`svg-container-${w.general.renderTo}`);

//СОРТИРОВКА НА ВТОРОМ УРОВНЕ DRILLDOWN
//guid должен быть уникальным (например дэшборд-лист-виджет-начало или конец кода)
visApi().onDrillDownListener({widgetGuid: w.general.renderTo, guid: '1' + w.general.renderTo}, function (info) {
// console.log(info.widgetDataContainer.dataFrame)
    chart.series[0].data =  chart.series[0].data.sort(function(a,b){
        return a.y > b.y? -1: 1 ;
    });
  axes[0].names
    chart.xAxis.categories = undefined; 
    console.log(chart)
    setTimeout(function() {
        
    });
});
//guid должен быть уникальным (например дэшборд-лист-виджет-начало или конец кода) 
visApi().onDrillUpListener({widgetGuid: w.general.renderTo, guid: '2' + w.general.renderTo}, function (info) {

});
//КОНЕЦ СОРТИРОВКИ НА ВТОРОМ УРОВНЕ DRILLDOWN


// включим прокрутку
$(`#widget-${w.general.renderTo} .highcharts-container`).css({
    // 'background-color': 'gold',
    'overflow-y' : 'auto'
});


$(`#widget-header-${w.general.renderTo} > a`)[0]
    .innerHTML = '<span style="display:inline-block;width:87%;">Число заявок на сотрудника</span><span style="font-weight:normal;color: #757575;">шт</span>';
    
$('#widget-header-' + w.general.renderTo + ' > a').css({
    'padding-top': '10px',
    'padding-bottom': '10px',
    'padding-left': '10px'
});
