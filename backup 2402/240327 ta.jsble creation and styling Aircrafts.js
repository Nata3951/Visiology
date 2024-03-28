const periodFilterID = '6e76408824864e5eb8901aa1ab7150cb'; // id кнопок периодов
const calendarFilterID = 'b540a8f42fa442228da98f3939e04c27'; // id календаря

// сохраняем названия месяцев в массиве
const listMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

// * * *
// группировка данных по временнЫм диапазонам

// дублируем объект w
const wDup = JSON.parse(JSON.stringify(w));

// создаем объекты для хранения сгруппированных данных
const fullData = {};
let sumData = {};
let rowsList = [];

// создаем список договоров
wDup.data.rowNames.map(el => {
    fullData[el[0]] = {};
    sumData[el[0]] = {};
    rowsList.push(el[0]);
})



// создаем полный массив данных
wDup.data.records.map((el, index) => {
    for (let key in fullData) {
        if (key === el.rowNames[0] && key) {
            for (let col in el) {
                if (col.split(' ')[0] === 'column') {
                    let indexCol = Number(col.split(' ')[1]);
                    let fullName = wDup.data.colNames[indexCol];
                    
                    let nameCol = fullName[0].split(' ')[0] + ' - ' + fullName[1] + ' - ' + fullName[2] + ' - ' + fullName[3] + ' - ' + fullName[4];
                    
                    fullData[key][nameCol] = el[col];
                }
            }
        }
    }
})

// забираем с фильтра гранулярность периодов (год, квартал, месяц...)
const valuePeriod = visApi().getSelectedValues(periodFilterID).length ? visApi().getSelectedValues(periodFilterID)[0][0] : '';



let headerList = new Set();

// рассчитаем текущий квартал и месяц
let now = new Date();
const getQuarter = Math.ceil(((now).getMonth() + 1) / 3);
const getMonth = now.getMonth()

// * * *
// заполнение недостающих данных
let periodData = visApi().getSelectedValues(calendarFilterID).length === 1 ? visApi().getSelectedValues(calendarFilterID)[0] : visApi().getSelectedValues(calendarFilterID);

// заберем данные с календарного фильтра
const startDate = getDateFromFilter(periodData[0]);
const lastDate = getDateFromFilter(periodData[1]);

function getDateFromFilter(date) {
    const dateFull = new Date(date);
    
    const week = getWeek(dateFull);
    const month = dateFull.getMonth();
    const quarter = Math.ceil(((dateFull).getMonth() + 1) / 3);
    const year = dateFull.getFullYear();
    
    return [year, quarter, month, week]
}

// сформируем массив из составляющих названий колонок таблицы с нужной гранулярностью
const fullDataList = [];

for (let i = startDate[2]; i <= lastDate[2]; i++) {
    const quarter = Math.ceil((i + 1) / 3);
    
    if (valuePeriod !== 'Квартал') {
        fullDataList.push(['План Т', startDate[0].toString(), quarter.toString(), listMonth[i]])
        fullDataList.push(['Факт Т', startDate[0].toString(), quarter.toString(), listMonth[i]])
        fullDataList.push(['Ост Т', startDate[0].toString(), quarter.toString(), listMonth[i]])
    } else {
        if (listMonth[i] !== listMonth[getMonth]) {
            fullDataList.push(['План Т', startDate[0].toString(), quarter.toString(), listMonth[i]])
            fullDataList.push(['Факт Т', startDate[0].toString(), quarter.toString(), listMonth[i]])
            fullDataList.push(['Ост Т', startDate[0].toString(), quarter.toString(), listMonth[i]])
        }
    }
    
}

// для кварталов дополнительно разобьем текущий месяц на недели
if (valuePeriod === 'Квартал') {
    let startWeekCurrentMonth = new Date();
    startWeekCurrentMonth.setDate(1);
    
    let startWeek = getWeek(startWeekCurrentMonth);
    
    let lastWeekCurrentMonth = new Date();
    lastWeekCurrentMonth.setDate(31)
    
    let lastWeek = getWeek(lastWeekCurrentMonth);
    
    
    for (let i = startWeek; i <= lastWeek; i++) {
        fullDataList.push(['План Т', startDate[0].toString(), getQuarter.toString(), listMonth[getMonth], i.toString()])
        fullDataList.push(['Факт Т', startDate[0].toString(), getQuarter.toString(), listMonth[getMonth], i.toString()])
        fullDataList.push(['Ост Т', startDate[0].toString(), getQuarter.toString(), listMonth[getMonth], i.toString()])
    }
}

// console.log('test fullDataList', fullDataList)

// преобразуем массив с названиями колонок в строки и уберем дубликаты

let fullColNames = wDup.data.colNames.concat(fullDataList);
let uniqueFullNames = new Set();

fullColNames.map(el => {
    if (el[4]) {
        uniqueFullNames.add(el[0].split(' ')[0] + ' - ' + el[1] + ' - ' + el[2] + ' - ' + el[3] + ' - ' + el[4])
    } else {
        uniqueFullNames.add(el[0].split(' ')[0] + ' - ' + el[1] + ' - ' + el[2] + ' - ' + el[3])
    }
})

uniqueFullNames = Array.from(uniqueFullNames);



// отсортируем уникальные названия по номеру месяца и недели, если применимо
uniqueFullNames.sort((a, b) => {
  return listMonth.indexOf(a.split(' - ')[3]) - listMonth.indexOf(b.split(' - ')[3]);
});

uniqueFullNames.sort((a, b) => {
  return Number(a.split(' - ')[4]) - Number(b.split(' - ')[4]);
});


// снова разберем строки с названиями колонок на массив
fullColNames = [];

uniqueFullNames.map(el => {
    if (el.split(' - ')[4]) {
        fullColNames.push([el.split(' - ')[0], el.split(' - ')[1], el.split(' - ')[2], el.split(' - ')[3], el.split(' - ')[4]])
    } else {
        fullColNames.push([el.split(' - ')[0], el.split(' - ')[1], el.split(' - ')[2], el.split(' - ')[3]])
    }
})


if (valuePeriod !== 'Месяц') {
    wDup.data.colNames = fullColNames;
}

wDup.data.colNames.map(el => {
    if (valuePeriod === 'Год' || valuePeriod === 'С начала года') {
        if (getQuarter !== Number(el[2])) {
            let name = el[0].split(' ')[0] + ' - ' + el[1] + ' - ' + el[2];
            headerList.add(name);
        } else {
            let name = el[0].split(' ')[0] + ' - ' + el[1] + ' - ' + el[2] + ' - ' + el[3];
            headerList.add(name);
        }
    } else if (valuePeriod === 'Квартал') {
        if (listMonth[getMonth] !== el[3]) {
            let name = el[0].split(' ')[0] + ' - ' + el[1] + ' - ' + el[2] + ' - ' + el[3];
            headerList.add(name);
        } else if (el[4]) {
            let name = el[0].split(' ')[0] + ' - ' + el[1] + ' - ' + el[2] + ' - ' + el[3] + ' - ' + el[4];
            headerList.add(name);
        }
    } else if (valuePeriod === 'Месяц') {
        let name = el[0].split(' ')[0] + ' - ' + el[1] + ' - ' + el[2] + ' - ' + el[3]  + ' - ' + el[4];
        headerList.add(name);
    }
})


// пройдем по рядам и колонкам и соберем агрегированные значения
headerList = Array.from(headerList);


headerList.map(el => {
    for (let key in fullData) {
        let sumFact = 0;
        let sumPlan = 0;
        let sumOst = 0;
        
        let sumValue = 0;
        
        for (let data in fullData[key]) {
            if (data.split(' - ')[0] === 'Ост') {
                sumOst += fullData[key][data];
            } else if (data.split(' - ')[0] === 'Факт') {
                sumFact += fullData[key][data];
            } else if (data.split(' - ')[0] === 'План') {
                sumPlan += fullData[key][data];
            }
            
            
            if (valuePeriod !== 'Месяц' && valuePeriod !== 'Квартал') {
                if (data.split(' - ')[0] === el.split(' - ')[0] &&  data.split(' - ')[1] === el.split(' - ')[1] && data.split(' - ')[2] === el.split(' - ')[2] && !el.split(' - ')[3]) {
                    sumValue += fullData[key][data];
                } else if (data.split(' - ')[0] === el.split(' - ')[0] &&  data.split(' - ')[1] === el.split(' - ')[1] && data.split(' - ')[2] === el.split(' - ')[2] && data.split(' - ')[3] === el.split(' - ')[3]) {
                    sumValue += fullData[key][data];
                }
            } else if (valuePeriod === 'Квартал') {
                if (data.split(' - ')[0] === el.split(' - ')[0] &&  data.split(' - ')[1] === el.split(' - ')[1] && data.split(' - ')[2] === el.split(' - ')[2] && data.split(' - ')[3] === el.split(' - ')[3] && !el.split(' - ')[4]) {
                    sumValue += fullData[key][data];
                } else if (data.split(' - ')[0] === el.split(' - ')[0] &&  data.split(' - ')[1] === el.split(' - ')[1] && data.split(' - ')[2] === el.split(' - ')[2] && data.split(' - ')[3] === el.split(' - ')[3] && data.split(' - ')[4] === el.split(' - ')[4]) {
                    sumValue += fullData[key][data];
                }
            } else {
                if (data.split(' - ')[0] === el.split(' - ')[0] &&  data.split(' - ')[1] === el.split(' - ')[1] && data.split(' - ')[2] === el.split(' - ')[2] && data.split(' - ')[3] === el.split(' - ')[3] && data.split(' - ')[4] === el.split(' - ')[4]) {
                    sumValue += fullData[key][data];
                }
            }
        }
        
        sumData[key][el] = sumValue;
        sumData[key]['sumFact'] = sumFact;
        sumData[key]['sumPlan'] = sumPlan;
        sumData[key]['sumOst'] = sumOst;
        
    }
})



// отсортируем полученный массив агрегированных данных, чтобы первыми шли Проект ГОЗ и Проект КОМ
rowsList.sort((a, b) => {
    return Number(a.split(' ')[1]) - Number(b.split(' ')[1])
})


console.log('test rowsList', rowsList)

// убираем "ост" из детализации
headerList = headerList.map(el => {
    if (el.split(' ')[0] !== 'Ост') {
        return el
    }
})

console.log('test headerList', headerList)

headerList = headerList.filter(el => el)

// если нужно, нумеруем первую неделю января как 52 неделю
if (valuePeriod === 'Месяц' && headerList[0].split(' - ')[3] === 'Январь') {
    if (headerList[headerList.length - 1].split(' - ')[4] === '52' && headerList[headerList.length - 2].split(' - ')[4]) {
        headerList.unshift(headerList[headerList.length - 1]);
        headerList.unshift(headerList[headerList.length - 2]);
        
        headerList.pop();
        headerList.pop();
    }
} 

// * * *
// создание DOM-дерева

// для удобства сохраняем основные элементы виджета как константы
const mainWidget = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body');
const mainID = '#widget-' + w.general.renderTo;

const widgetWrapper = document.createElement('div');
widgetWrapper.classList.add('widget__wrapper');

widgetWrapper.innerHTML = ``

// описываем стили элементов
const widgetStyle = document.createElement('style');
widgetStyle.innerHTML =`

/* прокрутка окна таблицы */
${mainID} .widget__wrapper {
    height: 100%;
    overflow-y: scroll;
    overflow-x: auto;
    user-select: none;
}


/* закрепление заголовка */
${mainID} .table-header {
    display: flex;
    height: 100px;
    position: sticky;
    top: 0;
    background: #F0F0F0;
}

/* форматирование заголовков таблицы */

${mainID} .table-header .header-col {
    border: 1px solid #cdcdcd;
    min-width: 150px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

${mainID} .main-header {
    display: flex;
    flex-grow: 1;
}

${mainID} .sub-header-row {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #cdcdcd;
}

${mainID} .row-child {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #cdcdcd;
}

/* все, кроме последней строки */
${mainID} .row-child .col-child:not(:last-child) {
    border-right: 1px solid #cdcdcd;
}

${mainID} .header-col.current-month .sub-header {
    width: 33.3%;
}

${mainID} .header-col.current-month__week .sub-header {
    width: 20%;
}

${mainID} .header-col.current-month .sub-header:not(:last-child),
${mainID} .header-col.current-month__week .sub-header:not(:last-child) {
    border-right: 1px solid #cdcdcd;
}

${mainID} .header-col.current-month .sub-header div:first-child,
${mainID} .header-col.current-month__week .sub-header div:first-child {
    padding: 5px;
    text-align: center;
}

${mainID} .col-child {
    padding: 5px;
    text-align: center;
    width: 50%;
}

${mainID} .table-row {
    display: flex;
}

${mainID} .table-row div {
    border: 1px solid #cdcdcd;
    padding: 5px 10px;
    min-width: 75px;
}


/* настройка ширины ячеек */
${mainID} .table-header .header-col {
    width: 11%;
}

${mainID} .table-header .header-col.current-month {
    width: 33%;
}

${mainID} .table-header .header-col.current-month__week {
    width: 55.5%;
}

${mainID} .table-header > div:first-child,
${mainID} .table-row div:first-child {
    width: ${valuePeriod === 'Квартал' ? '10%' : '13%'};
    min-width: 150px;
}

${mainID} .table-header .header-col.total-col {
    width: 21%;
}

${mainID} .table-row div {
    width: 5.5%;
}

${mainID} .table-row .total-col {
    width: 7%;
}
`

// добавляем стили и обертку для таблицы

mainWidget.appendChild(widgetWrapper);
mainWidget.appendChild(widgetStyle);

// * * *
// отрисовываем таблицу

// добавление шапки в таблицу (с колонкой "Итого")

if (valuePeriod === 'Год' || valuePeriod === 'С начала года') {
    let listQuarters = new Set();
    let listMonth = new Set();
    
    listQuarters.add('');
    headerList.map(el => {
        listQuarters.add(el.split(' - ')[2])
        
        if (el.split(' - ')[3]) {
            listMonth.add(el.split(' - ')[2] + ' - ' + el.split(' - ')[3])
        }
    })
    listQuarters.add('Итого');
    
    listQuarters = Array.from(listQuarters);
    listMonth = Array.from(listMonth);
    
    
    addHeaderHTML(listQuarters, listMonth)
} else if (valuePeriod === 'Квартал') {
    let mainList = new Set();
    let listWeek = new Set();
    
    mainList.add('');
    headerList.map(el => {
        mainList.add(el.split(' - ')[3]);
        
        if (el.split(' - ')[4]) {
            listWeek.add(el.split(' - ')[3] + ' - ' + el.split(' - ')[4])
        }
    })
    mainList.add('Итого');
    
    mainList = Array.from(mainList);
    listWeek = Array.from(listWeek);
    
    addHeaderHTML(mainList, listWeek)
}  else if (valuePeriod === 'Месяц') {
    let mainList = new Set();
    
    mainList.add('');
    headerList.map(el => {
        mainList.add(el.split(' - ')[3] + ' ' + el.split(' - ')[4]);
    })
    // формируем колонку "Итого"
    mainList.add('Итого');
    
    mainList = Array.from(mainList);
    
    addHeaderHTML(mainList)
}

function addHeaderHTML(header, headerChild) {
    let tableHeader = document.createElement('div');
    tableHeader.classList.add('table-header');
    
    if (valuePeriod === 'Год' || valuePeriod === 'С начала года') {
        header.map(el => {
            tableHeader.innerHTML += `
                <div class="header-col ${Number(el) === getQuarter ? 'current-month' : el === '' ? 'null-col' : el === 'Итого' ? 'total-col' : ''}"><div class="main-header">${el === 'Итого' || el === '' ? el : el + ' кв'}</div></div>
            `
        })
    } else if (valuePeriod === 'Квартал') {
        header.map(el => {
            tableHeader.innerHTML += `
                <div class="header-col ${el === listMonth[getMonth] ? 'current-month__week' : el === '' ? 'null-col' : el === 'Итого' ? 'total-col' : ''}"><div class="main-header">${el}</div></div>
            `
        })
    } else {
        header.map(el => {
            tableHeader.innerHTML += `
                <div class="header-col ${el === '' ? 'null-col' : el === 'Итого' ? 'total-col' : ''}"><div class="main-header">${el}</div></div>
            `
        })
    }
    
    // добавление внутренних месяцев в квартал
    if (headerChild) {
        tableHeader.querySelectorAll('.header-col').forEach(el => {
            let subtitleRow = document.createElement('div');
            subtitleRow.classList.add('sub-header-row');
            
            headerChild.map(_el => {
                subtitleRow.innerHTML += `<div class="sub-header"><div>${_el.split(' - ')[1]}</div></div>`;
            })
            
            if (el.classList.contains('current-month') || el.classList.contains('current-month__week')) {
                el.appendChild(subtitleRow);
            }
        })
    }
    
    
    tableHeader.querySelectorAll('.header-col').forEach(el => {
        if (el.classList.contains('current-month') || el.classList.contains('current-month__week')) {
            el.querySelectorAll('.sub-header-row .sub-header').forEach(_el => {
                let childRow = document.createElement('div');
                childRow.classList.add('row-child');
                childRow.innerHTML += `
                    <div class="col-child">План</div>
                    <div class="col-child">Факт</div>
                `
                
                _el.appendChild(childRow);
            }) 
        } else if (el.classList.contains('total-col')) {
            let childRow = document.createElement('div');
            childRow.classList.add('row-child');
                
            childRow.innerHTML += `
                <div class="col-child">План</div>
                <div class="col-child">Факт</div>
                <div class="col-child">Ост</div>
            `
            
            el.appendChild(childRow);
        } else if (!el.classList.contains('null-col')) {
            let childRow = document.createElement('div');
            childRow.classList.add('row-child');
            
            childRow.innerHTML += `
                <div class="col-child">План</div>
                <div class="col-child">Факт</div>
            `
            
            el.appendChild(childRow);
        }
    })
    
    widgetWrapper.appendChild(tableHeader);
}



// * * *
// добавление строк в таблицу

rowsList.map(rowName => {
    for (let key in sumData) {
        if (rowName === key) {
            let tempRow = [];
            let totalRow = [];
            
            headerList.map(el => {
                for (let _el in sumData[key]) {
                    if (el === _el) {
                        tempRow.push(sumData[key][_el]);
                        
                        totalRow = [sumData[key]['sumPlan'], sumData[key]['sumFact'], sumData[key]['sumOst']]
                    }
                }
            })
            
            
            addRowHTML(key, tempRow, totalRow)
        }
    }
})

// функция для добавления рядов в таблицу

function addRowHTML(rowTitle, row, totalSum) {
    let tableRow = document.createElement('div');
    tableRow.classList.add('table-row');
    
    tableRow.innerHTML = `
        <div>${rowTitle}</div>
    `
    
    row.map(el => {
        tableRow.innerHTML += `
            <div>${el}</div>
        `
    })
    
    totalSum.map(el => {
        tableRow.innerHTML += `
            <div class="total-col">${el}</div>
        `
    })
    
    widgetWrapper.appendChild(tableRow);
}


// Returns the ISO week of the date.
function getWeek(data) {
  var date = new Date(data.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

