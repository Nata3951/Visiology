// ПОПАЛИ В ТОП-100, текстовый виджет

// фильтр Период
visApi().getWidgetDataByGuid("3fea8f5b80f342ffb5cc3ea53baed849").then(textChange)
visApi().onSelectedValuesChangedListener({ guid: "filter-" + w.general.renderTo, widgetGuid: "3fea8f5b80f342ffb5cc3ea53baed849"}, textChange) 

function textChange() {
    let txt = JSON.parse(JSON.stringify(w.general)),
        filterValue = visApi().getSelectedValues("3fea8f5b80f342ffb5cc3ea53baed849")[0][0].split('-')[0];

    if (filterValue == '2022') {
        render(w.general);
        $('#widget-header-' + w.general.renderTo + ' > a')[0].text = "Попали в ТОП-113:";
    } else {
        render(w.general);
        $('#widget-header-' + w.general.renderTo + ' > a')[0].text = "Попали в ТОП-100:"
    }
}

function render(txt) {
    TextRender({
        text: txt,
        style: w.style
    });
}

// цифра, тоже текстовый виджет
let filterValue = visApi().getSelectedValues("3fea8f5b80f342ffb5cc3ea53baed849")[0][0].split('-')[0],
    records;   
    
if (filterValue == '2022') {
    records = w.data.values[0].filter(el => el <= 113)
} else {
    records = w.data.values[0].filter(el => el <= 100)
}
w.general.text = records.length

TextRender({
    text: w.general,
    style: w.style
});

// table, sticky header

let filterValue = visApi().getSelectedValues("3fea8f5b80f342ffb5cc3ea53baed849")[0][0].split('-')[0],
    records; 
    
if (filterValue == '2022') {
    records = w.data.records.filter(el => el['column 0'] <= 113)
} else {
    records = w.data.records.filter(el => el['column 0'] <= 100)
}

!records.length ? records = [{}] : false; 
w.data.columns[0].captions[0] = "Филиал|РЭС";
console.log(w, filterValue, records);

TableRender({
    table: w.general,
    style: w.style,
    columns: w.data.columns,
    records: records,
    editMask: w.data.editMask,
    rowNames: w.data.rowNames,
    colNames: w.data.colNames,
    showToolbar: false
});

$("#" + "table-" + w.general.renderTo).find("th:nth-child(2)").css( "width", "50px");
$("#" + "table-" + w.general.renderTo).find("th").css({
    "position": "sticky",
    "top": "0", 
    "top": "-1px"
});
