// Создаём path контейнер для будущего кастомного маркера  
if (!Highcharts.SVGRenderer.prototype.symbols.dottedLine) {
    Highcharts.SVGRenderer.prototype.symbols.dottedLine = function (x, y, w, h) {
        return ['M', x + 0.5*w, y + 0.5*h];
    }; 
}
 
w.plotOptions.series.borderColor = 'transparent';
var s = 0
if (w.series[s]) {  
    w.series[s].zIndex = 99;
    w.series[s].type = "line";
    w.series[s].color = 'coral';
    w.series[s].marker = {
        symbol: 'dottedLine',
        lineColor: null,
        lineWidth: 3,
    } 
}
w.series[s].states = {
    hover: {enabled: false}
}

w.series.forEach(function(serie){
    serie.name = serie.name.replace("Сумма договора млрд. руб. -",""); 
});

w.series.forEach(function(serie){
    serie.name = serie.name.replace("соглас","Соглас"); 
});

w.series.forEach(function(serie){
    serie.name = serie.name.replace("заключено","Заключение"); 
});


// Дубликат объекта w
const Wdup = JSON.parse(JSON.stringify(w))

if (w.series[1] && Wdup.series[3]) {
    w.series[1] = Wdup.series[3]
}
if (w.series[2] && Wdup.series[1]) {
    w.series[2] = Wdup.series[1]
}
if (w.series[3] && Wdup.series[2]) {
    w.series[3] = Wdup.series[2]
}

// уплотняем колонки, чтобы влезали цифры
w.plotOptions.series.groupPadding = 0.05;

Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});
// Удаляем лишние элементы marker
document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body' + ' .highcharts-series-0').remove()

// Рисуем кастомный маркер изначально
const markerPaths = [...document.querySelectorAll('#widget-' + w.general.renderTo + ' .va-widget-body .highcharts-line-series .highcharts-point')]
markerPaths.pop()
const col = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body .highcharts-column-series .highcharts-point')
const colWidth = Number(col ? col.getAttribute('width') : 50)    
markerPaths.forEach(markerPath => {
    const posStr = markerPath.getAttribute('d').split(' ')
    const x = Number(posStr[1]) 
    const y = Number(posStr[2])
    
    let linePath = ''
      
    linePath += 'L ' + 
    (x - colWidth / 2 + colWidth / 4)
    + ' ' + y
    linePath += ' M ' + (x - colWidth / 8) + ' ' + y + ' ' + 'L ' + 
    (x + colWidth / 8)
    + ' ' + y
    linePath += ' M ' + (x + colWidth / 4) + ' ' + y + ' ' + 'L ' + 
    (x + colWidth / 2) 
    + ' ' + y
    
    const newMarkerPath = 'M' + (x - colWidth / 2 + 1) + ' ' + y + ' ' + linePath + ' z'
    markerPath.setAttribute('d', newMarkerPath)
})
 




    


