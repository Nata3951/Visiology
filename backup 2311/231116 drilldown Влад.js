// форматирование данных для получения всех кварталов
const requiredYears = [];
const tempYears = [];
let currentYear = [];

w.plotOptions.series.groupPadding = 0.1;

let wDup = JSON.parse(JSON.stringify(w))

for (let i = 0; i < w.series[0].data.length - 1; i++) {
    let currentEL = w.series[0].data[i].names;
    let nextEL = w.series[0].data[i + 1].names;
    
    if (i !== w.series[0].data.length - 2) {
        if (currentEL[0] === nextEL[0] && currentEL[1] === nextEL[1]) {
            currentYear.push(w.series[0].data[i]);
        } else if (currentEL[0] === nextEL[0] && currentEL[1] !== nextEL[1]) {
            currentYear.push(w.series[0].data[i]);
            tempYears.push(currentYear);
            currentYear = [];
        } else if (currentEL[0] !== nextEL[0]) {
            currentYear.push(w.series[0].data[i]);
            tempYears.push(currentYear);
            currentYear = [];
        }
    } else {
        currentYear.push(w.series[0].data[i]);
        currentYear.push(w.series[0].data[i + 1]);
        tempYears.push(currentYear);
        currentYear = [];
    }
}




// получение последней недели в квартале, проверка на повторяющиеся недели
tempYears.forEach(el => {
    if (el.length > 1) {
        el.forEach(_el => {
            if (el[el.length - 1].name === el[el.length - 2].name && _el.name === el[el.length - 1].name) {
                el[el.length - 1].y += _el.y;
            }
        })
    }
    
    requiredYears.push(el[el.length - 1])
});



// удаление лишних кварталов, сохранение последних 6-ти
const countElem = requiredYears.length;
if (countElem > 6) {
    for (let i = 0; i < countElem - 6; i++) {
        requiredYears.shift()
    }
}


// получение месяцев для квартала
let requiredQuarters = [];
const tempMonth = [];
let tempQuarters = [];
let currentQuarter = [];
let tempQuarter = tempYears[0][0].name.split(' - ');

tempYears.forEach(el => {
    for (let i = 0; i < el.length - 1; i++) {
        let currentEL = el[i].names;
        let nextEL = el[i + 1].names;
        

        
        if (i !== el.length - 2) {
            if (currentEL[2] === nextEL[2]) {
                currentQuarter.push(el[i]);
            } else if (currentEL[2] !== nextEL[2]) {
                currentQuarter.push(el[i]);
                tempQuarters.push(currentQuarter);
                currentQuarter = [];
            }
        } else {
            currentQuarter.push(el[i]);
            currentQuarter.push(el[i + 1]);

            console.log(el[i])
            console.log(el[i + 1])
            // console.log(currentEL)
            // console.log(el[i + 1])
            
            if (el[i].names[2] == el[i + 1].names[2]) {
                tempQuarters.push(currentQuarter);
            } else {
                tempQuarters.push(...currentQuarter.map(el => [el]));
            }
            currentQuarter = [];
            
            console.log(tempQuarters)
            
            tempMonth.push(tempQuarters);
            tempQuarters = [];
        }
    }
    
});


// удаление лишних кварталов, сохранение последних 6-ти
const countElemMonth = tempMonth.length;
if (countElemMonth > 6) {
    for (let i = 0; i < countElemMonth - 6; i++) {
        tempMonth.shift()
    }
}



let tempMonts = [];



const newTempMonth = structuredClone(tempMonth);
newTempMonth.forEach(el => { 
    // console.log(el)
    el.forEach(_el => {
        if (_el.length > 1) {
            _el.forEach(month => {
                
                if (_el[_el.length - 1].name === _el[_el.length - 2].name && month.name === _el[_el.length - 1].name) {
                    
                    _el[_el.length - 1].y += month.y;
                    
                }
            });
        }
        // console.log(_el)
        tempMonts.push(_el[_el.length - 1])
    })
    
    
    requiredQuarters.push({'data': tempMonts});
    tempMonts = [];
})



// добавление названия для drilldown
requiredYears.map(el => el.drilldown = w.series[0].name + ' ' + el.names[0] + ' - ' + el.names[1]);
requiredYears.map(el => el.name = el.names[1] + 'Q' + el.names[0]);
requiredQuarters.map(el => {
    el.id = w.series[0].name + ' ' + el.data[0].names[0] + ' - ' + el.data[0].names[1];
    el.name = w.series[0].name
    el.data.map(_el => _el.name = _el.names[0] + ' - ' + getNameMonth(_el.names[2]))
});


// замена серий
w.series[0].data = requiredYears;
// Меняем формат данных для Плана
w.series[1].data = requiredYears.map((quarter, quarterInd) => {
    return {
        name: quarter.name,
        names: quarter.names,
        drilldown: w.series[1].name + ' ' + quarter.names[0] + ' - ' + quarter.names[1],
        y: w.series[1].data.filter((el, ind) => el.name.includes(quarter.names[0] + ' - ' + quarter.names[1]))
            .map(el => el.y)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }
});
// Меняем формат данных для Факта
w.series[2].data = requiredYears.map((quarter, quarterInd) => {
    return {
        name: quarter.name,
        names: quarter.names,
        drilldown: w.series[2].name + ' ' + quarter.names[0] + ' - ' + quarter.names[1],
        y: w.series[2].data.filter((el, ind) => el.name.includes(quarter.names[0] + ' - ' + quarter.names[1]))
            .map(el => el.y)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }
});


// Получаем значения для 2 уровня Плана
let planDrillArr = w.series[1].data.map((quarter, quarterInd) => {
    let childElementsArr = wDup.series[1].data.filter((el, ind) => el.name.includes(quarter.names[0] + ' - ' + quarter.names[1]));
    let uniqeMonths = [...new Set(childElementsArr.map(el => el.name.replace(/^((?:\S+\s+){4}\S+).*$/, "$1")))]
    let childUniqeElementsArr = uniqeMonths.map(month => {
        return {
            name: month.split(' - ')[0] + ' - ' + getNameMonth(month.split(' - ')[2]),
            y: childElementsArr.filter(child => child.name.includes(month))
                .map(el => el.y)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }
    })
    
    
    return {
        id: quarter.drilldown,
        name: w.series[1].name,
        data: childUniqeElementsArr 
    }
});

// Получаем значения для 2 уровня Факта
let factDrillArr = w.series[2].data.map((quarter, quarterInd) => {
    let childElementsArr = wDup.series[2].data.filter((el, ind) => el.name.includes(quarter.names[0] + ' - ' + quarter.names[1]));
    let uniqeMonths = [...new Set(childElementsArr.map(el => el.name.replace(/^((?:\S+\s+){4}\S+).*$/, "$1")))]
    let childUniqeElementsArr = uniqeMonths.map(month => {
        return {
            name: month.split(' - ')[0] + ' - ' + getNameMonth(month.split(' - ')[2]),
            y: childElementsArr.filter(child => child.name.includes(month))
                .map(el => el.y)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }
    })
    
    return {
        id: quarter.drilldown,
        name: w.series[2].name,
        data: childUniqeElementsArr
    }
});

// console.log(requiredQuarters)
// console.log(planDrillArr)
// console.log(factDrillArr)
// console.log([...requiredQuarters, ...planDrillArr, ...factDrillArr])

w.drilldown = {
    activeAxisLabelStyle: {
        color: '#212121'
    },
    activeDataLabelStyle: {
        color: '#212121'
    },
    allowPointDrilldown: false,
    series: [...requiredQuarters, ...planDrillArr, ...factDrillArr],
    drillUpButton: {
        relativeTo: 'spacingBox',
        position: {
            y: -5,
            x: 0
        },
        theme: {
            fill: 'white',
            'stroke-width': 1,
            stroke: 'silver',
            r: 5,
            states: {
                hover: {
                    fill: '#e8e8e8'
                },
                select: {
                    stroke: '#039',
                    fill: '#e8e8e8'
                }
            }
        }
    },
};

// изменение подписей на оси X
w.xAxis = {
    type: 'category'
};

function getNameMonth(value) {
    if (value == 1) return 'Январь'
    else if (value == 2) return 'Февраль'
    else if (value == 3) return 'Март'
    else if (value == 4) return 'Апрель'
    else if (value == 5) return 'Май'
    else if (value == 6) return 'Июнь'
    else if (value == 7) return 'Июль'
    else if (value == 8) return 'Август'
    else if (value == 9) return 'Сентябрь'
    else if (value == 10) return 'Октябрь'
    else if (value == 11) return 'Ноябрь'
    else if (value == 12) return 'Декабрь'
}



Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: false
});

const bodyWidget = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body') //настройка расстояния между подписями столбцов

// changeLabelsPosition()

function changeLabelsPosition () {
    bodyWidget.querySelectorAll('.highcharts-data-labels.highcharts-series-2 text').forEach((lineTxt, index) => {
        const lineLabel = lineTxt;
        const colOneLabel = bodyWidget.querySelectorAll('.highcharts-data-labels.highcharts-series-0 text')[index];
        const colTwoLabel = bodyWidget.querySelectorAll('.highcharts-data-labels.highcharts-series-1 text')[index];
    
        const lineTop = lineLabel.parentNode.getBoundingClientRect().top;
        const colOneTop = colOneLabel.parentNode.getBoundingClientRect().top;
        const colTwoTop = colTwoLabel.parentNode.getBoundingClientRect().top;
    
        if (Math.abs(lineTop - colOneTop) < 13 || Math.abs(lineTop - colTwoTop) < 13) {
            if (colOneTop <= lineTop && colTwoTop <= lineTop) {
                lineTxt.querySelectorAll('tspan').forEach(tspan => {tspan.setAttribute('y',Number(tspan.getAttribute('y')))});
                // lineTxt.childElements.setAttribute('y', Number(lineTxt.getAttribute('y')) + 25);
            } else if (colOneTop >= lineTop && colTwoTop >= lineTop) {
                lineTxt.querySelectorAll('tspan').forEach(tspan => {tspan.setAttribute('y',Number(tspan.getAttribute('y')) + 5)});
                // lineTxt.childElements.setAttribute('y', Number(lineTxt.getAttribute('y')) - 25);
            } else {
                let nearColValue = 0;
                if (Math.abs(lineTop - colOneTop) < Math.abs(lineTop - colTwoTop)) {
                    nearColValue = -1 * (lineTop - colOneTop) - 20;
                } else {
                    nearColValue = -1 * (lineTop - colTwoTop) + 30;
                }
                lineTxt.querySelectorAll('tspan').forEach(tspan => {tspan.setAttribute('y',Number(tspan.getAttribute('y')) + nearColValue)});
                // lineTxt.childElements.setAttribute('y', Number(lineTxt.getAttribute('y')) + nearColValue);
            }
        }
    
        if (Math.abs(colOneTop - colTwoTop) < 13) {
            if (colOneTop > colTwoTop) {
                lineTxt.querySelectorAll('tspan').forEach(tspan => {tspan.setAttribute('y',Number(tspan.getAttribute('y')) + 10)});
                lineTxt.querySelectorAll('tspan').forEach(tspan => {tspan.setAttribute('y',Number(tspan.getAttribute('y')) - 10)});
                // colOneLabel.childElements.setAttribute('y', Number(colOneLabel.getAttribute('y')) + 6);
                // colTwoLabel.childElements.setAttribute('y', Number(colTwoLabel.getAttribute('y')) - 6);
            } else {
                lineTxt.querySelectorAll('tspan').forEach(tspan => {tspan.setAttribute('y',Number(tspan.getAttribute('y')) + 10)});
                lineTxt.querySelectorAll('tspan').forEach(tspan => {tspan.setAttribute('y',Number(tspan.getAttribute('y')) - 10)});
                // colOneLabel.childElements.setAttribute('y', Number(colOneLabel.getAttribute('y')) - 6);
                // colTwoLabel.childElements.setAttribute('y', Number(colTwoLabel.getAttribute('y')) + 6);
            }
        }
    });
}  
    

const styleElem = document.createElement('style');
styleElem.innerHTML = `
.highcharts-drillup-button {
    display: flex;
}
`
document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body').appendChild(styleElem)
