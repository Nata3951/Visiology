let blue = '#0C3A79',
    green = '#aed581',
    red = '#E65100',
    green_font = 'green',
    grey = '#F5F5F5';
    
// соберем список индустрий 
let industries = Array.from(
        new Set(
            w.xAxis.categories.map(el => el.split(' - ')[0]
        )
    )
).slice(1); // отбросим клиентов без индустрии




// подготовим общий контейнер для графиков
$(`#widget-${w.general.renderTo} .va-widget-body`).css({
    display: 'grid',
    'grid-template-columns': '1fr 1fr',
    'grid-template-rows': '1fr 1fr 1fr',
    // backgroundColor : 'olive',
    'font-family': 'Open Sans',
});



// создадим индивидуальные контейнеры для каждого графика

for (let i = 0; i < industries.length; i++) {
    
let box = $('<div>', {class: `box  box${i}`,})
.css({
    padding: 10,
    position: 'relative',
    // backgroundColor : 'navy',
    border: '5px solid #F5F5F5FF',
});

let head = $(`<div> ${industries[i]} </div>`, {class: ` head head${i}`,})
    .css({
        // backgroundColor : 'greenyellow',
        fontWeight: 'bold',
        paddingBottom: 5, 
    });

let chart_container = $(`<div id="contForChart${i}">`, {class: `chartContainer chartContainer${i}`,})
    .css({
        // backgroundColor : 'thistle',
    });
    
let summary = $(`<div id="summary${i}"></div>`, {class: `summary`,})
    .css({
        position: 'absolute',
        top:-1,
        right: 0,
        backgroundColor : '#cfd8dc33',
        paddingLeft: 5,
        textAlign: 'right',
    });

$(box)
.append(
    head, 
    chart_container,
    summary
    );


$(`#widget-${w.general.renderTo} .va-widget-body`)
.append(box); 

let chart_height = box.height() - head.height();

console.log('test height', box.height());

// отрисуем графики для каждой индустрии и рассчитаем суммы для вывода
draw_chart(industries[i], `contForChart${i}`, `summary${i}`, chart_height);

}



// функция для заливки красным / зеленым
function intersect(x1, x2, y1, y2, y3, y4) {
    return ((x2 * y1 - x1 * y2) - (x2 * y3 - x1 * y4)) / ((y4 - y3) - (y2 - y1));
}


// функция для отрисовки отдельных графиков
// industry = проходим по индустриям из массива;
// container = id контейнера для графика
// summary = id контейнера для суммы первого, последнего плана, разницы
// chart_height = высота контейнера с графиком

function draw_chart (industry, container, summary, chart_height) {

// дублируем объект w
const wDup = JSON.parse(JSON.stringify(w));



// отфильтруем одну отрасль
wDup.xAxis.categories = w.xAxis.categories
    .filter(el => el.includes(industry))
    .map(el => el.split(' - ')[1]); // уберем название индустрии из названий категорий

for (let i = 0; i < wDup.series.length; i++) {
    wDup.series[i].data = wDup.series[i].data.filter(el => el.name.includes(industry));
}


// найдем последний индекс, где факт или план больше ноля
let data_test = []

// посчитаем сумму всех серий для каждой строки набора данных
wDup.series[0].data.forEach((el, ind) => {
    let test = 0;
    for (let i = 0; i < wDup.series.length; i++) {
        if (wDup.series[i].data[ind].y) test += wDup.series[i].data[ind].y;
    }
    if (test) data_test.push(ind);
} )




// пропишем индексы серий 
let fact = wDup.series[2],
    planFirst = wDup.series[0],
    planLast = wDup.series[1];
    

let sumFirst = planFirst.data
    .map(el => el.y)
    .reduce((acc, val) => acc + val, 0);
    
let sumLast = planLast.data
    .map(el => el.y)
    .reduce((acc, val) => acc + val, 0);
    
let difference = sumLast - sumFirst;
let diff_color = difference > 0 ? green_font : red;

console.log('test wDup', wDup);

$(`#${summary}`).html(`
посл. план: ${sumLast.toFixed().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')}</br>
− первый план: ${sumFirst.toFixed().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')}</br>
= <span style="color: ${diff_color}; font-weight:bold"> ${difference.toFixed().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')}</span>
`);


// отформатируем серии 
fact.color = blue;
fact.type = 'area';
fact.fillOpacity = 1/4;
fact.legendIndex = 1,
planFirst.type = 'area';
planFirst.zIndex = -10;
planFirst.color = 'gainsboro';
planFirst.linkedTo = 'Первый план';
planLast.color = 'black';
planLast.lineWidth = 2;

// отсечем начало и конец оси x,до начала данных
wDup.xAxis.min = Math.min(...data_test);
wDup.xAxis.max = Math.max(...data_test);

// отформатируем горизонтальную ось
wDup.xAxis.labels.autoRotation = undefined;
wDup.xAxis.labels.step = 2;
wDup.xAxis.labels.formatter = function() {
    return this.value.substring(2,4);
};


// подготовим тултип
wDup.tooltip =  {
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
            });
            return str;
        }
    };

// пропишем id и размер контейнера для графика
wDup.general.renderTo = container;
wDup.general.height =chart_height;

let chart = Highcharts.chart({
    chart: wDup.general,
    xAxis: wDup.xAxis,
    yAxis: wDup.yAxis,
    plotOptions: wDup.plotOptions,
    series: wDup.series,
    drilldown: wDup.drilldown,
    legend: wDup.legend,
    tooltip:  wDup.tooltip,  
    
    
});

// отрисуем заливку красным / зеленым

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
        linkedTo: 'Посл. план',
        marker: {enabled: false},
        zIndex: -5,
        zoneAxis: 'x',
        zones: zone,
    }, false);

// продублируем факт, чтобы вывести жирную линию поверх раскраски

chart.addSeries({
        name: 'Первый план',
        data: planFirst.data,
        type: 'line',
        color: 'black',
        dashStyle: 'ShortDash',
        // linkedTo: planFirst,
        lineWidth : 2,
        marker: {enabled: false},
        opacity: 0.6,
        zIndex: 105,
    }, false);

chart.redraw();

}
