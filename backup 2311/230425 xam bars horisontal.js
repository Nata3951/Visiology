// Дубликат для индикаторов
const wDupIndicator = JSON.parse(JSON.stringify(w))

w.plotOptions.series.turboThreshold = 3000;

// GuId фильтра "Дата"
const dateFilterGuid = 'bafa25e32e8e476394c78c7a627dc46d'   
// GuId переключателя гранулярности
const granularityBtnGuid = '9eea50f481b84a7c8f8526eaea42da13'

// GuId виджета для обновления данного
const widgetRefreshGuId = 'bab8aca36df14bc8a9f7c56438f817a6'



// Прототип - ограничение (limit) для строк
String.prototype.limit = function( limit, userParams) {
    var text = this
      , options = {
            ending: '...'  // что дописать после обрыва
          , trim: true     // обрезать пробелы в начале/конце?
          , words: true    // уважать ли целостность слов? 
        }
      , prop
      , lastSpace
      , processed = false
    ;

    //  проверить limit, без него целого положительного никак
    if( limit !== parseInt(limit)  ||  limit <= 0) return this;

    // применить userParams
    if( typeof userParams == 'object') {
        for (prop in userParams) {
            if (userParams.hasOwnProperty.call(userParams, prop)) {
                options[prop] = userParams[prop];
            }
        }
    }

    // убрать пробелы в начале /конце
    if( options.trim) text = text.trim();

    if( text.length <= limit) return text;    // по длине вписываемся и так

    text = text.slice( 0, limit); // тупо отрезать по лимиту
    lastSpace = text.lastIndexOf(" ");
    if( options.words  &&  lastSpace > 0) {  // урезать ещё до границы целого слова
        text = text.substr(0, lastSpace);
    }
    return text + options.ending;
}

const arrows = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="50" height="50" x="0" y="0" viewBox="0 0 512.016 512.016" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
<path style="" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" fill="black" data-original="#f44336" class=""></path>

</g>
</svg>`


// Слушатели 
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + '_dateListeneer', widgetGuid: dateFilterGuid }, refresh)
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + '_granularityListeneer', widgetGuid: granularityBtnGuid }, refresh) 

function refresh() {
    visApi().setFilterSelectedValues(widgetRefreshGuId, [['Сброс значения']], function (response) {
        visApi().setFilterSelectedValues(widgetRefreshGuId, [], function (response) {}); 
    });
}


// Выставляем подписи сверху
w.xAxis.labels.align = 'left'
w.xAxis.labels.x = 0
w.xAxis.labels.y = -20
w.xAxis.labels.style.whiteSpace = 'nowrap'

const dateValue = visApi().getSelectedValues(dateFilterGuid).length ? visApi().getSelectedValues(dateFilterGuid)[0] : []
const periodValue = visApi().getSelectedValues(granularityBtnGuid).length ? visApi().getSelectedValues(granularityBtnGuid)[0][0] : ''
if (!periodValue || !dateValue.length) {
    setTimeout(() => {
        refresh()
    }, 500)
}
 
// Убираем пустые показатели и отфильтровываем их
w.series[0].data.forEach((el, index) => {

        if(periodValue==="week") {
            
         if (!el.y && !w.series[1].data[index].y) {
                delete w.series[0].data[index]
                delete w.series[1].data[index] 
                delete w.series[2].data[index]
            }   
        }
})
w.series.forEach(serie => {
    serie.data = serie.data.filter(n => n)
})


// убираем тултип
w.tooltip.enabled = false;


// Сортируем данные гистограммы по гранулярности и периоду
const wDup = JSON.parse(JSON.stringify(w))

wDup.series[0].data.forEach((elSerie, index) => {
    if (periodValue === 'year') {
        if (elSerie.names[1] !== dateValue[0]) {
            delete wDup.series[0].data[index]
            delete wDup.series[1].data[index]
            delete wDup.series[2].data[index] 
        }
    }
    if (periodValue === 'quartal') {
        if (elSerie.names[1] !== dateValue[0] || elSerie.names[2] !== dateValue[1]) {
            delete wDup.series[0].data[index]
            delete wDup.series[1].data[index]
            delete wDup.series[2].data[index]
        }
    } 
    if (periodValue === 'month') {
        if (elSerie.names[1] !== dateValue[0] || elSerie.names[2] !== dateValue[1] || elSerie.names[3] !== dateValue[2]) {
            delete wDup.series[0].data[index]
            delete wDup.series[1].data[index]
            delete wDup.series[2].data[index]
        }
    } 
    if (periodValue === 'week') {
        if (elSerie.names[1] !== dateValue[0] || elSerie.names[2] !== dateValue[1] || elSerie.names[4] !== dateValue[3]) {
            delete wDup.series[0].data[index]
            delete wDup.series[1].data[index]
            delete wDup.series[2].data[index]
        }  
    } 
})
wDup.series.forEach(serie => {
    serie.data = serie.data.filter(n => n) 
})  
w.xAxis.categories = wDup.series[0].data.map(el => el.name)



// Убираем из отрисовки последний столбец, заранее сохранив его для отрисовки индикаторов
let indicatorValuesArr = JSON.parse(JSON.stringify(wDup.series[2].data)) 
indicatorValuesArr.forEach(el => el.name = el.name.split(' - ')[0])
wDup.series = wDup.series.slice(0, 2)  

// Обновляем Categories и Выставляем индикаторы
w.xAxis.categories = indicatorValuesArr.map(el => el.name)
w.xAxis.labels.useHTML = true
w.xAxis.labels.formatter = function() {
    const indicatorFiltered = indicatorValuesArr.filter(el => el.name === this.value.toString()) 
    sortFunction(4, indicatorFiltered)
    sortFunction(3, indicatorFiltered)
    sortFunction(2, indicatorFiltered)
    sortFunction(1, indicatorFiltered) 
    const indicatorValue = indicatorFiltered[indicatorFiltered.length - 1] ? indicatorFiltered[indicatorFiltered.length - 1].y : 0
    const styleDOM = `
        position: relative;
    `
    const styleIndicator = `
        position: absolute;
        top: 0px;
        left: 380px;
        width: 12px;
        height: 12px;
        border-radius: 1px;
        z-index: 200;
    `
    const strDOM = `
        <div style="${styleDOM}">
            <span>${this.value.toString().split(' - ')[0].limit(40)}</span> 
            <div style="${styleIndicator}; background: ${indicatorValue ? 'tomato' : '#83C994'}"></div>
        </div>
    `;
    return strDOM;
};



// Складываем одинаковых клиентов
wDup.series.forEach(serie => {
    serie.data.forEach(el => el.name = el.name.split(' - ')[0])
})

const uniqArrSeriesZero = JSON.parse(JSON.stringify( wDup.series[0].data.filter((item, index) => {
    return wDup.series[0].data.findIndex(el => el.name === item.name) === index
}) ))
uniqArrSeriesZero.forEach(el => el.y = 0)

const uniqArrSeriesOne = JSON.parse(JSON.stringify( wDup.series[1].data.filter((item, index) => {
    return wDup.series[1].data.findIndex(el => el.name === item.name) === index
}) )) 
uniqArrSeriesOne.forEach(el => el.y = 0)

wDup.series[0].data.forEach(el => {
    const targetIndex = uniqArrSeriesZero.findIndex(elFind => elFind.name === el.name)
    uniqArrSeriesZero[targetIndex].y += el.y
})
wDup.series[1].data.forEach(el => {
    const targetIndex = uniqArrSeriesOne.findIndex(elFind => elFind.name === el.name)
    uniqArrSeriesOne[targetIndex].y += el.y
})

wDup.series[0].data = uniqArrSeriesZero
wDup.series[1].data = uniqArrSeriesOne
w.xAxis.categories = wDup.series[0].data.map(el => el.name)
 

// Сортируев по убыванию
wDup.series[0].data.sort((a, b) => b.y - a.y)
wDup.series[1].data.sort((a, b) => b.y - a.y) 
w.xAxis.categories = wDup.series[0].data.map(el => el.name)
let sortArr = [];
wDup.series[0].data.forEach(planEl =>{
    if(planEl.y === 0){
        sortArr.push(planEl.name)
    }
})

let factSortArr = []
factSortArr = wDup.series[1].data.filter(faktEl => {
    if(sortArr.includes(faktEl.name)){
        return faktEl
    }
})
factSortArr.sort((a,b)=>{
    return parseFloat(b.y) - parseFloat(a.y)
})
sortArr = []; 
factSortArr.forEach(el=> sortArr.push(el.name));
let zeroPlan = wDup.series[0].data.findIndex(el => el.y === 0); //7 
w.xAxis.categories.splice(zeroPlan, sortArr.length, ...sortArr)
   
// Выставляем высоту
var h = $('#' + w.general.renderTo).height();
w.general.height = w.xAxis.categories.length * 60 + 60;    
         
const chart = Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: wDup.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});
const svgContainer = document.createElement('div')
svgContainer.classList.add(`svg-container-${w.general.renderTo}`)

svgContainer.innerHTML = `
    <style>
        .svg-container-${w.general.renderTo} {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 13px;
            right: 100px;
        }
    </style>
    ${arrows}
`  

// Дубликат для новой сортировки
const wDupTwo = JSON.parse(JSON.stringify(wDup))
wDupTwo.series[1].data.sort((a, b) => b.y - a.y) 
const categoriesDup = wDupTwo.series[1].data.map(el => el.name)

let sortNum = 1  
const arrow = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body').appendChild(svgContainer) 
arrow.onclick = () => {
    let categories
    if (sortNum) {
        categories = categoriesDup
        sortNum = 0
    } else {
        categories = w.xAxis.categories
        sortNum = 1
    }
    chart.update({
        xAxis: {
            categories: categories
        },
    })
    legendSet();
}

// Устанавливаем скролл, если он необходим
$('#' + w.general.renderTo).find('.highcharts-container').css({
'overflow-y': 'auto'
 }).height(h);
 

//закрепляем легенду
legendSet()
function legendSet(){
let widget = document.querySelector(`[id = '${w.general.renderTo}']`);
let legendHeader = $('.highcharts-legend .highcharts-legend-box', widget); 
legendHeader
.attr({
    'fill':'inerhit',
    'width':'415',
    'height':'35',
});
widget.querySelector('.highcharts-container').querySelectorAll('span > div').forEach(el => el.style.zIndex = '-1')
$('.highcharts-legend', widget).attr({'fill': 'white'})
widget.querySelector('.highcharts-container').addEventListener("scroll", function(evt) {
  widget.querySelector('.highcharts-legend').setAttribute("transform",`translate(10,${ widget.querySelector('.highcharts-container').scrollTop - 1})`);
    if(widget.querySelector('.highcharts-container').scrollTop === 0){
        widget.querySelector('.highcharts-legend').setAttribute("transform",`translate(10,10)`)
    }
});
    
}
    
 
// функция сортировки    
function sortFunction(numCol, filValues) {
    filValues.sort((a, b) => {
        return Number(a.names[numCol]) - Number(b.names[numCol])
    })
}
