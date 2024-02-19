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
        // console.log('test ', widgetData.data.rows.at(-1));
        let lastPeriod = widgetData.data.rows.at(-1);
        visApi().setFilterSelectedValues(w.general.renderTo, [lastPeriod], function (response) {});
        [lastPeriod];  
        // $('#' + w.general.renderTo + ' .rb-filter-header-text span').text(lastPeriod[0] + " " + unit +" " + lastPeriod[1]);
    });
}

