w.series.forEach(el => el.name = el.name.split('-')[1]);



///
w.series =  w.series.sort(function(a,b){
    return a.data.at(-1).y > b.data.at(-1).y? 1: -1 ;
});

console.log('test w', w)

w.yAxis.OnTick = false; 
w.yAxis.endOnTick = false;

let series_colors = [
    '#f0f921',
    // "#b5de2b",
    '#fb9f3a',
    // "#35b779",
    '#d8576b',
    // "#26828e",
    '#9c179e',
    // '#46039f',
    "#3e4989",
    "#440154"
    ];

    
// reversed    
let series_colors_r = [
        // "#440154",
        "#3e4989",
        '#9c179e',
    // '#46039f',
        '#d8576b',
    // "#26828e",
        '#fb9f3a',
    // "#35b779",
        '#f0f921'
    // "#b5de2b",
    ];
    
// присвоим цвета сериям
w.series.forEach((el, ind) => {
    // if (ind < 5) el.color = series_colors[ind];
    // else {
        el.color = 'lightgrey';
        el.borderColor = 'transparent';
        el.showInLegend=false;
    // }
});

if (w.series.length > 5) {

w.series.at(-1).name='Остальное';
w.series.at(-1).showInLegend=true;
}

let n = w.series.length - 5;

for (let i=w.series.length - 5; i<w.series.length; i++) {
    if (i >= 0) {
        let ind = i % 5;
        w.series[i].color = series_colors_r[ind];
         w.series[i].showInLegend=false;
    }
}

console.log ('test ind', w);

w.legend.itemStyle = ({
    'fontsize' : '16px',
    'font-family' : 'Open Sans',
    'font-weight' : 'normal',
    'color' : 'grey',
    'textOverflow' : 'ellipsis',
    'width' : '140px',
    
});

w.legend.width = '150px',



w.xAxis.labels.formatter = function(){
    // console.log('test', this.value);
    if (this.value == 1) return 'Янв';
    else if (this.value == 2) return 'Фев';
    else if (this.value == 3) return 'Мар';
    else if (this.value == 4) return 'Апр';
    else if (this.value == 5) return 'Май';
    else if (this.value == 6) return 'Июн';
    else if (this.value == 7) return 'Июл';
    else if (this.value == 8) return 'Авг';
    else if (this.value == 9) return 'Сен';
    else if (this.value == 10) return 'Окт';
    else if (this.value == 11) return 'Ноя';
    else if (this.value == 12) return 'Дек';
    else return this.valueж
}


Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    // tooltip: w.tooltip
     tooltip: {
        useHTML: true,
        formatter: function() { 
            // console.log('test this' , this);
                return this.point.series.name + ": " + this.y.toFixed();
            }
    },
       
});

// console.log ('test legend', w)

//  фон виджета
 $(`#widget-${w.general.renderTo}`).css({
    'background-color': 'white',
      'border-radius' : '8px',
      'padding' : '15px',
     });

 
// заголовок виджета: отступы и высота
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    // 'padding': '15px',
    'height' : '50px',
    'text-align' : 'left',
});

