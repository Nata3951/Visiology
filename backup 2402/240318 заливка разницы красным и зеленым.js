// https://jsfiddle.net/zhjyn2o4/1/


let blue = '#1c4680',
    orange = '#ffab40',
    purple = '#ba68c8',
    green = '#aed581',
    yellow = '#ffea00',
    red = '#E65100';
    
// пропишем индексы серий 
let fact = w.series[0],
    planFirst = w.series[1],
    planLast = w.series[2];
    

// отформатируем серии 
fact.color = blue;
planFirst.color = 'grey';
planFirst.dashStyle = 'ShortDot';
planLast.color = 'grey';

fact.data.forEach(el => el.y =  el.y ? el.y : null);


// уберем лишние нули из факта




w.xAxis.labels.autoRotation = undefined;
w.xAxis.labels.step = 2;

let chart = Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});

// отрисуем заливку


//create a function to find where lines intersect, to color them correctly
function intersect(x1, x2, y1, y2, y3, y4) {
    return ((x2 * y1 - x1 * y2) - (x2 * y3 - x1 * y4)) / ((y4 - y3) - (y2 - y1));
}

let range = []; //stores all the data for the graph like so [x, y1, y2]
let zone = []; //stores the different zones based on where the lines intersect
let isRed = true; //used for keeping track of what current color is

//loop through all values in income and outcome array. 
// Fill the ranges array and create color zones. 
//Zones color up to a given point, therefore we need to push a color at the end, before it intersects

for (let i = 1; i < planFirst.data.length; i++) {
    
    let first = planFirst.data[i].y;
    let last = planLast.data[i].y;
    
    range.push([i, first, last]);
    
    if (first > last && isRed) {
        zone.push({
            value: intersect(i - 1, i, planFirst.data[i-1].y, first, planLast.data[i-1].y, last),
            fillColor : green
        });
        isRed = false;
    } else if (first < last && !isRed) {
        zone.push({
            value: intersect(i - 1, i, planFirst.data[i-1].y, first, planLast.data[i-1].y, last),
            fillColor : red
        });
        isRed = true;
    
    }
}

//zones color up to a given point, therefore we need to push a color at the end as well:
if (isRed) {
    zone.push({
        value: planFirst.data.length,
        fillColor: green,
    })
} else {
    zone.push({
        value: planFirst.data.length,
        fillColor: red,
    })
}

console.log ('test ц', w)


chart.addSeries({
        name: 'area1',
        data: range,
        type: 'arearange',
        color: 'transparent',
        linkedTo: ':previous',
        marker: {enabled: false},
        zIndex: -5,
        zoneAxis: 'x',
        zones: zone,
    }, true);


// отступ в заголовке виджета
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    padding: '20px 15px'
});
