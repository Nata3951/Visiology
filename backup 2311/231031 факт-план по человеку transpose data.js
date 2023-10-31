
// Дублируем полный объект w
let wDup = JSON.parse(JSON.stringify(w));

console.log('test w', w);

// создадим новые категории - сотрудники план и факт
let categories = w.series.map(el => el.name);
wDup.xAxis.categories = categories;

// создадим новые серии = коды проектов
wDup.series = w.series[0].data.map(el => ({'name' : el.name}));

// в каждую серию добавим категории
wDup.series.forEach((el, ind) => {
    el.data = [];
    for (let i=0; i < categories.length ; i++) {
        let item  = {
            name: categories[i],
            y: w.series[i].data[ind].y
        };
        el.data.push(item);
    }
});


console.log('test new series0', wDup.series);



Highcharts.chart({
    chart: w.general,
    xAxis: wDup.xAxis,
    yAxis: wDup.yAxis,
    plotOptions: w.plotOptions,
    series: wDup.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});
