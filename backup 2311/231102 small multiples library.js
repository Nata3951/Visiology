let series_colors = [
    '#f0f921',
    "#b5de2b",
    '#fb9f3a',
    "#35b779",
    '#d8576b',
    "#26828e",
    '#9c179e',
    '#46039f',
    "#3e4989",
    "#440154"
    ];
    
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
    let yAccum = 0;
    for (let i=0; i < categories.length ; i++) {
        // if(w.series[i].data[ind].y) yAccum += w.series[i].data[ind].y;
        let item  = {
            name: categories[i],
            y: w.series[i].data[ind].y,
            // y: yAccum
        };
        el.data.push(item);
    }
});

// присвоим цвета сериям
wDup.series.forEach((el, ind) => {
    let i = Math.round(ind%10);
    el.color = series_colors[ind];
});

console.log('test', wDup.series);

w.general.type='area';
w.plotOptions.area={'stacking':'normal'};
wDup.xAxis.reversed = true;

let mainDiv = $('#' + w.general.renderTo)
mainDiv.innerHTML = '';
console.log(mainDiv);

for (let i = 0; i < w.series.length; i++) {
    $('<div>', {
        id: 'qwrqwrwq' + i,
        style: 'height: 200px; background-color: blue'
    }).appendTo(mainDiv)
    
    //console.log(w);
    //w.general.renderTo = 'qwrqwrwq' + i;
    Highcharts.chart({
        chart: { ...w.general, renderTo: ('qwrqwrwq' + i)},
        xAxis: wDup.xAxis,
        yAxis: wDup.yAxis,
        plotOptions: w.plotOptions,
        series: [wDup.series[i]],
        drilldown: w.drilldown,
        legend: w.legend,
        tooltip: w.tooltip
    }); 
    
}
