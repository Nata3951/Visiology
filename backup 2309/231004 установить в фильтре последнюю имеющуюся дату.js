let unit = "квартал ";

// добавим текст к второму уровню фильтра
w.data.data.forEach(data => {
    data.children.forEach(child =>{
        child.text = unit + child.text;
    });
});

FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: w.data
});


if (w.data.selected.length < 1){
    visApi().getWidgetDataByGuid(w.general.renderTo).then(function (widgetData) {
        console.log('test ', widgetData.data.rows.at(-1));
        let lastPeriod = widgetData.data.rows.at(-1);
        visApi().setFilterSelectedValues(w.general.renderTo, [lastPeriod], function (response) {});
        $('#' + w.general.renderTo + ' .rb-filter-header-text span').text(lastPeriod[0] + " " + unit +" " + lastPeriod[1]);
    });
}

var borderRadius = '5px'; // Радиус скругления
$('#' + w.general.renderTo + ' i').css('color', '#90a4ae') 
$('#' + w.general.renderTo).css({ // Скругление фильтра
    'border-radius': borderRadius,
     'background-color': '#494b6f'
}).find('.rb-filter-header-container').css({ 
    'border-radius': borderRadius,
     'background-color': '#494b6f',
     'border' : '5px solid #494b6f'// цвет рамки фильтра
   });
   
$('#' + w.general.renderTo).css({
     'background-color': '#494b6f'
}).find('.rb-filter-body-container').css({
     'background-color': '#494b6f',
   'border-color' : '#494b6f' // цвет рамки внутри фильтра
   });
   
   
$('#' + w.general.renderTo).find('.rb-filter-header-text').css({
    'font-weight': 'bold'
});

//отступ внутри фильтра
$('#'+ w.general.renderTo +' div.rb-filter-header-container').css({
    "padding": "6px 15px", 
    'background-color': '#494b6f'
});
$("#" + w.general.renderTo + " .rb-filter-header-container").css({
    "border": "5px",
    "padding-right": "8px",
    "padding-left": "8px",
    'background-color': '#292B4C'
});

//  Скругление границ для блока виджета отвечающего за выбранные элементы
$("#" + w.general.renderTo + " .rb-filter-container.not-selectable.rb-filter-multi-selection").css({
    "border": "1px solid #494b6f",
    "border-radius": "5px",
    "background-color": "#292B4C" 
});

//  Скругление границ для блока виджета отвечающего за выбранные элементы
$("#" + w.general.renderTo + " .rb-filter-container.not-selectable").css({
    "border": "1px solid #494b6f",
    "border-radius": "5px",
    "background-color": "#292B4C"
});
