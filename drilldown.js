w.series[2].showInLegend = false;
w.series[2].visible = false;
w.series[3].showInLegend = false;
w.series[3].visible = false;
w.series[0].dataSorting = {enabled: true};
w.xAxis.categories = undefined;
var chart = Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});
visApi().onDrillDownListener({widgetGuid: w.general.renderTo, guid: w.general.renderTo+"drillDown"}, function (info) {
    console.log(chart);
    chart.series[0].update({
        showInLegend: false,
        visible: false
    });
    chart.series[1].update({
        showInLegend: false,
        visible: false
    });
});

