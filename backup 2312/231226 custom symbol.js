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
