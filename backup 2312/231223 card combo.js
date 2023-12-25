let blue_dark = '#1c4680';
let blue = '#8da2bf';
let color_main = '#ff8a80'; // red
let white = '#f5f5f5';
let font_grey = '#757575';

let rating = 'D';
let pl = '15px' // padding left

let total_arr = w.data.values[0];
let filtered_arr = w.data.values[1];

let total = total_arr.reduce((acc, val) => acc + val, 0 );
let filtered = filtered_arr.reduce((acc, val) => acc + val, 0 ) ?? 0;
let share = filtered / total * 100;

// найдем индекс первого прогноза
let forecast_start = w.data.rows.findIndex(el => el[2] == 'прогноз');

// посчитаем ближайший прогноз по выбранному рейтингу
let pdz_forecast = filtered_arr[forecast_start];

let pdz_pct;
let pct;

if (filtered_arr[forecast_start-1]  && pdz_forecast) { 
    pct = (pdz_forecast / filtered_arr[forecast_start-1] - 1)*100;
    let sign =  pct > 0 ? '+' : '';
    pdz_pct = sign+pct.toFixed(0)+'%';
}
else pdz_pct = 'н/д';

let pct_color = pct < 0 ?'green' : 'tomato';



console.log ('test w', w)
console.log ('test f', pdz_pct)



function numberWithSpaces(value, points=0, div='') { 
    if(!value) return "";
    let parts = value.toString().split(".");
    let head = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let tail = parts[1] ? (parts[1]+"0000000").slice(0,points) : "0".repeat(points);
    return head+div+tail;
}


let mainDiv = document.getElementById(w.general.renderTo);

// создадим контейнеры для графиков

// верхний блок
    $('<div>', {
        id: `cont1-${w.general.renderTo}`
    })
    .css ({
        'height' : '50%',
        // 'background-color' : 'gold',
        'display' : 'flex',
        'padding-left' : `${pl}`,
    })
    .appendTo(mainDiv);

// container for title and bar

    $('<div>', {
    id: `cont1_1-${w.general.renderTo}`
    })
    .css ({
        height : '100%',
        width : '80%',
        // 'background-color' : 'goldenrod',
    })
    .appendTo($(`#cont1-${w.general.renderTo}`));


// title
     $('<div>', {
        class: 'title',
        id: `title-${w.general.renderTo}`
    })
    .css ({
    // backgroundColor: 'lavender',
    height : `45%`,
    width: '100%',
    'padding-top': '10px',
    })
    .html(`
      <span style="font-weight:bold;"> ${share.toFixed()}% </span> 
      <span style="color:${font_grey}"> доля в общем прогнозе </span>
      `)
    .appendTo($(`#cont1_1-${w.general.renderTo}`));

// bar 
    $('<div>', {
        class: 'hbar',
        id: `hbar-${w.general.renderTo}`
    })
    .css ({
    // backgroundColor: 'lavender',
    height : `55%`,
    width: '100%',
    })
    .appendTo($(`#cont1_1-${w.general.renderTo}`));
    
// container for rating

$('<div>', {
id: `cont1_2-${w.general.renderTo}`
})
.css ({
    height : '50%',
    width : '14%',
    backgroundColor : white,
    margin : '7% 3% 4% 6%',
    borderRadius : 5,
    textAlign : 'center',
    fontSize : 28,
    fontWeight : '600',
    color : color_main,
})
.text(rating)
.appendTo($(`#cont1-${w.general.renderTo}`));

// нижний блок
    $('<div>', {
        id: `cont2-${w.general.renderTo}`
    })
    .css ({
    'height' : '50%',
    // 'background-color' : 'gold',
    'display' : 'flex',
    'padding-left' : `${pl}`,
    })
    .appendTo(mainDiv);

// карточка
    $('<div>', {
        id: `card-${w.general.renderTo}`
    })
    .css ({
        // backgroundColor: 'plum',
        height : '100%',
        width: '47%',
        'padding-top' : 10,
    })
    .html(`
        <span style="font-size:200%; font-weight:bold"> ${numberWithSpaces(pdz_forecast,2, ',')} </span>
        <span style="color:${pct_color}; font-weight:bold">${pdz_pct}</span></br>
        <span style="color:${font_grey}">Прогноз ПДЗ, млн руб.</span
        `)
    .appendTo($(`#cont2-${w.general.renderTo}`));


// container for line chart 
    $('<div>', {
         id: `line-${w.general.renderTo}`,
    })
    .css ({
        // backgroundColor: 'lime',
        height : `100%`,
        width: '53%',
    })
    .appendTo($(`#cont2-${w.general.renderTo}`));
    
// отрисуем bar chart
Highcharts.chart({
    chart: {
        type: 'bar',
        renderTo: `hbar-${w.general.renderTo}`,
        margin: [0, 0, 15,0],
    },

    xAxis: {
        visible: false,
        maxPadding : 0,
        minPadding : 0,
        onTick: false,
        endOnTick:false,

    },
    yAxis: {
        visible : false, 
        maxPadding : 0,
        minPadding : 0,
        onTick: false,
        endOnTick:false,
        max : total,
    },
    legend: {enabled : false},
    plotOptions: {
        bar: {
            borderRadius: '5%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0,
            grouping: false,
        },
        series: {
            dataLabels : {
                align : 'right',
                x : -10,
                formatter : function () {
                  return numberWithSpaces(this.y);
                },
                
            }
        }
    },
 
    series: [{
        name: 'PDZ total',
        data: [total],
        pointPadding : 0,
        color : white,
    }, {
        name: 'PDZ filtered',
        data: [filtered],
        pointPadding : 0,
        color : color_main,
    }]
});

// отрисуем линейный график

Highcharts.chart({
    chart: {
        type: 'area',
        renderTo: `line-${w.general.renderTo}`,
        margin: [0, 10, 10, 10],
    },

    xAxis: {
        visible: false,
        categories: w.data.rows,
        onTick: false,
        endOnTick:false,
 
    },
    yAxis: {
        visible : false, 
        maxPadding : 0,
        onTick: false,
        endOnTick:false,
    },
    legend: {enabled : false},
    series: [{
        data: filtered_arr,
        color : blue,
        fillOpacity : 0.2,
        marker : {
            enabled : false,
        },
    }]
});


    $(`#${w.general.renderTo}`).css({
        'font-size' : '13px',
        'font-family': 'Open Sans',
        'background': `linear-gradient(0.25turn, ${color_main + '33'}, #8da2bf33, #8da2bf66)`,
    });
