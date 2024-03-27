var borderRadius = '4px';
const companyGroupId = 'f826c417bfb44813902af0fc81ae491e'
$('#widget-' + w.general.renderTo).css({
    'border-radius': borderRadius,
    });
$('#widget-header-' + w.general.renderTo).css({
    'border-radius': borderRadius,
     'border-bottom-left-radius': '4px',
    'border-bottom-right-radius': '4px'
});

$('#' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'border-top-left-radius': '4px',
    'border-top-right-radius': '4px'
});
$('#' + w.general.renderTo + ' .rb-filter-header-container').css({
    'border-radius': borderRadius
});
DateFilterRender({
    filter: w.general,
    textStyle: w.textStyle,
    data: w.data
});
FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: w.data
});

$('#' + w.general.renderTo + ' .rb-filter-body-container ul li div.rb-filter-list-item-text').css({'font-size': '13px'});
$('#' + w.general.renderTo + ' i').css('color', '#757575');
$('#'+ w.general.renderTo +' div.rb-filter-header-container').css({
    'padding': "5px 7px", 
    'background-color': '#ffffff' //цвет окна
});
$('#' + w.general.renderTo + ' i').css('color', '#e0e0e0');// цвет крестика, стрелки
var borderRadius = '4px'; // Радиус скругления

$('#' + w.general.renderTo).css({ // Скругление фильтра
    'border-radius': borderRadius,
    //'background-color': '#eeeeee'
}).find('.rb-filter-header-container').css({ 
    'border-radius': borderRadius,
     'border' : '1px solid #e0e0e0'// цвет рамки фильтра
   
   });
   
   $("#" + w.general.renderTo + " .rb-filter-cancel-button").css({"fontSize": "9px"}); //нижние кнопки
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({"fontSize": "9px"});
//кнопки наверху 
$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({"fontSize": "11px"});
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({"fontSize": "11px"});

function setFirst() {
  return visApi().getWidgetDataByGuid(w.general.renderTo)
    .then(function(widgetData) {
      var per = widgetData.data.rows[0];
      return visApi().setFilterSelectedValues(w.general.renderTo, [per]);
    });
}

function setAll() {
  return visApi().getWidgetDataByGuid(w.general.renderTo)
    .then(function(widgetData) {
      var per = widgetData.data.rows;
      return visApi().setFilterSelectedValues(w.general.renderTo, per);
    });
}

visApi().onSelectedValuesChangedListener({ guid: 'listen-->' + companyGroupId, widgetGuid: companyGroupId }, function(info) {
  if (info.selectedValues[0] == ' Без группы' || info.selectedValues.length === 0) {
    setFirst();
  } else {
    setAll();
  }
});

visApi().onSelectedValuesChangedListener({ guid: 'listen-->' + w.general.renderTo, widgetGuid: w.general.renderTo }, function(info) {
  if (info.selectedValues.length === 0 || info.selectedValues.length > 5) {
    setFirst();
  }
});
