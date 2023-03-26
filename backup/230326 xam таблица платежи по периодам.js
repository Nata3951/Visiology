// GuId фильтра "Дата" 
const dateFilterGuid = 'bafa25e32e8e476394c78c7a627dc46d'   
// GuId переключателя гранулярности
const granularityBtnGuid = '9eea50f481b84a7c8f8526eaea42da13'
 
// GuId виджета для обновления данного
const widgetRefreshGuId = 'bab8aca36df14bc8a9f7c56438f817a6'

// В какой столбец будет вставляться Sparkline
const sparklineSetColumn = 0
// Сколько точек будет в Sparkline
const sparklinePointLength = 5
// Массив из двух элементов. Цвета для "План" и "Факт" в Sparkline
const sparklineColorsArr = [ '#1c4680', '#ba68c8' ]
// Цвет выделения строки таблицы (при выборе как фильтра)
const colorSelectedRow = '#E1E1E1'


 
// Слушатели 
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + '_dateListeneer', widgetGuid: dateFilterGuid }, refresh)
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + '_granularityListeneer', widgetGuid: granularityBtnGuid }, refresh) 

function refresh() {
    visApi().setFilterSelectedValues(widgetRefreshGuId, [['Сброс значения']], function (response) {
        visApi().setFilterSelectedValues(widgetRefreshGuId, [], function (response) {}); 
    });
}




// Создаём дубликат массива 
const wDup = JSON.parse(JSON.stringify(w))

// Массив неповторяющихся имён rowNames
let rowsNamesArr = wDup.data.records.map(el => el.rowNames[0])
rowsNamesArr = rowsNamesArr.filter(function(item, pos) {
    return rowsNamesArr.indexOf(item) == pos;
})

// Самая большая величина периода
const lastPeriod = Math.max( ... w.data.records.map(el => Number(el.rowNames[4])) )
   
// Создаём новый Records (на данный момент searchIndexEl - последняя неделя для каждого показателя)
const dateValue = visApi().getSelectedValues(dateFilterGuid).length ? visApi().getSelectedValues(dateFilterGuid)[0] : []
const periodValue = visApi().getSelectedValues(granularityBtnGuid).length ? visApi().getSelectedValues(granularityBtnGuid)[0][0] : ''
if (!periodValue || !dateValue.length) {
    setTimeout(() => {
        refresh()
    }, 500)
}

const newRecords = rowsNamesArr.map((el, recIndex) => {
    const obj = {
        "column 0": 0,
        "column 1": 0,
        "column 2": 0,
        "column 3": 0,
        "column 4": 0,
        recid: recIndex,
        rowNames: [el]
    }
    
    const filteredRecords = w.data.records.filter(elFil => {
        const oneSearchPar = elFil.rowNames[0] === el
        let twoSearchParam = false
        if (periodValue === 'year') {
            twoSearchParam = elFil.rowNames[1] === dateValue[0]
        }
        if (periodValue === 'quartal') {
            twoSearchParam = elFil.rowNames[1] === dateValue[0] && elFil.rowNames[2] === dateValue[1]
        }
        if (periodValue === 'month') {
            twoSearchParam = elFil.rowNames[1] === dateValue[0] && elFil.rowNames[2] === dateValue[1] && elFil.rowNames[3] === dateValue[2]
        }
        if (periodValue === 'week') {
            twoSearchParam = elFil.rowNames[1] === dateValue[0] && elFil.rowNames[4] === dateValue[3]
        }
        return oneSearchPar && twoSearchParam
    })

    filteredRecords.forEach(filRecEl => {
        obj["column 0"] += filRecEl["column 0"]
        obj["column 1"] += filRecEl["column 1"]
        obj["column 2"] += filRecEl["column 2"]
        if (periodValue === 'week') {
            obj["column 3"] += filRecEl["column 3"] 
        } else { 
            obj["column 3"] = filRecEl["column 3"]    
        }
        obj["column 4"] += filRecEl["column 4"]
    })
    
    return obj
})
 
// Выставляем правильные rowNames
wDup.data.records = newRecords
wDup.data.rowNames = wDup.data.records.map(el => [el.rowNames])

// Удаляем лишние столбцы
delete wDup.data.columns[1]
delete wDup.data.columns[2]
delete wDup.data.columns[3]
delete wDup.data.columns[4]

TableRender({
    table: w.general,
    style: w.style,
    columns: wDup.data.columns,
    records: wDup.data.records,
    editMask: wDup.data.editMask,
    rowNames: wDup.data.rowNames,
    colNames: wDup.data.colNames,
    showToolbar: false
});

// Добавляем доп.столбец в заголовок
let colSparkLineName = ''
if (periodValue === 'year') {
    colSparkLineName = 'годам'
}
if (periodValue === 'quartal') {
    colSparkLineName = 'кварталам'
}
if (periodValue === 'month') {
    colSparkLineName = 'месяцам'
}
if (periodValue === 'week') {
    colSparkLineName = 'неделям'
}

const thHeader = document.createElement('th');
thHeader.innerHTML = `<span>По ${colSparkLineName}</br> <span style="color:#1c4680"> ● </span> план,<span style="color:#ba68c8"> ● </span> факт </span>`;
thHeader.style.font = 'bold 12px sans-serif ';
thHeader.style.background = '#f6f6f6';
thHeader.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
thHeader.style.height = '50px';
document.querySelectorAll('#widget-' + w.general.renderTo + ' thead th')[sparklineSetColumn].after(thHeader);

// Добавляем Sparkline в каждуюстроку как доп столбец
const rowsArr = document.querySelectorAll('#widget-'+ w.general.renderTo + ' table tbody tr')
rowsArr.forEach((el,index) => {
    const chartId = `sparkline-${index}-${w.general.renderTo}`
    const tdBody = document.createElement('td')
    tdBody.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)'
    tdBody.innerHTML = `<div id="${chartId}"style="background: #fff;"></div>`
    el.querySelectorAll('td')[sparklineSetColumn].after(tdBody)
    
    const rowName = el.firstChild.textContent
    const filteredRecords = w.data.records.filter(elFil => elFil.rowNames[0] === rowName)
    
    const chartSeries = [
        {name: 'План', data: [], color: sparklineColorsArr[0]}, 
        {name: 'Факт', data: [], color: sparklineColorsArr[1]} 
    ] 
    
    
    for (let i=0; i<sparklinePointLength; i++) {
        const dateFilteredRecords = filteredRecords.filter(elFil => {
            let twoSearchParam = false
            if (periodValue === 'year') {
                let year = Number(dateValue[0]) - i
                twoSearchParam = elFil.rowNames[1] === year.toString()
            }
            if (periodValue === 'quartal') {
                let indexQuartal = i
                let quartal = Number(dateValue[1]) - indexQuartal
                let yearQuartal = dateValue[0]
                if ((Number(dateValue[1]) - i) < 1) {
                    indexQuartal = i - Number(dateValue[1])
                    quartal = 4 - indexQuartal
                    yearQuartal = (Number(dateValue[0]) - 1).toString()
                }    
                twoSearchParam = elFil.rowNames[1] === yearQuartal && elFil.rowNames[2] === quartal.toString()
            }
            if (periodValue === 'month') {
                let indexMonth = i
                let month = Number(dateValue[2]) - indexMonth
                let yearMonth = dateValue[0]
                if ((Number(dateValue[2]) - i) < 1) {
                    indexMonth = i - Number(dateValue[2])
                    month = 12 - indexMonth
                    yearMonth = (Number(dateValue[0]) - 1).toString()
                }     
                twoSearchParam = elFil.rowNames[1] === yearMonth && elFil.rowNames[3] === month.toString()
            }
            if (periodValue === 'week') {
                let indexWeek = i
                let week = Number(dateValue[3]) - indexWeek
                let yearWeek = dateValue[0]
                if ((Number(dateValue[3]) - i) < 1) {
                    indexWeek = i - Number(dateValue[3])
                    week = 52 - indexWeek
                    yearWeek = (Number(dateValue[0]) - 1).toString()
                }   
                twoSearchParam = elFil.rowNames[1] === yearWeek && elFil.rowNames[4] === week.toString()
            }
            return twoSearchParam
        })
        const summRecord = {}
        dateFilteredRecords.forEach(record => {
            for (let key in record) {
              if (key.includes('column')) {
                  summRecord[key] = (summRecord[key] || 0) + record[key]
              }
            }    
        })

        chartSeries[0].data.unshift(summRecord['column 0'] || 0)
        chartSeries[1].data.unshift(summRecord['column 1'] || 0)
    } 
    
    
    Highcharts.chart(chartId, {
        chart:{
            height: 70
        },
        legend: {
            enabled: false
        },
        yAxis: {
            visible: false
        },
        xAxis: {
            visible: false
        },
        tooltip: {
            formatter: function(ev) {
                const str = `${this.color === sparklineColorsArr[0] ? 'План' : 'Факт'}: ${this.point.y.toFixed(1)}`
                return str
            }
        },
        series: chartSeries, 
      });
})

// Добавляем своднуюстроку
function summColumnRecordsFun(col) {
    let summ = 0
    wDup.data.records.forEach(el => summ += el['column ' + col])
    return summ.toFixed(1)
}
const trSummary = document.createElement('tr')
const styleTdStr = `font-weight: bold;line-height: 50px; padding: 5px; word-wrap: break-word;background-color: rgba(255,255,255,1);border: 1px solid rgba(231,231,231,1);color: rgba(0,0,0,1);font-family: Arial;font-size: 15px;`
trSummary.style.borderBottom = '2px solid silver'
trSummary.style.borderTop = '2px solid silver'
trSummary.innerHTML = `
    <td style="${styleTdStr}">Всего по ГТЛК</td>
    <td style="${styleTdStr}"></td>
    <td style="${styleTdStr}">${summColumnRecordsFun(0)}</td>
    <td style="${styleTdStr}">${summColumnRecordsFun(1)}</td> 
    <td style="${styleTdStr}">${(summColumnRecordsFun(1) - summColumnRecordsFun(0)).toFixed(1)}</td>
    <td style="${styleTdStr}">${summColumnRecordsFun(3)}</td>
    <td style="${styleTdStr}">${summColumnRecordsFun(4)}</td>
`
rowsArr[0].before(trSummary)

// Обрабатываем клик на строку, что бы выставлять значение фильтра в саму таблицу
visApi().setFilterSelectedValues(w.general.renderTo, [], function(response) {})
const tRowsArr = document.querySelectorAll('#widget-' + w.general.renderTo + ' .va-widget-body tbody tr[role="row"]')
tRowsArr.forEach(elem => {
    elem.onclick = function() {
        tRowsArr.forEach(row => row.querySelectorAll('td').forEach(el => el.style.background = ''))
        const value = this.querySelector('td').textContent
        const tableFilterValue = visApi().getSelectedValues(w.general.renderTo).length ? visApi().getSelectedValues(w.general.renderTo)[0][0] : ''
        if (value === tableFilterValue) {
            visApi().setFilterSelectedValues(w.general.renderTo, [], function(response) {})
        } else {
            visApi().setFilterSelectedValues(w.general.renderTo, [[value]], function(response) {})
        
            this.querySelectorAll('td').forEach(el => el.style.background = colorSelectedRow)   
        }
    }
}) 

// Функция для разделения числа на разряды
function numberWithSpaces(x) {
  const number = Number(x).toFixed(1) || 0
  let parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(",");
}
   
// Считаем столбец "Отклонение"; Выставляем разряды для чисел таблицы
document.querySelectorAll('#widget-' + w.general.renderTo + ' .va-widget-body tbody tr').forEach(row => {
    let plan = 0
    let fact = 0
    row.querySelectorAll('td').forEach((td, index) => {
        if (index === 2) {
            plan = Number(td.textContent)
        }
        if (index === 3) {
            fact = Number(td.textContent)
        }
        if (index === 4) {
            td.textContent = fact - plan
            td.style.borderRight = '2px solid silver'
        }
    })
    
    row.querySelectorAll('td').forEach((td, index) => {
        if (index > 1) {
            td.textContent = numberWithSpaces(td.textContent)
            td.style.textAlign = 'right'
        }
    })
})

// Убираем перенос строк в яцейках с заголовками
document.querySelectorAll('#widget-' + w.general.renderTo + ' .va-widget-body thead th span').forEach(el => el.style.wordBreak = 'normal')


//окрашиваем стрелочки сортировки 
document.querySelectorAll('.fa-sort').forEach(el=> el.style.color = w.colors[3]);

  
