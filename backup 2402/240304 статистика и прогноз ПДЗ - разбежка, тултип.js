const filterPeriodID = '25b297d438e3405381056e2f788214d7'; // id фильтра прогноза

visApi().onSelectedValuesChangedListener({ guid: filterPeriodID + ' --> ' + w.general.renderTo, widgetGuid: filterPeriodID }, function (info) {
    const value = visApi().getSelectedValues(filterPeriodID)[0][0];
    let newValues = [];

    let countForecast = 0;
    w.data.rows.map(el => {
        if (el[2] == 'Прогнозная') {
            countForecast++;
        }
    })

    if (value === '+1 кв') {
        w.data.values.map(el => {
            let tempEl = [];

            el.map((_el, _index) => {
                if (_index <= el.length - countForecast) {
                    tempEl.push(_el);
                }
            });

            newValues.push(tempEl);
        })
    } else if (value === '+2 кв') {
        w.data.values.map(el => {
            let tempEl = [];

            el.map((_el, _index) => {
                if (_index <= el.length - (countForecast - 1)) {
                    tempEl.push(_el);
                }
            });

            newValues.push(tempEl);
        })
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
})

renderChart()

function renderChart(newValues) {
    let wDup = JSON.parse(JSON.stringify(w))

    if (newValues) {
        wDup.data.values = newValues
    }

    let blue = '#8da2bf';
    let blue_dark = '#1c4680';
    let green = '#aed581';
    let green_dark = '#049d4b';
    let yellow = '#ffea00';
    let yellow_t = '#ffea0099';
    let yellow_dark = '#6B660099';
    let orange = '#ffab40';
    let orange_t = '#ffab4066';
    let red = '#ff8a80';
    let red_dark = 'tomato';
    let text_dark = '#242424';
    let text_light = '#757575';
    let line_color = '#eeeeee';
    let purple_dark = '#ba68c8';
    let purple = '#e1bee7';


    // найдем индексы колонок с данными 

    let fact_col = wDup.data.cols.findIndex(item => item[0].includes('fact'));
    let low_col = wDup.data.cols.findIndex(item => item[0].includes('low'));
    let high_col = wDup.data.cols.findIndex(item => item[0].includes('high'));
    let overdue_col = wDup.data.cols.findIndex(item => item[0].includes('overdue_pct'));
    let overdue_min_col = wDup.data.cols.findIndex(item => item[0].includes('min'));
    let overdue_max_col = wDup.data.cols.findIndex(item => item[0].includes('max'));




    // найдем индекс первого прогноза
    let forecast_start = wDup.data.rows.findIndex(item => item.includes('Прогнозная'));

    // сформируем наборы данных

    // bar chart
    let fact = wDup.data.values[fact_col].slice(0, forecast_start);

    let forecast = wDup.data.values[fact_col].map(
        (el, ind) => ind < forecast_start ? null : el
    );

    let low = wDup.data.values[low_col];
    let high = wDup.data.values[high_col];

    let low_high = low.map(
        (el, ind) => ind < forecast_start ? [null, null] : [el, high[ind]]
    );
    
    //fan chart
    let fan_forecast = [];
    


    wDup.data.rows.forEach((el, ind) => {
        fan_forecast.push([el, wDup.data.values[overdue_min_col][ind], wDup.data.values[overdue_max_col][ind]]);
    });

    // добавим точку, где диапазон равен факту
    fan_forecast[forecast_start - 1][1] = wDup.data.values[overdue_col][forecast_start - 1];
    fan_forecast[forecast_start - 1][2] = wDup.data.values[overdue_col][forecast_start - 1];
    
    
    // найдем минимальные и максимальные значения чтобы сжать bar chart в нижнюю часть диаграммы, а линейную - в верхнюю часть

    let bar_max = Math.max(...wDup.data.values[fact_col]);
    let line_max = Math.max(...wDup.data.values[overdue_col], ...wDup.data.values[overdue_max_col]);
    let line_min = Math.min(
        ...wDup.data.values[overdue_col].filter(el => el > 0),
        ...wDup.data.values[overdue_min_col].filter(el => el > 0)
    );

    let y_min = line_min - (line_max - line_min) * 1.8;


    // console.log('test base', low_high);

    // отрисуем фигуру для маркера прогноза
    Highcharts.SVGRenderer.prototype.symbols.rect = function (x, y, w, h) {
        return [
            'M', x, y + h / 2,
            'L', x + w, y + h / 2,
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


    Highcharts.chart({
        chart: {
            renderTo: wDup.general.renderTo,
        },
        
               
        
        legend: {
            enabled: true,
            verticalAlign: 'top',
            margin: 25,
            useHTML: true,
            // labelFormatter: function () {
            //     // if legendTooltip set, put it into title attr
            //     if (this.options.custom && this.options.custom.legendTooltip) {
            //          return '<div class="tooltip">' + this.name + '</div>';
            //     }
            //     return this.name;
            // }
        },
        xAxis: {
            categories: wDup.data.rows,
            gridLineColor: line_color,
            gridLineWidth: 0,
            labels: {
                formatter: function () {
                    if (this.pos < forecast_start) return this.value[1] + 'кв ' + this.value[0];
                    else return `<span style="color: ${blue};"> ${this.value[1]}кв ${this.value[0]} </span>`;
                },
            },
            softMax: w.data.rows.length - 1,
            plotLines: [{
                dashStyle: 'dash',
                color: 'slategrey',
                width: 2,
                value: forecast_start - 0.5,
                zIndex: 20,
                label: {
                    text: hline_text,
                    align: 'center',
                    verticalAlign: 'top',
                    textAlign: 'center',
                    rotation: 0,
                }
            }],
        },
        yAxis: [{// primary axis
            title: { enabled: false },
            labels: {
                formatter: function () {
                    return this.value.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
                }
            },
            max: bar_max / 2 * 2.8,
            min: 0,
        },

        {// secondary axis
            min: y_min,
            endOnTick: false,
            onTick: false,
            opposite: true,
            visible: false,
            title: {
                text: null
            }
        }],

        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                let name =  this.points[0].key;
                let name_style = "font-size:12px;color:#757575;font-family:Open Sans";
                let item_style = 'font-size:12px;font-family:Open Sans;padding:10';
                let value_style = 'padding:0; text-align:right;font-weight:bold; font-size:12px;color:#212121;font-family:Open Sans';
            //   заголовок тултипа
                let str = `<span style="${name_style}">${name[1]}кв. ${name[0]}, ${name[2]}:</span><table>`;
                this.points.forEach((el, ind) => {
                let item = `<tr><td style="color:${this.points[ind].series.color}; ${item_style}">${this.points[ind].series.name}: </td>`;
                let value = this.points[ind].point.high ? 
                    `<td style = "${value_style}">${this.points[ind].point.low.toFixed(1)} - ${this.points[ind].point.high.toFixed(1)}</td></tr>`
                     :  
                    `<td style = "${value_style}">${this.points[ind].y.toFixed(1)}</td></tr>`;
                str += item + value ;
        });
            //  console.log ('test this', this);
             return str + '</table>';
            },
        },

        plotOptions: {
            series: {
                groupPadding: 0.3,
            },
            column: {
                borderWidth: 0,
            },
            errorbar: {
                stemWidth: 20,
                whiskerLength: 0,
                zIndex: -1,

            },

            spline: {
                lineWidth: 0,
                marker: {
                    symbol: 'rect',
                    lineWidth: 4,
                    radius: 14,
                },
            },
            arearange: {
                enableMouseTracking: false,
                states: {
                    inactive: {
                        enabled: false
                    }
                },
                color: red,
                fillOpacity: 1 / 4,
                lineWidth: 0,
                
                marker: {
                    enabled: false,
                },

            },

        },

        series: [
            {
                name: 'Факт',
                type: 'column',
                color: purple_dark,
                data: fact,
                minPointLength: null,
            },

            {
                name: 'Прогноз',
                type: 'spline',
                color: purple_dark,
                marker: {
                    lineColor: purple_dark,
                },
                data: forecast,
            },

            {   name: 'Диапазон',
                type: 'errorbar',
                color: purple,
                data: low_high,
            },
            {
            name: 'Доля неплатежей, %',
            yAxis: 1,
            type: 'line',
            data: wDup.data.values[overdue_col],
            marker: {
                enabled: false,
            },
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return (this.y).toFixed(1) + '%';
                }
            },
            color: red,
            lineWidth: 2,
        }, 
        {
            name: 'Диапазон с вероятностью 68%',
            type: 'arearange',
            yAxis: 1,
            data: fan_forecast, 
            color: yellow,
            custom: {
            legendTooltip: "Counter custom tooltip"
    }
            // legendColor: 'green',
        }, 

        ]
    });

    $(`#widget-${wDup.general.renderTo} .va-widget-body *`).css({
        fontSize: 12,
        fontFamily: 'Open Sans',
    });

    // сдвинем заголовок виджета вниз
    $(`#widget-${wDup.general.renderTo} .va-widget-header-container`).css({
        position: 'absolute',
        top: 4,
        paddingLeft: 10,
        paddingTop: 0,
        //borderTop: `2px solid ${line_color}`,
    });

    // добавим единицы измерения
    $(`#widget-${wDup.general.renderTo} .va-widget-header:not(:contains('руб'))`).append(
        `<span style="color:${text_light}; font-weight: normal"> | млн руб.</span>`
    );
    
    $("#widget-"+w.general.renderTo).css({
        'z-index' : '2',
    });
    
// добавим tooltip для легенды 
$(`#widget-${w.general.renderTo} style.temp_style`).remove()


$(`<style class = "temp_style">

#widget-${w.general.renderTo} .highcharts-series-4::after {
    content: "С вероятностью 68% прогнозные значения попадут в указанный диапазон (диапазон соответствует отклонению от среднего значения в размере +/- одно стандартное отклонение)"; 
    display: block;
    background-color: white;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    padding : 5px;
    top: 25px;
    left: 55px;
    width: 200px;
    height: auto;
    border: 1px solid #ccc;
    border-radius : 10px;
    }
    
#widget-${w.general.renderTo} .highcharts-series-4:hover::after {
    visibility: visible;
    opacity: 1;
    }    
    
</style>`)
.appendTo(`#widget-${w.general.renderTo}`)
 
}





// console.log('test w', w); 
