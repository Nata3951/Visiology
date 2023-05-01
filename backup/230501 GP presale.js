// раскраска в зависимости от значения виджета

if (w.data.values[0]<=0){
    w.style.color = '#aed581'
    w.general.text = 'Без отставания'
} else {
    
    w.style.color = '#ff5252'
    w.general.text = 'Отставание дней: '+ w.data.values[0]
}


TextRender({
    text: w.general,
    style: w.style
});

// скругленные фильтры, размер шрифтов
var borderRadius = '8px'; // Радиус скругления

$('#' + w.general.renderTo).css({ // Скругление фильтра
    'border-radius': borderRadius,
    //'background-color': '#eeeeee'
}).find('.rb-filter-header-container').css({ 
    'border-radius': borderRadius,
     'border' : '1px solid #CFD8DC'// цвет рамки фильтра
   
   });
   
$("#" + w.general.renderTo + " .rb-filter-cancel-button").css({"fontSize": "9px"}); //нижние кнопки
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({"fontSize": "9px"});
//кнопки наверху 
$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({"fontSize": "8px"});
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({"fontSize": "8px"});
