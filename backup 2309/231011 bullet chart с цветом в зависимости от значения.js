let red = '#ff5252';
let yellow = '#ffd740';
let green = '#aed581';
let grey = '#9e9e9e';

w.yAxis.OnTick = false; 
w.yAxis.endOnTick = false;
w.yAxis.labels.enabled = false;
w.xAxis.labels.enabled = false;
w.plotOptions.series.borderColor = 'transparent';
w.tooltip.enabled = false;


// Объединяем столбцы
w.series[0].pointWidth = 40;
w.series[1].pointWidth = 22;
w.series[1].pointPlacement = 0.3;
w.series[1].zIndex = 100;

w.series[0].dataLabels = {
        enabled: false,
    }
    
w.series[1].data.forEach((el, ind) => {
    el.fact = el.y;
    el.plan = w.series[0].data[ind].y;
    el.pct = (el.fact / el.plan*100).toFixed();
    el.color = el.pct > 100 ? red : el.pct > 80 ? yellow : green;
});

w.series[1].dataLabels = {
        enabled: true,
        formatter: function(){
        return this.point.pct + '%';
        }
    }    


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

console.log("test w", w);
