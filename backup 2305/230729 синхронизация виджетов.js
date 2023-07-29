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


// 
const filterOneGuId = '204f7adb0a664500a1aece2e7e4629d9';
let selected = w.data.selected;

setTimeout(() => {filterAndRender()}, 500)
visApi().onSelectedValuesChangedListener({guid: filterOneGuId, widgetGuid: filterOneGuId }, function (info) {filterAndRender(info)})


function filterAndRender(info) {
    const wDup = JSON.parse(JSON.stringify(w));
    let selectedValue = (info?info.selectedValues:visApi().getSelectedValues(filterOneGuId))[0][0];
    
    // добавляем дату на год меньше от последней
    let selectedValueArr = selectedValue.split(' ');
    
    // ищем дату на год отличающуюся от последней доступной
    wDup.data.data.map(el => {
        let elArr = el.text.split(' ');
        
        
        if (selectedValueArr.length === 2 && elArr.length === 2) {
            if (selectedValueArr[0] === elArr[0] && (Number(selectedValueArr[1]) - 1) === Number(elArr[1])) {
                selected[0] = el;
            }
        } else if (selectedValueArr.length === 3 && elArr.length === 3) {
            if (selectedValueArr[0] === elArr[0] && selectedValueArr[1] === elArr[1] && (Number(selectedValueArr[2]) - 1) === Number(elArr[2])) {
                 selected[0] = el;
            }
        }
    });

    
    FilterRender({
        filter: wDup.general,
        style: wDup.style,
        textStyle: wDup.textStyle,
        data: {...wDup.data, selected}
    }); 
    
    getStyle();
}

// 

// фильтры, которые слушаем
let filterGuId = ['9f2e3d4a28ba442faef7dcc577b0543f'];

// виджеты, в которых меняем сообщение об ошибке
let errorVidgetGuid = ['b36d8e3a91044128b4e4891464184c7c'];

// треугольник, который выдается в сообщении об ошибке
let triangle = $('#va-widget-error-'+ errorVidgetGuid + ' > i');

//  сообщение об ошибке
let text = $('#va-widget-error-'+ errorVidgetGuid + ' > i > div');


// нужный формат
triangle.css({ "color":"transparent"});
text.css({ "color":"gold"}); 
text[0].innerText = 'some other text';
