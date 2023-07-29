w.props = { 
    parentWidget: '2cde4a44516a496a9caa948844420c7a',
    guid: w.general.renderTo,
    level: 1,
    type: "Надежность" 
}

// parentWidget: - Guid родительского виджета
// guid: - Guid виджета  
// level: - Уровень 
// type: - Тип: "Надежность"/"Реализация услуг"/"Персонал"/"Цифровизация"/"Агрегированный показатель (4 категории)"/"Экономика (справочно)"/"Кол-во РЭС"

// Дожидаемся, пока родительский виджет прогрузиться и активируем глобальную функцию рендеринга
visApi().onWidgetLoadedListener({guid: w.general.renderTo+'-onAllWidgetsLoadedListener', widgetGuid: w.props.parentWidget}, () => {
    window[w.props.parentWidget+'-indicatorRender'](w.props.guid, w.props.level, w.props.type)
});


// В фильтре/текстовом виджете пишется выбранное на влияющем виджите
// visApi().onFilterChangedMessage. Использовать onSelectedValuesChangedListener!
visApi().onFilterChangedMessage({guid: "123", filterGuid: "b389423b2fcf4bf4ab305853603995a1"}, function (info) { 	//id влияющего виджета
    visApi().setFilterSelectedValues('fff60def91a44ef38153ca19e07fc541', info.selectedValues); 	//id фильтра
    var t = '';
    if (info.selectedValues.length > 0) {
        info.selectedValues.forEach(function(item) {
           t += item[0] + ', '; 
        });
        t = t.slice(0, -2);
    }
	$('#ca081446a6504d209627fc41c927f125 > div').text(t),	//id текстового виджета
	$('#b39eeb325c874e0f9afd52d808c55738 > div').text(t), 	//id текстового виджета
	$('#c0cd936e7ec244379c2be2d51129c1a0 > div').text(t); 	//id текстового виджета
});

//
let triangle = $('#va-widget-error-b36d8e3a91044128b4e4891464184c7c > i');
let text = $('#va-widget-error-b36d8e3a91044128b4e4891464184c7c > i > div')

triangle.css({
    "color":"transparent"
}); 

text.css({
    "color":"coral"
}); 

text[0].innerText = "other text";

console.log('test1', text[0].innerText);



TextRender({
    text: w.general,
    style: w.style
});
