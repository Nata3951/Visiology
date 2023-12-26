let green = '#aed581';
let green_dark = '#049d4b';
let yellow = '#ffea00';
let yellow_t = '#ffea0099';
let yellow_dark = '#6B660099';
let orange = '#ffab40';
let orange_t = '#ffab4066';
let red = '#ff8a80';
let red_dark = 'tomato';
let blue_dark = '#1c4680';
let line_color = '#eeeeee';

// найдем индексы колонок с данными и соберем их в объекты

let ratings = ['A', 'B', 'C', 'D'];

let base = {};
let min_ = {};
let max_ = {};
ratings.forEach((el,ind) => {
        let test =  w.data.cols.findIndex(item =>item[0].includes('fact') && item[1].includes(el));
        base[el] = test;
        test =  w.data.cols.findIndex(item =>item[0].includes('low') && item[1].includes(el));
        min_[el] = test;
        test =  w.data.cols.findIndex(item =>item[0].includes('high') && item[1].includes(el));
        max_[el] = test;
    });

// найдем индекс первого прогноза
let forecast_start =  w.data.rows.findIndex(item =>item.includes('прогноз'));

// определим функции для формирования набора данных по каждому рейтингу 
function get_base(str) {
    let arr = w.data.values[base[str]];
    if (!arr) return;
    return arr.slice(0,forecast_start);
    }

function get_forecast(str) {
    let arr = w.data.values[base[str]];
    if (!arr) return;
    return arr.map((el, ind) => ind < forecast_start ? null : el );
    }
    
function get_range(str) {
   let arr_min = w.data.values[min_[str]]; 
   if (!arr_min) return;
   let arr_max = w.data.values[max_[str]];
   return arr_min.map((el, ind) => ind < forecast_start ? [null, null] :[el, arr_max[ind] ]); 
}



console.log('test w', w);
// console.log('test A',  get_range('C'));
// console.log('test max', max_);
    
    
// Define a custom symbol path
Highcharts.SVGRenderer.prototype.symbols.rect = function (x, y, w, h) {
return [
'M', x, y+h/2,
'L', x+w, y+h/2,
'z'];
};


if (Highcharts.VMLRenderer) {
Highcharts.VMLRenderer.prototype.symbols.rect = Highcharts.SVGRenderer.prototype.symbols.rect;
}


Highcharts.chart({
    chart: {
        renderTo: w.general.renderTo
    },
    legend: {
        enabled: true,
        verticalAlign: 'top',
        margin : 15,
    },
    xAxis: {
        categories: w.data.rows,
        gridLineColor: line_color,
        gridLineWidth: 1,
        labels :{
            formatter:function() {
                 return this.value[1]+'кв '+this.value[0];
            },
        },
        plotLines: [{
            dashStyle: 'dash',
            color: 'slategrey',
            width: 2,
            value: forecast_start-0.5,
            zIndex : 20,
            label: {
                text: 'Статистика> <Прогноз &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
                align: 'center',
                verticalAlign : 'top',
                textAlign: 'center',
                rotation: 0,
                style:{
                    'color' : 'grey',
                },
 
            }
        }],
    },
    yAxis: {
        title: {enabled:false},
    },
    

    tooltip: {
        shared: true
    },
    
    plotOptions : {
        series: {
            groupPadding: 0.1,
            pointPadding: 0,
        },
        column: {
            borderWidth: 0,
            events: {
                    legendItemClick: function () {
                        return false; // <== returning false will cancel the default action
                    },
            },
        },
        errorbar: {
          stemWidth: 10,
          whiskerLength: 0,
          zIndex: -1,
          
          },
          
        spline: {
          lineWidth: 0,
          marker: {
             symbol: 'rect',
             lineWidth: 4,
             radius: 8,
          },
        },
        
    },

    series: [
        {
            name: 'A',
            type: 'column',
            color: green,
            data: get_base('A'),
        },
        {
            name: 'B',
            type: 'column',
            color: yellow,
            data: get_base('B'),
        },
        {
            name: 'C',
            type: 'column',
            color: orange,
            data: get_base('C'),
        },
        {
            name: 'D',
            type: 'column',
            color: red,
            data: get_base('D'),
        },
        {
            name: 'A+',
            type: 'spline',
            color: green,
            marker: {
            lineColor: green_dark,
          },
            data: get_forecast('A'),
            pointPlacement : -0.3,
            showInLegend: false,
        },
        {
            name: 'B+',
            type: 'spline',
            color: yellow,
            data: get_forecast('B'),
            pointPlacement : -0.15,
            marker: {
            lineColor: yellow_dark,
            },
            showInLegend: false,
        },
        {
            name: 'C+',
            type: 'spline',
            color: orange,
            data: get_forecast('C'),
            pointPlacement : 0.05,
            marker: {lineColor: orange,},
            showInLegend: false,
        },
        {
            name: 'D+',
            type: 'spline',
            color: 'orangered',
            data: get_forecast('D'),
            pointPlacement : 0.25,
            marker: {
            lineColor: red_dark,
            },
            showInLegend: false,
        },
        {
            name: 'A+',
            type: 'errorbar',
            color: green,
            data: get_range('A'),
            pointPlacement : -0.3,
        },
        {
            name: 'B+',
            type: 'errorbar',
            color: yellow_t,
            data: get_range('B'),
            pointPlacement : -0.15,
        },
        {
            name: 'C+',
            type: 'errorbar',
            color: orange_t,
            data: get_range('C'),
            pointPlacement : 0.05,
        },
        {
            name: 'D+',
            type: 'errorbar',
            color: red,
            data: get_range('D'),
            pointPlacement : 0.25,
            marker: {
            lineColor: 'sienna',
          },
        },

    ]
});

$(`#widget-${w.general.renderTo} .va-widget-body *`).css({
    fontSize : 12,
    fontFamily: 'Open Sans',
});

$(`#widget-${w.general.renderTo} .va-widget-header-container`).css({
    position : 'absolute',
    paddingLeft : 10,
    paddingTop : 10,
    borderTop : `2px solid ${line_color}`
})
