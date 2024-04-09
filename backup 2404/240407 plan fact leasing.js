let blue = '#1F6B9A', // '#1c4680',
    orange = '#ffab40',
    darkOrange = '#FF6D00',
    green = '#aed581',
    yellow = '#ffea00',
    grey = '#ffab4066',
    darkGrey = '#424242',
    purple = '#ba68c8',
    red = '#ff8a80',
    text_light = 'grey';
    

let wDup = JSON.parse(JSON.stringify(w));
let planFirst = wDup.series[1];
let planLast = wDup.series.at(-1);

// уберем метки первого и последнего графика из названий промежуточных графиков

wDup.series.forEach(el => {
    let nameLength = el.name.split(' - ').length - 2;
    if (nameLength > 1) el.name = el.name.split(' - ').slice(1, nameLength).join(' - ');
});

// посчитаем, сколько пришло первых планов
let countFirst = w.series
    .map(el => +el.name.split(' - ').at(-2) || 0)
    .reduce((val,acc) => val + acc, 0);


// если первый план ровно один, используем исходный набор данных
// если пришло больше одного первого плана, 
// оставим только факт и соберем сумму первых и последних планов

// создадим функцию для суммирования данных для первых и последних серий
// newName = имя для новой серии, index = место, в котором находится 
// признак новой / старой серии  в названии серии

function summarize(newName, index) {

    let newSeries = JSON.parse(JSON.stringify(w.series
        .find(el => el.name.split(' - ').at(index) == 1)));

    newSeries.name = newName;
    newSeries.data.forEach(el => el.y = 0);

    let dataPrep = w.series
        .filter(el => el.name.split(' - ').at(index) == 1)
        .map(el => el.data);

    for (let i = 1; i < dataPrep.length; i++) {
        dataPrep[i] = dataPrep[i].map(el => el.y || 0);
        dataPrep[i].forEach((item, ind) => newSeries.data[ind].y += item);
    }

    wDup.series.push(newSeries);
}


if (countFirst > 1) {
wDup.series = w.series.slice(0, 1);

summarize("Первые графики", -2);
planFirst = wDup.series[1];

summarize("Последние графики", -1);
planLast = wDup.series[2];
}


// отформатируем серии
let fact = wDup.series[0];
fact.color = blue;
fact.type = 'area';
fact.lineWidth = 3;
fact.fillOpacity = 1/16;
fact.zIndex = 60;


planFirst.color = darkGrey;
planFirst.dashStyle = 'LongDash';
planFirst.zIndex = 34;

planLast.color = darkGrey;
planLast.dashStyle = 'Solid';
planLast.zIndex = 35;

// console.log('test planFirst', planFirst)
// console.log('test x', wDup)
    

// отформатируем тултип
wDup.tooltip = {
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
            let v = el.point.event ? el.point.event : el.y.toFixed(1);
            let value =  `<td style = "${value_style}">${v}</td></tr>`;
            str += item + value;
            }
        })
        return str;
    }
};


let chart = Highcharts.chart({
    chart: w.general,
    xAxis: wDup.xAxis,
    yAxis: wDup.yAxis,
    plotOptions: wDup.plotOptions,
    series: wDup.series,
    drilldown: wDup.drilldown,
    legend: wDup.legend,
    tooltip: wDup.tooltip
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



// добавим серию раскраски
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


// подготовим массив событий 
let events = [];
function Event(year, event, y = 0) {
    this.y = y;
    this.name = year;
    this.event = event;
}

w.series.slice(1).forEach(el => {
    let df = el.id.split('","');
    console.log('test df', df);
    let obj = new Event (df[2].slice(0,4), df[4]);
    if (obj.event) events.push(obj);
    
}
);

// уберем дубликаты событий
events = events.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.event === value.event && t.name === value.name
  ))
);

// добавим серию событий
chart.addSeries({
        name: 'События',
        data: events,
        lineWidth : 0,
        type: 'line',
        color: blue, // '#4db6ac',
        marker: {
            enabled: true,
            radius : 10,
            symbol: 'triangle-down',
            
        },
        // zIndex: -5,
    }, false);


chart.redraw();

console.log ('test w5', w);
console.log ('test events', events);




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


