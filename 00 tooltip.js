// https://www.highcharts.com/docs/chart-concepts/templating

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

// series

    plotOptions: {
        column: {
            pointPadding: 0.2,
            tooltip:{
            pointFormat: 'Value: {point.y:.2f} mm' // округление до 2 знаков
            },


         pointFormat: "{series.name} : {point.y:,.2f}"
