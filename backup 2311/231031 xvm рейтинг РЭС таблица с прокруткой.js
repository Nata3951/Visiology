// GuId фильтра "Показатель"
const filterGuId = '319df50ef0784f21b368ad42d5b2efdc'
// GuId таблицы "Динамика"
const dynamicTableGuId = 'a25337aab9244cab9af3c0a7e196b19c'

visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + '-filterListeneer', widgetGuid: filterGuId }, render)


function render() {
    
    // Дубликат
    const wDup = JSON.parse(JSON.stringify(w));
    // Значение фильтра "Показатель"
    const filterValue = visApi().getSelectedValues(filterGuId);
    
    
    // Обработка данных (START)
    wDup.data.rows.forEach((row, index) => {
        row.push(w.data.values[0][index].toFixed(2));
    });
    
    // console.log('test => w ', w );
    
    if (filterValue.length) {
        wDup.data.rows = wDup.data.rows.filter(row => {
            let isTrue = false
            filterValue.forEach(element => {
                element.forEach(el => {
                    if (!isTrue) {
                        isTrue = (row.indexOf(el) + 1) === 0 ? false : true    
                    } 
                }) 
            })
            return isTrue
        })
        wDup.data.rows = wDup.data.rows.filter(el => { 
            let isTrue = true
            let isBreak = false
            filterValue.forEach(filValue => {
                if (el.indexOf(filValue[0]) + 1 && !isBreak) {
                    if (filValue[1]) {
                        if (el.indexOf(filValue[1]) + 1) {
                            isTrue = true
                            isBreak = true
                        } else {
                            isTrue = false  
                        }
                    } else {
                        isTrue = true
                        isBreak = true
                    }
                }
            })
            return isTrue
        })    
    }

    
    const newData = []
    wDup.data.rows.forEach(row => { 
        // console.log(row)
        const target = newData.findIndex(el => (el[0] === row[0] && el[1] === row[1]))
        if (target + 1) {
            newData[target][2][row[3]] = row[5]
        } else {
            newData.push([row[0], row[1], {[row[3]]: row[5]}])
        }
    }) 
     
    
    const columnsNames = []
    let key
    for (key in newData[0][2]) {
      columnsNames.push(key)
    }
    // Обработка данных (END)
    
    
     
    // Рисуем таблицу
    const bodyWidget = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body')
    
    const cssDOM = `
        #widget-${w.general.renderTo} .va-widget-body {
            overflow: hidden;
        }
        #widget-${w.general.renderTo} .main {
            background: #252841;
            width: 100%; 
            height: 100%;
            overflow: auto;
        }
        #widget-${w.general.renderTo} .table {
            color: white;
            font-size: 13px;
            font-family: Open Sans;
        }
        #widget-${w.general.renderTo} .table-header {
            padding-left: 500px;
            width: 100%;
            height: 80px;
            display: flex;
        }
        #widget-${w.general.renderTo} .table-header-element {
            font-size: 12px;
            position: relative;
            z-index: 100;
            width: 250px;
            background: #363a5f;
            flex-shrink: 0;
            overflow: hidden;
        }
        #widget-${w.general.renderTo} .table-header-element-rows {
            display: flex;
            position: absolute;
            height: 80px;
        }
        #widget-${w.general.renderTo} .table-header-element-fixed {
            position: absolute;
            background: #363a5f;
            padding: 10px;
            border: 1px solid silver;
            width: 251px;
            height: 80px;
            z-index: 200;
        }
        #widget-${w.general.renderTo} .table-header-element-fixed.one {
            left: 0px;
        }
        #widget-${w.general.renderTo} .table-header-element-fixed.two {
            left: 250px;
        }
        #widget-${w.general.renderTo} .table-header-element-variable {
            width: 180px;
            padding: 10px;
            border: 1px solid silver;
        }
        #widget-${w.general.renderTo} .table-body {
            display: flex;
        }
        #widget-${w.general.renderTo} .table-body-columns-container {
            position: relative;
        }
        #widget-${w.general.renderTo} .table-body-row {
            display: flex;
            height: 42px;
        }
        #widget-${w.general.renderTo} .table-body-element {
            width: 250px;
            overflow: hidden;
            flex-shrink: 0;
            padding: 5px 10px;
            background: #252841;
            border: 1px solid silver;
        }
        #widget-${w.general.renderTo} .table-body-element-name {
            position: relative;
        }
        #widget-${w.general.renderTo} .table-body-element-value {
            width: 180px;
        }
    `
    
    bodyWidget.innerHTML = `
        <style>${cssDOM}</style>
        <div class="main">
            
            <div class="table">
        
                <div class="table-header">
                    <div class="table-header-element-fixed one">Филиал</div>
                    <div class="table-header-element-fixed two">РЭС</div>
                    <div class="table-header-element-rows">
                    ${
                        columnsNames.map(el => {
                            return `
                            <div class="table-header-element table-header-element-variable">${el}</div>
                            `
                        }).join('')
                    }
                    </div>
                </div>
                
                <div class="table-body">
                    <div class="table-body-columns-container">
                        ${newData.map(el => createCol(el)).join('')}
                    </div>
                    <div class="table-body-rows-container">
                        ${newData.map(el => createRow(el, columnsNames)).join('')}
                    </div>
                </div>
                
            </div>
            
        </div>
    `
     
    
}
render()



function createRow(data, columnsNames) {
    const strDOM = `
        <div class="table-body-row">
            ${
                columnsNames.map(el => {
                    return `
                    <div class="table-body-element table-body-element-value">${data[2][el]}</div>
                    `
                }).join('')
            }
        </div>
    `
    return strDOM
}

function createCol(data) {
    const strDOM = `
        <div class="table-body-row">
            <div class="table-body-element table-body-element-name one">${data[0]}</div>
            <div class="table-body-element table-body-element-name two">${data[1]}</div>
        </div>
    `
    return strDOM
}

 
// Скролл
window.createListeneerScrollFirstTable = function() {
const columnsContainer = document.querySelector(`#widget-${w.general.renderTo} .table-body-columns-container`)
const headerRows = document.querySelector(`#widget-${w.general.renderTo} .table-header-element-rows`)
const dynamicTableColumnsContainer = document.querySelector(`#widget-${dynamicTableGuId} .table-body-columns-container`)
const dynamicTableHeaderRows = document.querySelector(`#widget-${dynamicTableGuId} .table-header-element-rows`)
const dynamicTableMain = document.querySelector(`#widget-${dynamicTableGuId} .main`)
document.querySelector(`#widget-${w.general.renderTo} .main`).onscroll = function() {
columnsContainer.style.transform = `translateX(${this.scrollLeft}px)`
headerRows.style.transform = `translateX(-${this.scrollLeft}px)`
dynamicTableMain.scrollTop = this.scrollTop
dynamicTableColumnsContainer.style.transform = `translateX(${this.scrollLeft}px)`
dynamicTableHeaderRows.style.transform = `translateX(-${this.scrollLeft}px)`
dynamicTableMain.scrollLeft = this.scrollLeft
}
}
    






