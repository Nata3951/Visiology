w.legend.x = -120
w.general.marginTop = 60;


// переименуем серии
w.series.forEach(s => s.name = s.name.split('- ')[1] ? s.name.split('- ')[1] : "Прогноз ПДЗ");

// присвоим цвета сериям

let red = '#ff8a80';
let orange = '#ffab40';
let yellow = '#ffea00'; 
let green = '#aed581';
let blue = '#1c4680';

w.series.forEach(s => {
    if (s.name.includes('<15')) {s.color = green}
    else if (s.name.includes('15-90')) {s.color = yellow}
    else if (s.name.includes('>90')) {s.color = red}
})


w.yAxis.stackLabels.formatter = function(){
    return Math.round(this.total).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
};
w.yAxis.stackLabels.style.fontFamily = 'Open Sans'
w.yAxis.stackLabels.style.fontSize = '14px'

w.xAxis.labels.formatter = function() {
    if (this.value == "Итого") return 'Прогноз ПДЗ';
    let label = this.value.split(' - ');
    return label[1] + 'Q '+ label[0];
};

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



$(`#widget-header-${w.general.renderTo} > a`)[0]
.innerHTML = '<span style="display:inline-block;width:90%"> Динамика ПДЗ </span> <span style="font-weight:normal; color: #757575"> млн руб.</span>';


$('#widget-header-' + w.general.renderTo + ' > a').css({
    'padding-top': '10px',
    'padding-bottom': '10px',
    'padding-left': '10px'
 });
 
console.log('test ', w)
