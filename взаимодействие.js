// vis 1
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

// console.log('test => ', w);

document.querySelectorAll("g.highcharts-axis-labels.highcharts-xaxis-labels > text").forEach(el => {
    el.attributes[2].value = "start";
    el.attributes[0].value = "5";
});

// vis 2
window.render = function(transformedData){ 
    visApi().getWidgetDataByGuid("95815cc448844dd7986351b1d4a9bcdf").then(function (data) { 
        let arr = [0];
        
        data.data.rows.forEach((el, ind) => {
            arr[ind] = transformedData[transformedData.findIndex(elem => elem.name[0] === el[0])]
        })
        
        transformedData.forEach(el => el.y < 0 ? el.color = '#ff595a': el.color = '#56ad83')
        
        w.series[0].data = arr;
        w.xAxis.labels.enabled = false;
    
    
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
    })
}
