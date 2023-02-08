//console.clear();
//console.log(w);



w.props = {
    "useMap": "CentrPrivolzie",
    "serieName": "",
    "useLabels": "full-name",
    "secondSerie": null,
    "secondSerieName": "",
    "secondSerieColors": [
        {
            "to": 0,
            "color": "rgba(255,0,0,0)"
        }, {
            "from": 0,
            "color": "rgba(200,255,100,0.5)"
        }
    ],
    "labelFontSize": "13px",
    "labelFontWeight": "normal",
    "labelFontColor": "",
    "labelTextOutline": "1px contrast",
    "tooltipFontSize": "15px",
    "tooltipFontWeight": "normal",
    "tooltipFontColor": "#fafafa",
    "tooltipFontSecondColor": "#9e9e9e",
    "tooltipDivisor": 1,
    "tooltipRoundTo": 0,
    "tooltipBackgroundColor": "#252841",
    "legendFontSize": "12px",
    "legendFontWeight": "bold",
    "legendFontColor": "#9e9e9e",
    "legendAlign": "right",
    "legendLayout": "vertical",
    "legendType": "fixed",
    "legendDivisor": 1,
    "legendRoundTo": 0,
    "legendFloating": true,
//    "colors": ["#c5e1a5", "#ffe57f", "#ff8a80"], 
//    "colors": ["#354a31", "#7e6027", "#5f202c"], 
    "colors": ["#354a31", "#5f202c"], 
    "filterGuid": "e29d410e8ba94dbb995a4570cdbcb408",
    "zoom": "off",
    "resetZoomButton": false,
    "fixedIntervals": [
        {
            "to": 0,
            "name": "Нормальный уровень"

        }, {
            "from": 0.00001,
            "name": "Превышение КПЭ"

        }
    ],
    "upButtonSize": 50,
    "filterGuidForSelect": "e29d410e8ba94dbb995a4570cdbcb408",
    "propertyNameForMapping": "short-name",
    "selectedRegionColor": "#0d47a1",
    "crosshair": true,
    "marginLeft": 0,
    "marginBottom": 0,
    "marginTop": 0,
    "marginRight": 0,
    "seriesBorderColor": "#252841",
    "seriesBorderWidth": 0.6
};

/*
  Версия виджета 1.19 16.10.18.
  Виджет принимает на вход до двух мер. Первая используется для подкраски, вторая для вывода в виде текста(пока не работает).
  В строки необходимо положить коды региона. Опционально можно положить названия регионов второй строкой. Тогда они
  будут использоваться вместо стандартных названий.

  Свойства виджета:
  useMap - какую карту использовать. Доступна карта России из википедии russia-wiki, карта Казахстана kaz-hc,
    Новгородской области novgorodskaya, Смоленской области smolenskaya, республика Татарстан tatarstan и г. Астана astana
    У карты custom/world есть возможность делать дриллдаун в РФ.
  serieName - имя серии. По умолчанию название столбца из OLAP (если оставить пустым).
  useLabels - какие названия регионов использовать. Досупно short-name и full-name.
  secondSerie - использовать ли дополнительный показатель. Доступные значение null и bubble. Bubble будет
    рисовать круги размером относительно значения показателя
  secondSerieName - имя второй серии. По умолчанию название столбца из OLAP (если оставить пустым).
  secondSerieColors - цвета второй серии(работает аналогично фиксированным интервалам).
  labelFontSize, labelFontWeight, labelFontColor - настройки шрифта лейблов. Если цвет не задан,
    то он подбирается автоматически для контраста.
  labelTextOutline - включить или выключить обводку текста.
  tooltipFontSize, tooltipFontWeight, tooltipFontColor - настройки шрифта тултипа.
  tooltipDivisor - на сколько делить значения в подписи.
  tooltipRoundTo - до которого знака после запятой округлять в подписи.
  tooltipBackgroundColor - цвет подложки подсказки
  legendFontWeight, legendFontSize, legendFontColor - настройки шрифта легенды.
  legendAlign - расположение легенды. Доступно left, right, center.
  legendLayout - расположение элементов легенды. Доступно horizontal и vertical.
  legendType - тип легенды. Gradient - заполнение градиентов цветов. Fixed - группы из параметра fixedIntervals.
  autoGroups - разбить на равные группы, в каждый цвет попадает равное количество.
  legendDivisor - на сколько делить значения в легенде. Работает только для autoGroups.
  legendRoundTo - до которого знака после запятой округлять в легенде. Работает только для autoGroups.
  legendFloating - если true, то легенда рисуется внутри области с картой
  colors - массив цветов.
  filterGuid - id фильтра, значение которого будет применятся при клике на карту. ВНИМАНИЕ, работает только если в качестве
    второго атрибута в строки положить имя региона.
  zoom - возможные значения: off - зум не работает, on - зум по скролу или двойному клику,
  area - к предыдущему варианту еще добавляется зум через выделение области на карте
  resetZoomButton - если true, то при зуме появляется кнопка сбрасывающая зум
  fixedIntervals - настройка интервалов для раскраски. Описываем границы интервала и его имя в легенде. Цвета берутся из массива цветов в том же порядке.
  filterGuidForSelect - id фильтра, который подсвечивает регион на карте цветом selectedRegionColor
  propertyNameForMapping - необходимо для работы фильтра filterGuidForSelect. Определяет по какому полю в json'e карты мэппиться с значениями в фильтре.
    Значения в фильтре должны совпадать с одним из свойств карты (типа short-name, full-name или например name для hc карт), иначе выбор региона не будет работать.
  selectedRegionColor - цвет подсветки от фильтра filterGuidForSelect, если задать значение hatch, то регион будет отмечаться штриховкой (для работы шриховки нужна библиотека pattern-fill.js)
  crosshair - если true, то появляются 2 пунктирные линии, следующие за курсором
  marginLeft, marginBottom, marginTop, marginRight - отступы от границ виджета
  seriesBorderColor - цвет границ областей
  seriesBorderWidth - толщина границы областей
*/
var btn_block = $('<div></div>', {
    id: 'btn_block'
});

function toggleActionButton(id) {
            if ($('#btn_all').hasClass('action_active_btn')) {
                $('#btn_all').css({
                    'background-color': '#BADEFA',
                    'border': 'none'
                })
            } else {
                $('#btn_all').css({
                    'background-color': '#ffffff',
                    'border': '1px solid grey'
                })
            }
            
             if ($('#btn_center').hasClass('action_active_btn')) {
                $('#btn_center').css({
                    'background-color': '#BADEFA',
                    'border': 'none'
                })
            } else {
                $('#btn_center').css({
                    'background-color': '#ffffff',
                    'border': '1px solid grey'
                })
            }
}

function toggleActionButton(id) {
            if ($('#btn_all').hasClass('action_active_btn')) {
                $('#btn_all').css({
                    'background-color': '#BADEFA',
                    'border': 'none'
                })
            } else {
                $('#btn_all').css({
                    'background-color': '#ffffff',
                    'border': '1px solid grey'
                })
            }
            
             if ($('#btn_center').hasClass('action_active_btn')) {
                $('#btn_center').css({
                    'background-color': '#BADEFA',
                    'border': 'none'
                })
            } else {
                $('#btn_center').css({
                    'background-color': '#ffffff',
                    'border': '1px solid grey'
                })
            }
}

var btn_all = $('<button/>', {
        text: 'Весь край',
        id: 'btn_all',
        click: function () {
            if ($('#btn_all').hasClass('action_active_btn')) {
                return
            }
            $('#btn_all').toggleClass('action_active_btn');
            if ($('#btn_center').hasClass('action_active_btn')) {
                $('#btn_center').toggleClass('action_active_btn');
            }
         toggleActionButton();
        // mapChart.outZoom();
        // mapChart.mapZoom();
        // mapChart.mapZoom(0.15, 140, -150);
        mapChart.xAxis[0].setExtremes(400, 0)
        mapChart.mapZoom();
        // mapChart.outZoom(); 
             mapChart.update({
            plotOptions: {
                map: {
                    dataLabels: {
                        enabled: false
                    }
                }
            }
            })
        // mapChart.outZoom();
       }
    })
    
var btn_center = $('<button/>', {
        text: 'Центральная часть',
        id: 'btn_center',
        class: 'action_active_btn',
        click: function () { 
            if ($('#btn_center').hasClass('action_active_btn')) {
                return
            }
            $('#btn_center').toggleClass('action_active_btn');
         if ($('#btn_all').hasClass('action_active_btn')) {
                $('#btn_all').toggleClass('action_active_btn');
            }
        toggleActionButton();
        mapChart.update({
        plotOptions: {
            map: {
                dataLabels: {
                    enabled: true
                }
            }
        }
    });
        mapChart.mapZoom();
        mapChart.mapZoom(0.15, 165, -150);
        // mapChart.get("Березовский").zoomTo(100);
        // mapChart.xAxis[0].setExtremes(50, 300);
        // mapChart.yAxis[0].setExtremes(0, 200);
        // mapChart.mapZoom(0.9);
        mapChart.outZoom(); 
        
    }
    })

if ($('#btn_block').length) {
    $('#btn_block').remove();
}

if (!$('#btn_block').length) {
    $('#widget-173fbb04b6d14460a8de2fd9fc19947f').append(btn_block);
}

if (!$('#btn_all').length ) {
    $('#btn_block').append(btn_all);
    $('#btn_all').addClass('action_btn');
}

if (!$('#btn_center').length ) {
    $('#btn_block').append(btn_center);
    $('#btn_center').addClass('action_btn');
}

$('#btn_center').css({
    'width': '60%',
    'padding': '10px 2px 10px 2px',
    'border-radius': '0 10px 10px 0'
})

$('#btn_all').css({
    'width': '40%',
    'padding': '10px 2px 10px 2px',
    'border-radius': '10px 0 0 10px'
})

$('.action_btn').css({
    'background-color': '#ffffff',
    'border': '1px solid grey',
    'outline': 'none'
})

$('.action_active_btn').css({
    'background-color': '#BADEFA'
})

$('#btn_block').css({
    'position': 'absolute',
    'z-index': '999',
    'bottom': '10px',
    'left': '10px',
    'width': '40%',
})



// добавляем глобальный словарь статуса перерисовки виджета
if(!window.chartsStatusRedraw){
    window.chartsStatusRedraw = {};
    window.chartsStatusRedraw[w.general.renderTo] = false;
} else {
    window.chartsStatusRedraw[w.general.renderTo] = false;
}

// Формируем тултипы
var tooltip = {
    // устанавливаем таймаут для тултипа 10 сек в IE, иначе он быстро исчезает
    hideDelay: Highcharts.isMS ? 10000 : 500,
    backgroundColor: w.props.tooltipBackgroundColor ? w.props.tooltipBackgroundColor : "#ffffff",
    formatter: function () {
        //console.log(this);
        var roundVal = Math.pow(10, w.props.tooltipRoundTo);
        var formattedValue = (Math.round(this.point.value / w.props.tooltipDivisor * roundVal) / roundVal).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        //var formattedPrevYear = (Math.round(this.point.valuePrevYear / w.props.tooltipDivisor * roundVal) / roundVal).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        //var formattedCurrentYear = (Math.round(this.point.valueCurrentYear / w.props.tooltipDivisor * roundVal) / roundVal).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        return '<span style="color:' + w.props.tooltipFontSecondColor +'">' + (this.point['full-name'] ? this.point['full-name'] : this.point.name) + '</span><br/> ' + 
        'Отклонение:&nbsp;&nbsp;&nbsp;'   + '<b>' + this.point.value.toFixed(2) + '</b><br/>' ; 
        //'Потери:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + formattedPrevYear;
    },
    style: {
        fontSize: w.props.tooltipFontSize,
        fontWeight: w.props.tooltipFontWeight,
        color: w.props.tooltipFontColor
    }
};
// Формируем Легенду
var legend = {
    align: w.props.legendAlign,
    enabled: true,
    floating: w.props.legendFloating,
    layout: w.props.legendLayout,
    itemStyle: {
        color: w.props.legendFontColor,
        fontSize: w.props.legendFontSize,
        fontWeight: w.props.legendFontWeight
    }
};
var dataClasses = [];
switch (w.props.legendType) {
    case 'gradient':
        break;
    case 'fixed': // Если фиксированные интервалы
        dataClasses = w.props.fixedIntervals.map(function (item, i) {
            return $.extend({}, item, {color: w.props.colors[i]});
        });
        break;
    case 'autoValues': // Если разделить поровну по значению
        var sortedVals = w.data.values[0].map(function (item) {
            return item;
        });
        var colLen = w.props.colors.length;
        break;
    case 'autoGroups': // Если разделить поровну по группам
        var sortedVals = w.data.values[0].map(function (item) {
            return item;
        });
        sortedVals.sort(function (a, b) {
            return a - b;
        });
        var dataLen = sortedVals.length;
        //colLen = w.props.colors.length
        var step = Math.ceil(dataLen / w.props.colors.length);
        dataClasses = w.props.colors.map(function (item, i) {
            var from = i === 0 ? undefined : sortedVals[step * i];
            var to = i === w.props.colors.length - 1 ? undefined : sortedVals[step * (i + 1)];
            var name;
            var roundVal = Math.pow(10, w.props.legendRoundTo);
            var fromStr = (Math.round(from / w.props.legendDivisor * roundVal) / roundVal).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
            var toStr = (Math.round(to / w.props.legendDivisor * roundVal) / roundVal).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
            if (from === undefined) {
                name = 'До ' + toStr;
            } else if (to === undefined) {
                name = 'Больше ' + fromStr;
            } else {
                name = 'От ' + fromStr + ' До ' + toStr;
            }
            return {
                color: item,
                from: from,
                to: to,
                name: name
            };
        });
        break;
}

// убираем crosshair в IE, потому что он препятствует прохождению события click
if (w.props.crosshair && Highcharts.isMS)
    w.props.crosshair = false;

var mapChart;
DisplayMap(Highcharts.maps[w.props.useMap]);


if (visApi().getWidgetByGuid(w.props.filterGuidForSelect) !== undefined) {
    visApi().getWidgetDataByGuid(w.props.filterGuidForSelect).then(function (fv) {
        //console.log(fv);
        if (fv.selected.rows[0] !== undefined && mapChart.get(fv.selected.rows[0][0]) !== undefined) {
            if (w.props.selectedRegionColor == 'hatch')
                $('#highcharts-default-pattern-1 path').css('stroke', mapChart.get(fv.selected.rows[0][0]).color);
            mapChart.get(fv.selected.rows[0][0]).select();
        }

    });

    visApi().onSelectedValuesChangedListener({guid: 'f30c94937e1e40d2820c1a6244f74240', widgetGuid: w.props.filterGuidForSelect}, function (info) {
    //visApi().setFilterSelectedValues('0f5948b01bf542f085da94686d399439', [["Москва"], ["Казань"]], function (response) {
        var lastRegion;
        
        if (info.selectedValues[0] === undefined) {
            lastRegion = w.props.selectedRegionName;
             if (w.props.selectedRegionColor == 'hatch')
                $('#highcharts-default-pattern-1 path').css('stroke', mapChart.get(lastRegion).color);
            mapChart.get(lastRegion).select();
        }


        if (info.selectedValues[0] !== undefined && mapChart.get(info.selectedValues[0][0]) !== undefined) {



            if (w.props.selectedRegionColor == 'hatch')
                $('#highcharts-default-pattern-1 path').css('stroke', mapChart.get(info.selectedValues[0][0]).color);
            mapChart.get(info.selectedValues[0][0]).select();
        }

    }
    );
    
}
//console.log(w.props.selectedRegionColor);

if (w.props.crosshair)
    addCrosshair(1);

if (w.props.zoom == "area") {
    var parent_style_scale = 1,
        mouseDownX,
        mouseDownY,
        startMapX,
        startMapY;
    mapChart.container.onmousedown = null;
    if ($("div").is(".va-dashboard-container")) {
        parent_style_scale = (visApi().getSheetZoom())/100;
    }
    $('#' + w.general.renderTo + ' .highcharts-container')
    .mousedown(function(e) {
        mouseDownX = e.pageX / parent_style_scale;
        mouseDownY = e.pageY / parent_style_scale;  
        e = mapChart.pointer.normalize(e);
        startMapX = mapChart.xAxis[0].toValue(e.chartX);
        startMapY = mapChart.yAxis[0].toValue(e.chartY);
        if ($('#area' + w.general.renderTo).length === 0){
            $('<div id="area' + w.general.renderTo + '" ></div>')
            .css({
                'background-color': '#2048CE',
                opacity: 0.3,
                position: 'absolute'
            })
            .prependTo('#' + w.general.renderTo + ' .highcharts-container');
        }
    })
    .mousemove(function(e) {
        if ($('#area' + w.general.renderTo).length > 0){
            mapChart.tooltip.options.enabled = false;
            mapChart.tooltip.destroy();
            var left_offset = (e.pageX / parent_style_scale >= mouseDownX) ? mouseDownX : e.pageX / parent_style_scale;
            var top_offset  = (e.pageY / parent_style_scale >= mouseDownY) ? mouseDownY : e.pageY / parent_style_scale;
            $('#area' + w.general.renderTo).css({
                left: left_offset - $('#' + w.general.renderTo + ' .highcharts-container').offset().left / parent_style_scale + 'px',
                top: top_offset - $('#' + w.general.renderTo + ' .highcharts-container').offset().top / parent_style_scale + 'px',
                width:  Math.abs(e.pageX / parent_style_scale - mouseDownX) + 'px',
                height: Math.abs(e.pageY / parent_style_scale - mouseDownY) + 'px'
            });
            if (w.props.crosshair)
                addCrosshair(0);
        }
    })
    .mouseup(function(e) {
        mapChart.tooltip.options.enabled = true;
        var areaWidth = $('#area' + w.general.renderTo).outerWidth(),
            areaHeight = $('#area' + w.general.renderTo).outerHeight();
        $('#area' + w.general.renderTo).remove();
        if (w.props.crosshair)
            addCrosshair(1);
        if (areaWidth < 5 &&  areaHeight < 5)
             return true;
        var zkX = areaWidth / $('#' + w.general.renderTo + ' .highcharts-container').outerWidth(),
            zkY = areaHeight / $('#' + w.general.renderTo + ' .highcharts-container').outerHeight();
        var zk = (zkX > zkY) ? zkX : zkY;
        e = mapChart.pointer.normalize(e);
        var centerX = (startMapX + mapChart.xAxis[0].toValue(e.chartX)) / 2;
        var centerY = (startMapY + mapChart.yAxis[0].toValue(e.chartY)) / 2;
        mapChart.mapZoom(zk, centerX, centerY);
    });
}

if (w.props.resetZoomButton) {
    mapChart.update({
        xAxis: {
            events : {
                setExtremes: function(e) {
                    if ( e.max == undefined)
                        $('#' + w.general.renderTo + ' .highcharts-reset-zoom').remove();
                    else if ($('#' + w.general.renderTo + ' .highcharts-reset-zoom').length == 0)
                        mapChart.showResetZoom();
                }
            }
        }
    })
}

function DisplayMap(mD) {
    var series;
    //Проверяем в каком формате карта и соответсвенно формирует серию.
    var isCustomMap = mD instanceof Array;
    if (isCustomMap)
        series = prepareSeries(w, mD);
    else
        series = prepareSeriesForHcMap(w, mD);

    series[0].point = {///сброс надо тут сделать
        events: {
            click: function () {
                if ((w.props.filterGuid !== "")) {
                    if (this.name !== "") {
               // console.log(this);
                //console.log(this.name);
               // console.log(this.key);
                if (this['hc-code'] === w.props.selectedRegionCode) {
                    visApi().setFilterSelectedValues(w.props.filterGuid, [], function (response) {});
                    w.props.selectedRegionCode = '';
                    w.props.selectedRegionName = '';
                } else {
                    visApi().setFilterSelectedValues(w.props.filterGuid, [[this.name]]);
                    w.props.selectedRegionName = this.name;
                    w.props.selectedRegionCode = this['hc-code'];
                }
                // visApi().setFilterSelectedValues(w.props.filterGuid, [[this.name]]);
                if (this.key == 'ru') {
                    //DisplayMap(Highcharts.maps['russia-wiki']); rus-kk
                    DisplayMap(Highcharts.maps['rus-kk']);
                    var upButtonSize = Math.round( $('#' + w.general.renderTo).outerWidth() / 40 );
                    $('#' + w.general.renderTo).prepend(
                        $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="' + upButtonSize + '" height="' + upButtonSize +
                        '" style="fill: rgb(96, 125, 139); position: absolute; right: 0px; z-index: 1;"><path d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z"></path></svg>')
                        .click(function () {
                            DisplayMap(Highcharts.maps[w.props.useMap]);
                        })
                    );
                }
                }
                else {
                    visApi().setFilterSelectedValues(w.props.filterGuid, [], function (response) {});
                }
                }
                else {
                    //visApi().setFilterSelectedValues(w.props.filterGuid, [], function (response) {});
                    //visApi().setFilterSelectedValues(w.props.filterGuid, [], function (response) {});
                }
            }
        }
    };

    switch (w.props.secondSerie) {
        case 'bubble':
            var bubbleSerie = prepareBubbleSeries(w, mD);
            series = series.concat(bubbleSerie);
            break;
        default:
            break;
    }


    mapChart = Highcharts.mapChart(w.general.renderTo, {
        chart: {
            marginLeft: w.props.marginLeft ? w.props.marginLeft : 0,
            marginBottom: w.props.marginBottom ? w.props.marginBottom : 10,
            marginTop: w.props.marginTop ? w.props.marginTop : 10,
            marginRight: w.props.marginRight ? w.props.marginRight : 0,
            // добавляем событие по перезагрузке виджета
            events: {
                load: function () {
                    window.chartsStatusRedraw[w.general.renderTo] = true;
                }
            }
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            title: {
                text: null
            }
        },
        mapNavigation: {
            enabled: (w.props.zoom == "off") ? false : true,
            buttonOptions: w.props.buttonOptions ? w.props.buttonOptions : {},
            buttons: w.props.buttons ? w.props.buttons : {}
        },
        tooltip: tooltip,
        legend: legend,
        plotOptions: {
            map: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.point.name;
                    },
                    style: {
                        color: w.props.labelFontColor ? w.props.labelFontColor : "contrast",
                        fontSize: w.props.labelFontSize ? w.props.labelFontSize : "11px",
                        fontWeight: w.props.labelFontWeight ? w.props.labelFontWeight : "bold",
                        textOutline: w.props.labelTextOutline
                    }
                },
                states: {
                    select: {
                        color: function(){return 'red'}//(w.props.selectedRegionColor == 'hatch') ? 'url(#highcharts-default-pattern-1)' : w.props.selectedRegionColor
                    }
                }
            },
            series: {
                nullColor: w.props.nullColor? w.props.nullColor: "#47485c",
                borderColor: w.props.seriesBorderColor ? w.props.seriesBorderColor : "#ffffff",
                borderWidth: w.props.seriesBorderWidth ? w.props.seriesBorderWidth : 0.6,
                states: {
                    hover: {
                        brightness: 0.3
                    }
                }
            }
        },
        colorAxis: {
            labels: {
                enabled: true,
                format: '{value}'
            },
            stops: w.props.colors.map(function (item, i, arr) {
                var step = 1 / (arr.length - 1);
                return [i * step, item]
            }),
            dataClasses: dataClasses.length === 0 ? undefined : dataClasses
        },
        series: series
    });
}



/**
 *Returns region name.
 *@param {string} regionCode
 *@param {string} useLabels
 *@returns {string} object
 */
function getNameFromMapData(regionCode, useLabels, mD) {
    var result = mD.filter(function (item) {
        return item['hc-code'] === regionCode;
    })[0];
    return result ? result[useLabels] : undefined;
}

/**
 *Returns series object made from dataframe
 *@param w object from server
 *@returns {series}
 */
function prepareSeries(w, mD) {
    // if data or region dimension is missing return empty series object. Otherwise map will not be drawn.
    if (!w.data.values[0] || !w.data.rows[0])
        return [{data: []}];
    if (w.props.filterGuidForSelect != "" && w.props.propertyNameForMapping != "")
        $.each(mD, function () {
            this.id = this[w.props.propertyNameForMapping];
        });
        
   // console.log(_.zip(w.data.rows, w.data.values[0], w.data.values[1], w.data.values[2]));
    var _data = _.zip(w.data.rows, w.data.values[0]).map(function (item, i) {
        var regionCode = item[0][0],
            regionName = item[0][1],
            regionValue = item[1];
        return {
            'name': regionName || getNameFromMapData(regionCode, w.props.useLabels, mD),
            'hc-code': regionCode,
            'value': regionValue
            //'valueCurrentYear': item[2],
            //'valuePrevYear': item[1]
        }
    });

    // Зачищаем исходные данные от ключей (hc-code), которых нет на карте (нужно например для кейса с мировой картой с дриллом по РФ, чтобы лишние данные по странам на карту РФ не приходили)
    var mapCodes = mD.map(function (item) {
        return item['hc-code'];
    });
    _data = _data.filter(function(item) {
        return mapCodes.indexOf(item['hc-code']) >= 0
    });

    var series = [{
        name: w.props.serieName || w.data.cols[0][0],
        data: _data,
        mapData: mD,
        joinBy: 'hc-code'
    }];
    return series;
}

/**
 *Returns data array to join with hc mapData object
 *@param w object from server
 *@returns {series}
 */
function prepareSeriesForHcMap(w, mD) {
    if (!w.data.values[0] || !w.data.rows[0])
        return [];
    if (w.props.filterGuidForSelect != "" && w.props.propertyNameForMapping != "")
        $.each(mD.features, function () {
            this.id = this.properties[w.props.propertyNameForMapping];
        });
    var data = _.zip(w.data.rows, w.data.values[0], w.data.values[1]).map(function (item, i) {
        var result = {
            'key': item[0][0],
            'value': parseFloat(item[1])
        };
        if (item[0][1]) {
            mD.features.forEach(function (feature) {
                if (feature.properties['hc-key'] === item[0][0])
                    feature.properties['name'] = item[0][1];
            });
        } //result.dataLabels = {format: item[0][1]};
        return result
    });

    var series = [{
        name: w.props.serieName || w.data.cols[0][0],
        data: data,
        mapData: mD,
        joinBy: ['hc-key', 'key']
    }];
    return series
}

/**
 *Returns data array to join with hc mapData object
 *@param w object from server
 *@returns {serie}
 */
function prepareBubbleSeries(w, mD) {
    // if data or region dimension is missing return empty series object. Otherwise map will not be drawn.
    if (!w.data.values[1] || !w.data.rows[1]) return [];
    var _data = _.zip(w.data.rows, w.data.values[1]).map(function (item, i) {
        var regionCode = item[0][0],
            regionValue = +item[1];
        var color;
        w.props.secondSerieColors.forEach(function(item){
            if ((item.from <= regionValue || item.from === undefined) && (item.to > regionValue || item.to === undefined)){
                color = item.color
            }
        });
        return {
            'color': color,
            'key': regionCode,
            'z': regionValue
        }
    });
    var bubbleSerie = {
        type: 'mapbubble',
        joinBy: [isCustomMap? 'hc-code':'hc-key', 'key'],
        name: w.props.secondSerieName || w.data.cols[1][0],
        data: _data,
        mapData: mD,
        minSize: '7%',
        maxSize: '12%',
        showInLegend: true,
        color: w.props.secondSerieColor,
        zIndex: 100,
        tooltip: {
            pointFormatter: function () {
                return (this['short-name'] ? this['short-name'] : this.name) + ': ' + this.z + '<br/>'
            }
        }
    };
    return bubbleSerie;
}

function addCrosshair(width) {
    mapChart.update({
        xAxis: {
            crosshair: {
                zIndex: 5,
                dashStyle: 'dot',
                snap: false,
                color: 'gray',
                width: width
            }
        },
        yAxis: {
            crosshair: {
                zIndex: 5,
                dashStyle: 'dot',
                snap: false,
                color: 'gray',
                width: width
            }
        }
    })
}
