
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


Highcharts.chart({
    chart: {
        renderTo: w.general.renderTo
    },
    legend: {
        enabled: true,
        verticalAlign: 'top',
        margin : 15,
    },
    xAxis: {
        categories: w.data.rows,
        gridLineColor: line_color,
        gridLineWidth: 1,
    },

    tooltip: {
        shared: true
    },
    
    plotOptions : {
         
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
   //  ...
        {
            name: 'B+',
            type: 'spline',
            color: yellow,
            data: get_forecast('B'),
            pointPlacement : -0.2,
            marker: {
            lineColor: yellow_dark,
          },

//  ----------------------------------------------------------------------------
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
