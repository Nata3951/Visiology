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

    setTimeout(function() {}, 10);

});

//guid должен быть уникальным (например дэшборд-лист-виджет-начало или конец кода) 
visApi().onDrillUpListener({widgetGuid: w.general.renderTo, guid: 'k231119'}, function (info) {

});

//КОНЕЦ СОРТИРОВКИ НА ВТОРОМ УРОВНЕ DRILLDOWN

