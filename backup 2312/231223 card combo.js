let blue_dark = '#1c4680';
let blue = '#8da2bf';
let red = '#ff8a80';
let white = '#f5f5f5';

let total_arr = w.data.values[0];
let filtered_arr = w.data.values[1];

let total = total_arr.reduce((acc, val) => acc + val, 0 );
let filtered = filtered_arr.reduce((acc, val) => acc + val, 0 ) ?? 0;
let share = filtered / total * 100;

console.log ('test w', w)

let mainDiv = document.getElementById(w.general.renderTo);

// зададим стили для классов
mainDiv.innerHTML = `
    <style>
    
    .title1 {
    // background-color: lavender ;
    height : 22%;
    width: 80%;
    padding-left: 10px;
    padding-top: 10px;
    }
    
    .hbar1 {
    // background-color: lavender ;
    height : 28%;
    width: 80%;
    }
    
    .cont2 {
        // background-color: peachpuff ;
        height : 50%;
        display: flex;
    }
    
    .card1 {
    background-color: gold;
    height: 100%;
    width : 60%;
    }
    
    .line1 {
    height: 100%;
    width : 40%;
    }
    
    
    </style>
`;

// создадим контейнеры для графиков

     $('<div>', {
        class: 'title1',
        id: 'title123'
    })
    .appendTo(mainDiv);
 
    $('<div>', {
        class: 'hbar1',
        id: 'hbar123'
    })
    .appendTo(mainDiv);

    $('<div>', {
        class: 'cont2',
    })
    .appendTo(mainDiv);
    
    $('<div>', {
        class: 'card1',
    })
    .appendTo($(`.cont2`));
    
    $('<div>', {
        class: 'line1',
        id: 'line123',
    })
    .appendTo($(`.cont2`));
    
// создадим надпись
  $('.title1').html(`<span style="font-weight:bold;"> ${share.toFixed()}% </span> доля в общем прогнозе`);
    
// отрисуем bar chart
Highcharts.chart({
    chart: {
        type: 'bar',
        renderTo: hbar123,
        margin: [0, 0, 15,10],
    },

    xAxis: {
        visible: false,
        lineWidth : 0,
        onTick: false,
        endOnTick:false,
        maxPadding : 0,

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
                  return this.y.toFixed();
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
        color : red,
    }]
});

// отрисуем линейный график

Highcharts.chart({
    chart: {
        type: 'area',
        renderTo: line123,
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
    }]
});


    $(`#${w.general.renderTo}`).css({
        'font-size' : '13px',
        'font-family': 'Open Sans',
        'background': 'linear-gradient(0.25turn, #ff8a8066, #8da2bf33, #8da2bf66)',
    });
