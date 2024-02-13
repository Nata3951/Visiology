const filterPeriodID = '25b297d438e3405381056e2f788214d7'; // id фильтра прогноза

let blue_dark = '#1c4680';
let blue = '#8da2bf';
let text_dark = '#242424';
let text_light = '#757575';
let red = '#ff8a80';
let red_trans = '#ff8a8020';
let yellow = '#ffea0044';
let pdz_index = 0;
let overdue_pct_index = 5;
let overdue_pct_max_index = 6;
let overdue_pct_min_index = 7;

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

    renderChart(newValues);
});

renderChart()

function renderChart(newValues) {
    let wDup = JSON.parse(JSON.stringify(w))

    if (newValues) {
        wDup.data.values = newValues
    }



    // найдем первое заполненное значение в серии forecast
    let forecast_start = wDup.data.rows.findIndex(el => el[2] == 'Прогнозная');


    // сформируем набор данных для интервала прогноза
    let forecast = [];

    wDup.data.rows.forEach((el, ind) => {
        forecast.push([el, wDup.data.values[overdue_pct_min_index][ind], wDup.data.values[overdue_pct_max_index][ind]]);
    });

    // добавим точку, где диапазон равен факту
    forecast[forecast_start - 1][1] = wDup.data.values[overdue_pct_index][forecast_start - 1];
    forecast[forecast_start - 1][2] = wDup.data.values[overdue_pct_index][forecast_start - 1];


    // сформируем набор данных для заливки нижней части диаграммы
    let fact = [];

    wDup.data.rows.slice(0, forecast_start).forEach((el, ind) => {
        fact.push([el, 0, wDup.data.values[overdue_pct_index][ind]]);
    });

    // найдем минимальные и максимальные значения чтобы сжать bar chart в нижнюю часть диаграммы, а линейную - в верхнюю часть

    let pdz_max = Math.max(...wDup.data.values[pdz_index]);
    let line_max = Math.max(...wDup.data.values[overdue_pct_index], ...wDup.data.values[overdue_pct_max_index]);
    let line_min = Math.min(
        ...wDup.data.values[overdue_pct_index].filter(el => el > 0),
        ...wDup.data.values[overdue_pct_min_index].filter(el => el > 0)
    );

    let y_min = line_min - (line_max - line_min) * 2;

    // console.log('test w', w)
    // console.log('test fact', fact);
    // console.log('test forecast', forecast);


    // подготовим надпись Статистика - Прогноз

    let hline_text = `
            <span style="color:${text_dark}">Статистика 
            <span style="color:${blue}">&#9654;&nbsp&nbsp</span> 
            <span style="color:${blue_dark}">&#9664;</span> 
            Прогноз &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>  
            `;
            
    console.log('test w', wDup);

    Highcharts.chart({
        chart: {
            type: "arearange",
            renderTo: wDup.general.renderTo
        },

        xAxis: {
            type: 'category',
            endOnTick: false,

            categories: wDup.data.rows,
            labels: {
                formatter: function () {

                    if (this.pos < forecast_start) return this.value[1] + 'кв ' + this.value[0];
                    else return `<span style="color: ${blue};"> ${this.value[1]}кв ${this.value[0]} </span>`;
                },
            },
            plotLines: [{
                dashStyle: 'dash',
                color: 'slategrey',
                width: 2,
                value: forecast_start - 0.5,
                zIndex: 20,
                label: {
                    text: hline_text, // 
                    align: 'center',
                    verticalAlign: 'top',
                    textAlign: 'center',
                    rotation: 0,
                    style: {
                        'color': 'grey',
                    },

                }
            }],
            crosshair: true,

        },
        yAxis: [
            // primary axis
            {
                endOnTick: false,
                onTick: false,
                labels: {
                formatter: function () {
                    return (this.value).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
                }
            },
                max: pdz_max / 2 * 3,
                min: 0,
                showLastLabel: false,
                title: {
                    text: null
                }
            },
            // secondary axis
            {
                min: y_min,
                endOnTick: false,
                onTick: false,
                opposite: true,
                visible: false,
                title: {
                    text: null
                }
            }],
        legend: {
            enabled: true,
            verticalAlign: 'top',
            margin: 20,
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,

            },
            // line: {
            //     tooltip: {
            //         pointFormatter: function () {
            //             return this.series.name.slice(0, -3) + ": " + (this.y).toFixed(1) + '%';
            //         }

            //     },
            // },

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
        series: [{
            name: 'ПДЗ накопленная, млн руб.',
            type: 'column',
            data: wDup.data.values[pdz_index],
            color: blue_dark,
            minPointLength: null,
        }, {
            name: 'Доля неплатежей, %',
            yAxis: 1,
            type: 'line',
            data: wDup.data.values[overdue_pct_index],
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


        }, {
            name: 'Диапазон с вероятностью 68%',
            yAxis: 1,
            data: forecast, 
            color: yellow,
            legendColor: 'green',
            

        }, 
        // {
        //     name: 'fill',
        //     yAxis: 1,
        //     data: fact,
        //     fillOpacity: 1 / 15,
        //     showInLegend: false,
        // }
        ],
tooltip: {
        shared: true,
        useHTML: true,
        formatter: function(e) {
            console.log('test e', e)
            console.log('test this', this)
            let str = `
            <span style="font-size:12px;color:#757575;font-family:Open Sans">${this.points[0].key}</span><table>
            <tr><td style="font-size:12px;font-family:Open Sans;color:${this.points[0].series.color};padding:10">${this.points[0].series.name}: </td>
            <td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">${this.points[0].y.toFixed(2)}</b></td></tr>
            <tr><td style="font-size:12px;font-family:Open Sans;color:${this.points[1].series.color};padding:10">${this.points[1].series.name}: </td>
            <td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">${this.points[1].y.toFixed(2)}</b></td></tr>
            `
            
            if (forecast[this.points[0].point.index][1] !== null) {
                str += `
                    <tr><td style="font-size:12px;font-family:Open Sans;color:${this.points[0].series.color};padding:10">Диапазон с вероятностью 68%: </td>
                    <td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">${forecast[this.points[0].point.index][1].toFixed(2)} - ${forecast[this.points[0].point.index][2].toFixed(2)}</b></td></tr>
                    </table>
                `
            } else {
                str += `
                    </table>
                `
            }
            
            return str
        }
 }
    });

    $(`#widget-${wDup.general.renderTo} .va-widget-body *`).css({
        fontSize: 12,
        fontFamily: 'Open Sans',
    });

    // сдвинем заголовок виджета вниз
    $(`#widget-${wDup.general.renderTo} .va-widget-header-container`).css({
        position: 'absolute',
        paddingLeft: 10,
        paddingTop: 0,
    });

    // добавим единицы измерения  
    $(`#widget-${wDup.general.renderTo} .va-widget-header:not(:contains('руб'))`).append(
        `<span style="color:${text_light}; font-weight: normal"> | млн руб. / % </span>`
    );
    
    $("#widget-"+w.general.renderTo).css({
        'z-index' : '2',
    });
}


