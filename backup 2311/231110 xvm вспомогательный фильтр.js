// Guid фильтра: "Период базовый"
const firstPeriodFilter = '204f7adb0a664500a1aece2e7e4629d9';  
// Guid фильтра: "Период сравнения"
const secondPeriodFilter = '1e2bdf0f7eba4d578f4721696c4b5f7a'; 

// Подписки на изменения выбранных значений в фильтрах 
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo+'-listener1', widgetGuid: firstPeriodFilter}, (info) => {filterValue(info)});
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo+'-listener2', widgetGuid: secondPeriodFilter}, () => {filterValue()});


// Функция установки выбранных значений в фильтрах периодов
function filterValue(value) {
    let firstPeriodSelected = visApi().getSelectedValues(firstPeriodFilter)[0];
    let secondPeriodSelected = [''];
    
    
    if (value) {
        const dateArr = firstPeriodSelected[0].split(' ');
        
        if (dateArr.length === 3) {
            secondPeriodSelected = [`${dateArr[0]} ${dateArr[1]} ${Number(dateArr[2]) - 1}`];
        } else if (dateArr.length === 2) {
            secondPeriodSelected = [`${dateArr[0]} ${Number(dateArr[1]) - 1}`];
        }
        
    } else {
        secondPeriodSelected = visApi().getSelectedValues(secondPeriodFilter)[0];
    }
    
    // Установка полученных значений в фильтр
    visApi().setFilterSelectedValues(w.general.renderTo, [firstPeriodSelected, secondPeriodSelected]);
}

// console.log('w: ', w)

// Функция отрисовки фильтра
FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: w.data
});

// Вызов функции установки выбранных значений
filterValue();
