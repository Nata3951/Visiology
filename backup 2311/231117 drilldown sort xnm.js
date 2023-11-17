//= .va-widget-body
var h = $('#' + w.general.renderTo).height(); 

// console.log ('test h', h)
console.log ('test h4', w.series[0].data.length * 22.22 + 100)

// svg inside widget-body
w.general.height = w.series[0].data.length * 22.22 + 100; 

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

$('#' + w.general.renderTo).find('.highcharts-container').css({
'overflow-y': 'auto'
 }).height(h);


visApi().onDrillDownListener({widgetGuid: w.general.renderTo, guid: "j231119"}, function (info) {

 
    //собираем массив из наименования + значение
    var array = []; 
    info.widgetDataContainer.dataFrame.rows.forEach(function(el, ind, els){
        array[ind] = [el, info.widgetDataContainer.dataFrame.values[0][ind]];
    });

    // выполняем сортировку массива    
        array = array.sort(function(a,b){ 
            return a[1] > b[1] ? -1: 1;
        });
    

//разбираем массив на строки (текст) и значения    
    array.forEach(function(el, ind, els){ 
        info.widgetDataContainer.dataFrame.rows[ind] = el[0];
        info.widgetDataContainer.dataFrame.values[0][ind] = el[1];
    });
    
    let h2 = array.length * 22.22 + 100;
    
    w.general.height = h2;
    w.series[0].pointPadding = 5;
    
    
    $('#' + w.general.renderTo).find('.highcharts-container')
    .height(h2);
    
    $('#' + w.general.renderTo).find('.highcharts-background')
    .height(h2);
    
    $('#' + w.general.renderTo).find('.highcharts-plot-background')
    .height(h2);
    
    $('#' + w.general.renderTo)
    .css({
        'overflow-y': 'auto'
         });

    setTimeout(function() {}, 500);
    
    console.log('test inner w', w)

});

//guid должен быть уникальным (например дэшборд-лист-виджет-начало или конец кода) 
visApi().onDrillUpListener({widgetGuid: w.general.renderTo, guid: 'k231119'}, function (info) {

});

//КОНЕЦ СОРТИРОВКИ НА ВТОРОМ УРОВНЕ DRILLDOWN
