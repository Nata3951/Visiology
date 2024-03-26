let blue = '#1c4680',
    orange = '#ffab40',
    purple = '#ba68c8',
    green = '#aed581',
    yellow = '#ffea00',
    red = '#E65100',
    text_light = 'grey';
    
// пропишем индексы серий 
let fact = w.series[0],
    planFirst = w.series[1],
    planLast = w.series[2];
    

// отформатируем серии 
fact.color = blue;
fact.type = 'area';
fact.fillOpacity = 1/4;
planFirst.type = 'area';
planFirst.zIndex = -10;
planFirst.color = 'gainsboro';
planLast.color = 'grey';
planLast.lineWidth = 1;

// уберем из факта записи с нулевыми значениями
fact.data.forEach(el => el.y =  el.y ? el.y : null);

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
    tooltip:     {
        shared: true,
        useHTML: true,
        formatter: function () {
            // console.log ('test this', this);
            let name = this.points[0].key;
            let name_style = "font-size:12px;color:#757575;font-family:Open Sans; font-weight:bold";
            let item_style = 'font-size:12px;font-family:Open Sans;padding:10';
            let value_style = 'padding:0; text-align:right;font-weight:bold; font-size:12px;color:#212121;font-family:Open Sans';
            let str = `<span style="${name_style}">${name}:</span><table>`;
            this.points.forEach((el, ind) => {
                if (!el.series.name.includes('area')) {
                let item = `<tr><td style="${item_style}">${el.series.name}: </td>`;
                let v = el.y.toFixed().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
                let value =  `<td style = "${value_style}">${v}</td></tr>`;
                str += item + value;
                }
            })
            return str;
        }
    }
    
    
});

// отрисуем заливку красным / зеленым


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

for (let i = 0; i < planFirst.data.length; i++) {
    
    let first = planFirst.data[i].y;
    let last = planLast.data[i].y;
    let before_first, before_last;
    
    
    if (i === 0) {
        before_first = 0;
        before_last = 0;
    } 
    else {
        before_first = planFirst.data[i-1].y;
        before_last = planLast.data[i-1].y;
        
    }
    
    range.push([i, first, last]);
    
    if (first > last && isRed) {
        zone.push({
            value: intersect(i - 1, i, before_first, first, before_last, last),
            fillColor : green
        });
        isRed = false;
    } else if (first < last && !isRed) {
        zone.push({
            value: intersect(i - 1, i, before_first, first, before_last, last),
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
    });
} else {
    zone.push({
        value: planFirst.data.length,
        fillColor: red,
    });
}


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
    }, false);

// w.tooltip = 

chart.redraw();

// отступ в заголовке виджета
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    padding: '20px 15px'
});

// добавим единицы измерения
$(`#widget-${w.general.renderTo} .va-widget-header:not(:contains('руб'))`)
.css({
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items':'end',
    })
.append(
`<span style="color:${text_light}; font-weight: normal"> млн руб.</span>`
);
