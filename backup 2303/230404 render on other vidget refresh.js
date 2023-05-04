// GuId фильтра Период
const filterDateGuId = '118ede0f786a4a20970d6d290e7fb273';
// GuId фильтра Филиал
const filterFilialGuId = '0aa7ca9712474361a7a1957ff040b1fa';
// GuId фильтра Категория
const filterCategoriesGuId = 'e44b24ead65a492f98fcb0aa5325c33d';
// GuId виджета "Данные за все периоды"
const widgetDataGuId = 'bf2725eeb63b4517b2a5a8ecb32efcea'; //Персонал

visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + 'filterDateGuId', widgetGuid: filterDateGuId }, render)
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + 'filterFilialGuId', widgetGuid: filterFilialGuId }, render)
// visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + 'filterCategoriesGuId', widgetGuid: filterCategoriesGuId }, render)


function render() {
    
    const filterDateValue = visApi().getSelectedValues(filterDateGuId)
    console.log('FilterValue => ', filterDateValue)
    if (filterDateValue.length) {
        const dateArr = filterDateValue
        visApi().getWidgetDataByGuid(widgetDataGuId).then(function (widgetData) {
            const data = widgetData.data
            console.log(data, dateArr)
            const indexArr = []
            dateArr.forEach(el => {  
                let value = el[0]
                let formatEl = value.split('-')[1] == '12' ? value = value.split('-')[0] : value = "6 мес " + value.split('-')[0]
                formatEl = formatEl.split(' ').length === 1 ? formatEl + ' год' : formatEl
                const index = data.rows.findIndex(row => row[0] === formatEl)
                if (index + 1) {
                    indexArr.push(index)
                }
            })
            indexArr.sort((a, b) => a - b)
            // Выбираем значения для данного индикатора (values[0] - столбец баллов, indexArr[0] - строка с датой, где [0] - ближайшая к текущей дате)
            const value = data.values[0][indexArr[0]]
            drawText(value ? value.toFixed(4) : '')
        })
    } else {
        drawText('н/д')
    }
    
} 
setTimeout(render, 1000)

function drawText(value) {
    w.general.text = value
    TextRender({
        text: w.general,
        style: w.style
    });
}
