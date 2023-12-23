let blue_dark = '#1c4680';
let red = '#ff8a80';
let red_trans = '#ff8a8020';
let pdz_index = 0;
let overdue_pct_index = 5;
let overdue_pct_max_index = 6;
let overdue_pct_min_index = 7;

// найдем первое заполненное значение в серии forecast
let forecast_start = w.data.values[overdue_pct_min_index].findIndex(el => el);

let forecast = [];

w.data.rows.forEach((el, ind) => {
    forecast.push ([el, w.data.values[overdue_pct_min_index][ind], w.data.values[overdue_pct_max_index][ind]]);
} );


console.log('test w', w)
console.log('test f', w.data.values[overdue_pct_min_index].findIndex(el => el));

Highcharts.chart({
    chart: {
        type: "arearange",
        renderTo: w.general.renderTo
    },
    xAxis: {
        type: 'category',
        endOnTick: false,
        plotBands: [{
            color: 'white',
            from: forecast_start,
            label: {
                text: 'Forecast'
            }
        }],
        categories: w.data.rows,
        plotLines: [{
            dashStyle: 'dash',
            color: 'slategrey',
            width: 2,
            value: forecast_start,
            zIndex : 20,
        }],
        crosshair: true
    },
    yAxis: [
    // primary axis
        {
        min: 0,
        title: {
            text: null
        }
    },
    // secondary axis
    {
        min: 0,
        opposite: true,
        visible: false,
        title: {
            text: null
        }
    }],
    legend: {
        enabled: true,
        verticalAlign: 'top',
        margin : 15,
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
        
        arearange: {
        enableMouseTracking: false,
        states: {
            inactive: {
                enabled: false
            }
        },
        color: red_trans,
        fillOpacity: 1 / 3,
        lineWidth: 0
    },

    },
   series: [{
        name: 'ПДЗ накопленная, млн руб.',
        type: 'column',
        data: w.data.values[pdz_index],
        zIndex: 2,
        color: blue_dark,
    },{
        name: 'Доля неплатежей, %',
        yAxis: 1,
        type: 'line',
        data: w.data.values[overdue_pct_index],
        zIndex: 2,
        marker : {
          enabled: false,  
        },
        dataLabels : {
            enabled: true,
            formatter : function () {
                return (this.y * 100).toFixed(1)  + '%';
            }
        },
        color: red,
        lineWidth: 4
    }, {
        name: 'Прогноз неплатежей, %',
        yAxis: 1,
        data: forecast
    }]
});

$(`#widget-${w.general.renderTo} .va-widget-header-container`).css({
    position : 'absolute',
    paddingLeft : 10,
    paddingTop : 6,
})
