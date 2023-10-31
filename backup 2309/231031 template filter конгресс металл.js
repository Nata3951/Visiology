let text1 = '#fafafa';
let text2 = '#9e9e9e';

let fs = '18px';
let borderRadius = '8px'; // Радиус скругления

FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: w.data
});

// заголовок виджета: отступы и высота
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'height' : '30px',
    'padding': '2px 5px',
    'text-align' : 'left',
});

$('#' + w.general.renderTo + ' i').css('color', text2);// цвет крестика, стрелки

$('#' + w.general.renderTo).css({ // Скругление фильтра
    'border-radius': borderRadius,
    'background-color': '#2f465d',
    'color': text1,
}).find('.rb-filter-header-container').css({ 
    'border-radius': borderRadius,
    'font-size' : fs,
     'border' : '1px solid #2f465d'// цвет рамки фильтра
   
   });
   
$('#' + w.general.renderTo).css({
     'background-color': ''
}).find('.rb-filter-body-container').css({
    'background-color': '#162535', //фон выпадающего списка
    'border-color' : '#2f465d', // цвет рамки внутри фильтра
    'font-size' : fs,
   });  
   

// заголовок виджета: шрифт
$(`#widget-${w.general.renderTo} .va-widget-header`).css({
    'font-size' : fs,
});

//отступ внутри фильтра
$('#'+ w.general.renderTo +' div.rb-filter-header-container').css({
    'padding': "5px 7px", 
    'background-color': '#18324b' //цвет окна
});

$("#" + w.general.renderTo + " .rb-filter-cancel-button").css({"fontSize": fs}); //нижние кнопки
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({"fontSize": fs});

//кнопки наверху 
$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({"fontSize": fs});
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({"fontSize": fs});
