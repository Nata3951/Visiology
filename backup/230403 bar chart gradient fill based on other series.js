w.plotOptions.series.borderColor = 'transparent';
w.plotOptions.series.fillOpacity = 0.3;
w.yAxis.gridLineColor = '#999999';
w.xAxis.lineColor = '#999999';

let seriesIndexes = w.series.map((el, ind) => [el.id, ind]);
console.log("test seriesIndexes ", seriesIndexes);

let factIndex = seriesIndexes.filter(el => el[0].includes("акт"))[0][1];
let targetIndex = seriesIndexes.filter(el => el[0].includes("ель"))[0][1];

let gradientPurpleRed = {
    "linearGradient": {
        "x1": 0,
        "y1": 1,
        "x2": 0,
        "y2": 0
    },
    "stops": [
        [
            0,
            "rgba(143,88,255,1)"
        ],
        [
            1,
            "rgba(239,50,114,1)"
        ]
    ]
};

// раскрасим столбцы, в которых факт больше целевого значения, в градиент gradientPurpleRed

w.series[factIndex].data.forEach((el, ind) => {
    if (el.y > w.series[targetIndex].data[ind].y) {el.color = gradientPurpleRed}
});

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

