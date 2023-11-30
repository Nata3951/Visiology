console.log(w);

w.tooltip.shared = true;
w.tooltip.crosshair = true;
w.yAxis.endOnTick = false;
w.yAxis.max = 9;
w.plotOptions.column = {
    pointWidth: 40
}

var lineHeight = 120;

$('#' + w.general.renderTo).css({
    'overflow-y': 'scroll',
    'overflow-x': 'hidden'
})

w.series.forEach((serie, index) => {
    $('<div>', {
        id: 'div-' + index
    }).css({
        height: lineHeight + 'px',
    }).appendTo($('#' + w.general.renderTo))
    
    $('<div>', {
        id: 'name-' + index
    }).css({
        height: lineHeight + 'px',
        width: '10%',
        display: 'inline-block',
        'vertical-align': 'middle',
        'font-family': 'Open Sans',
        'padding-top': '10px'
    }).html(serie.name.split(' - ')[1].split(' ').join('<br>')).appendTo($('#' + 'div-' + index))
    
    $('<div>', {
        id: 'chart-' + index
    }).css({
        height: lineHeight + 'px',
        width: '90%',
        display: 'inline-block',
        'vertical-align': 'middle',
    }).appendTo($('#' + 'div-' + index))
    
    createChart(serie, 'chart-' + index);
    
})

function createChart (data, renderDiv) {
    let secondSerie = {
        name: 'Не списано, ч',
        data: []
    };
    
    data.color = w.colors[0]
    data.name = data.name.split(' - ')[0]
    
    secondSerie.data = data.data.map((elem) => {
        return {
            y: elem.names[3] == "Рабочий" ? (elem.y < 8 ? 8 - elem.y : null) : null,
            name: elem.name,
            names: elem.name.split(' - '),
            color: elem.y >= 6.5 ? w.colors[1] : w.colors[2] 
        }
    })
    
    Highcharts.chart({
        chart: {...w.general, renderTo: renderDiv},
        xAxis: w.xAxis,
        yAxis: w.yAxis,
        plotOptions: w.plotOptions,
        series: [secondSerie, data],
        drilldown: w.drilldown,
        legend: w.legend,
        tooltip: w.tooltip
    });    
    }
