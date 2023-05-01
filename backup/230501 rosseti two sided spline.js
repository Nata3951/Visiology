//отступ слева в заголовке виджета
    $(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'padding-left': '10px'  
}); 

// удалим лишние слова из легенды
w.series.forEach(function(serie){
    let parts = serie.name.split('- '); 
    serie.name = parts.at(-1);
});

console.log('test => ', w);

// сделаем значения в серии 0 отрицательными
w.series[0].data.forEach(function(item){
    item.y = item.y * -1;
});

// сделаем подписи серии [0] положительными
w.plotOptions.series.dataLabels.formatter = function(){
    if (this.y < 0) return this.y * -1;
    else return this.y;
};

console.log("test => ", w);

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
