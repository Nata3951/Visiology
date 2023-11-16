// Радиус скругления
let borderRadius = '20px';

FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: w.data
});

// Оформление фильтра
// Кнопка сброса, стрелки
$('#' + w.general.renderTo + ' i').css('color', '#455a64');

// Скругление фильтра и фон
$('#' + w.general.renderTo).css({ 
    'border-radius': borderRadius,
    'background-color': ''
});

// Заголовок внутри фильтра
$('#' + w.general.renderTo).find('.rb-filter-header-text').css({
    'font-weight': 'bold'
});

//отступ внутри фильтра
$('#'+ w.general.renderTo +' div.rb-filter-header-container').css({
    'padding': "7px 10px",
    'border-radius': borderRadius,
    'border' : '1px solid #455a64'
});

// Выбранные значения
$("#" + w.general.renderTo + " .rb-filter-cloud-tag-container").css({"fontSize" : "11px"}) 

// Чек-боксы
$("#" + w.general.renderTo + " .fa.fa-square-o.rb-filter-list-item-icon").css({"fontSize": "18px"}); 

// Выпадающий список
$("#" + w.general.renderTo + " .rb-filter-body-container").css({
    "padding": "3px",
    'background-color': '#263238', 
    'border-color' : '#455a64'
});

// Все кнопки
$("#" + w.general.renderTo + " .rb-filter-body-container .button").css({
    "padding": "6px",
    "color": "#EF5350"
});

// Нижние кнопки
$("#" + w.general.renderTo + " .rb-filter-apply-button").css({
    "fontSize": "8px",
    "marginLeft": "3px",
    "background-color": "#D32F2F",
    "color": "#ffffff"
});
$("#" + w.general.renderTo + " .rb-filter-cancel-button").css({
    "fontSize": "8px",
    "marginRight" : "3px"
});

// Верхние кнопки
$("#" + w.general.renderTo + " .rb-filter-selection-buttons-container").css({"padding": "2px"});

$("#" + w.general.renderTo + " .rb-filter-select-all-button").css({
    "padding": "2px",
    "fontSize": "7px"
});
$("#" + w.general.renderTo + " .rb-filter-unselect-all-button").css({
    "padding": "2px",
    "fontSize": "7px"
});

// if (w.data.selected.length > 0) {
    // let filterValue = '';
    //     w.data.selected.forEach((selected) => {
    //         filterValue += selected.text + ' & '; 
    //     });
    // filterValue = filterValue.slice(0, -3);
    // sessionStorage.setItem('period', filterValue)
// }

// Глобальный фильтр
// Устанавливаем значения из локального хранилища в фильтр
if (sessionStorage.getItem('period')) {
    const filterStr = sessionStorage.getItem('period');
    const filterArr = filterStr.split(' & ').map(item => {
        if (item.includes(',')) {
            return item.split(',').map(subItem => subItem.trim());
        }
        return [item.trim()];
    });

    setTimeout(() => {
        visApi().setFilterSelectedValues(w.general.renderTo, filterArr);
    }, 10);
} else {
    visApi().setFilterSelectedValues(w.general.renderTo, []);
}
// Обновляем хранилище при изменении фильтра
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo, widgetGuid: w.general.renderTo}, function (info) {
    let filterValue = '';
    info.selectedValues.forEach((selected) => {
        filterValue += selected + ' & '; 
    });
    
    filterValue = filterValue.slice(0, -3);
    sessionStorage.setItem('period', filterValue);
})

