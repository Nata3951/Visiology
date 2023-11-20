const data = [];
let selected;

for (let i = 0; i < w.data.rows.length; i++) {
    const bubble = {};
    bubble.name = w.data.rows[i][0];
    bubble.x = w.data.values[0][i] * 1;
    bubble.y = w.data.values[1][i] * 1;
    bubble.z = w.data.values[2][i] * 1;
    bubble.xName = w.data.cols[0][0];
    bubble.yName = w.data.cols[1][0];
    bubble.zName = w.data.cols[2][0];
    bubble.color = w.colors[0];
    if (selected && selected.indexOf(bubble.name) >= 0) {
        bubble.color = w.colors[1];
    }
    data.push(bubble);
}

function createBubbleChart(data) {
    Highcharts.chart({
        chart: {
            type: 'bubble',
            plotBorderWidth: w.props.plotBorderWidth,
            renderTo: w.general.renderTo
        },
        legend: {
            enabled: false
        },
        xAxis: {
            gridLineWidth: w.props.gridLineWidth,
            title: {
                text: w.data.cols[0][0],
                style: {
                    fontWeight: w.props.labelFontWeight,
                    fontFamily: w.props.fontFamily,
                    fontSize: w.props.labelFontSize
                }
            },
            labels: {
                format: '{value}',
                style: {
                    fontWeight: w.props.labelFontWeight,
                    fontFamily: w.props.fontFamily,
                    fontSize: w.props.labelFontSize
                }
            }
        },
        yAxis: {
            gridLineWidth: w.props.gridLineWidth,
            startOnTick: false,
            endOnTick: false,
            title: {
                text: w.data.cols[1][0],
                style: {
                    fontWeight: w.props.labelFontWeight,
                    fontFamily: w.props.fontFamily,
                    fontSize: w.props.labelFontSize
                }
            },
            labels: {
                format: '{value}',
                style: {
                    fontWeight: w.props.labelFontWeight,
                    fontFamily: w.props.fontFamily,
                    fontSize: w.props.labelFontSize
                }
            },
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                '<tr><th>{point.xName}:</th><td>{point.x}</td></tr>' +
                '<tr><th>{point.yName}:</th><td>{point.y}</td></tr>' +
                '<tr><th>{point.zName}:</th><td>{point.z}</td></tr>',
            style: {
                fontFamily: w.props.fontFamily,
                fontSize: w.props.tooltipFontSize
            }
        },
        plotOptions: {
            series: {
                stickyTracking: false,
                dataLabels: {
                    allowOverlap: false,
                    enabled: true,
                    format: '{point.name}',
                    color: w.props.fontColor,
                    style: {
                        fontWeight: w.props.bubbleFontWeight,
                        fontFamily: w.props.fontFamily,
                        fontSize: w.props.bubbleFontSize
                    }
                }
            }
        },
        series: [{
            data: data,
            sizeByAbsoluteValue: true
        }]
    });
}

// окрашиваем значения из фильтра filterGuid
if (w.props.filterGuid) {
    visApi().getWidgetDataByGuid(w.props.filterGuid).then(function (widgetData) {
        selected = visApi().getSelectedValues(w.props.filterGuid).map(function (item) {
            return item[0];
        });
        const newData = data.map(function (item) {
            if (selected.indexOf(item.name) >= 0)
                item.color = w.colors[1];
            else
                item.color = w.colors[0];
            return item;
        });
        createBubbleChart(newData);
        
        visApi().onSelectedValuesChangedListener({ guid: "bc443322", widgetGuid: w.props.filterGuid }, function (info) {
            const newSelected = info.selectedValues.map(function (item) {
                return item[0];
            });
        
            const newData = data.map(function (item) {
                if (newSelected.indexOf(item.name) >= 0)
                    item.color = w.colors[1];
                else
                    item.color = w.colors[0];
                return item;
            });
            createBubbleChart(newData);
        });
    });
} else {
    createBubbleChart(data);
}
