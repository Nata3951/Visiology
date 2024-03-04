const filterPeriodID = '25b297d438e3405381056e2f788214d7'; // id фильтра прогноза



visApi().onSelectedValuesChangedListener({guid: filterPeriodID + ' --> ' + w.general.renderTo, widgetGuid: filterPeriodID }, function (info) {
    const value = visApi().getSelectedValues(filterPeriodID)[0][0];
    let newValues = [];
    
    let countForecast = 0;
    w.data.rows.map(el => {
        if (el[2] == 'Прогнозная') {
            countForecast++;
        }
    });
    
    if (value === '+1 кв') {
        w.data.values.map(el => {
            let tempEl = [];
            
            el.map((_el, _index) => {
                if (_index <= el.length - countForecast) {
                    tempEl.push(_el);
                }
            });
            
            newValues.push(tempEl);
        });
    } else if (value === '+2 кв') {
        w.data.values.map(el => {
            let tempEl = [];
            
            el.map((_el, _index) => {
                if (_index <= el.length - (countForecast - 1)) {
                    tempEl.push(_el);
                }
            });
            
            newValues.push(tempEl);
        });
    } else if (value === '+3 кв') {
        w.data.values.map(el => {
            let tempEl = [];
            
            el.map((_el, _index) => {
                if (_index <= el.length - (countForecast - 2)) {
                    tempEl.push(_el);
                }
            });
            
            newValues.push(tempEl);
        })
    } else if (value === '+4 кв') {
        w.data.values.map(el => {
            newValues.push(el)
        })
    }
    
    renderChart(newValues)
});

renderChart();

function renderChart(newValues) {
    let wDup = JSON.parse(JSON.stringify(w))
    
    if (newValues) {
        wDup.data.values = newValues;
    }

    let green = '#aed581';
    let green_dark = '#049d4b';
    let yellow = '#ffea00';
    let yellow_t = '#ffea0099';
    let yellow_dark = '#6B660099';
    let orange = '#ffab40';
    let orange_t = '#ffab4066';
    let red = '#ff8a80';
    let red_dark = 'tomato';
    let blue = '#8da2bf';
    let blue_dark = '#1c4680';
    let line_color = '#eeeeee';
    let text_dark = '#242424';
    let text_light = '#757575';
    
    // найдем индексы колонок с данными и соберем их в объекты
    
    let ratings = ['A', 'B', 'C', 'D'];
    
    let base = {};
    let min_ = {};
    let max_ = {};
    ratings.forEach((el,ind) => {
            let test =  wDup.data.cols.findIndex(item =>item[0].includes('fact') && item[1].includes(el));
            base[el] = test;
            test =  wDup.data.cols.findIndex(item =>item[0].includes('low') && item[1].includes(el));
            min_[el] = test;
            test =  wDup.data.cols.findIndex(item =>item[0].includes('high') && item[1].includes(el));
            max_[el] = test;
        });
    
    // найдем индекс первого прогноза
    let forecast_start =  wDup.data.rows.findIndex(item =>item.includes('Прогнозная'));
    
    // определим функции для формирования набора данных по каждому рейтингу 
    function get_base(str) {
        let arr = wDup.data.values[base[str]];
        if (!arr) return;
        return arr.slice(0,forecast_start);
        }
    
    function get_forecast(str) {
        let arr = wDup.data.values[base[str]];
        if (!arr) return;
        return arr.map((el, ind) => ind < forecast_start ? null : el );
        }
        
    function get_range(str) {
       let arr_min = wDup.data.values[min_[str]]; 
       if (!arr_min) return;
       let arr_max = wDup.data.values[max_[str]];
       return arr_min.map((el, ind) => ind < forecast_start ? [null, null] :[el, arr_max[ind] ]); 
    }
    
    
    
    // console.log('test w', w);
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
    
    
    // подготовим надпись Статистика - Прогноз
    
    let hline_text = `
            <span style="color:${text_dark}">Статистика 
            <span style="color:${blue}">&#9654;&nbsp&nbsp</span> 
            <span style="color:${blue_dark}">&#9664;</span> 
            Прогноз &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>  
            `;
            
// console.log('test w ddd', wDup);    
    
    Highcharts.chart({
        chart: {
            renderTo: wDup.general.renderTo,
            ignoreHiddenSeries: false,
        },
        legend: {
            enabled: true,
            verticalAlign: 'top',
            margin : 20,
        },
        xAxis: {
            endOnTick: false,
            categories: w.data.rows,
            softMax: w.data.rows.length - 1,
            // gridLineColor: line_color,
            // gridLineWidth: 1,
            labels :{
                formatter:function() {
                    if(this.pos < forecast_start) return this.value[1]+'кв '+this.value[0];
                    else return `<span style="color: ${blue};"> ${this.value[1]}кв ${this.value[0]} </span>`;
                },
            },
            plotLines: [{
                dashStyle: 'dash',
                color: 'slategrey',
                width: 2,
                value: forecast_start-0.5,
                zIndex : 20,
                label: {
                    text: hline_text,
                    align: 'center',
                    verticalAlign : 'top',
                    textAlign: 'center',
                    rotation: 0,
                }
            }],
            
        },
        yAxis: {
            labels: {
            formatter: function () {
                return this.value.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
            }
        },
            // max: 10000000,
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
                
            },
            errorbar: {
              stemWidth: 12,
              whiskerLength: 12,
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
                id: 'A',
                type: 'column',
                color: green,
                data: get_base('A'),
                visible: false,
            },
            {
                name: 'B',
                id: 'B',
                type: 'column',
                color: yellow,
                data: get_base('B'),
                visible: false,
            },
            {
                name: 'C',
                id: 'C',
                type: 'column',
                color: orange,
                data: get_base('C'),
            },
            {
                name: 'D',
                id: 'D',
                type: 'column',
                color: red,
                data: get_base('D'),
            },
            {
                name: 'A+',
                linkedTo: 'A',
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
                linkedTo: 'B',
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
                linkedTo: 'C',
                type: 'spline',
                color: orange,
                data: get_forecast('C'),
                pointPlacement : 0.05,
                marker: {lineColor: orange,},
                showInLegend: false,
            },
            {
                name: 'D+',
                linkedTo: 'D',
                type: 'spline',
                color: 'orangered',
                data: get_forecast('D'),
                pointPlacement : 0.3,
                marker: {
                lineColor: red_dark,
                },
                showInLegend: false,
            },
            {
                name: 'A+',
                linkedTo: 'A',
                type: 'errorbar',
                color: green,
                data: get_range('A'),
                pointPlacement : -0.3,
            },
            {
                name: 'B+',
                linkedTo: 'B',
                type: 'errorbar',
                color: yellow_t,
                data: get_range('B'),
                pointPlacement : -0.05,
            },
            {
                name: 'C+',
                linkedTo: 'C',
                type: 'errorbar',
                color: orange_t,
                data: get_range('C'),
                pointPlacement : -0.05,
            },
            {
                name: 'D+',
                linkedTo: 'D',
                type: 'errorbar',
                color: red,
                data: get_range('D'),
                pointPlacement : 0,
                marker: {
                lineColor: 'sienna',
              },
            },
    
        ]
    });
    
    $(`#widget-${wDup.general.renderTo} .va-widget-body *`).css({
        fontSize : 12,
        fontFamily: 'Open Sans',
    });
    
    $(`#widget-${wDup.general.renderTo} .va-widget-header-container`).css({
        position : 'absolute',
        paddingLeft : 10,
        paddingTop : 0,
        //borderTop : `2px solid ${line_color}`
    });
    
    // добавим единицы измерения
    $(`#widget-${wDup.general.renderTo} .va-widget-header:not(:contains('руб'))`).append(
    `<span style="color:${text_light}; font-weight: normal"> | млн руб.</span>`
    );
    
    $("#widget-"+w.general.renderTo).css({
        'z-index' : '2',
    });

}
