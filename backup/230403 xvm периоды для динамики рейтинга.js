const firstPeriodFilter = '118ede0f786a4a20970d6d290e7fb273'; 
const secondPeriodFilter = '5c6029c2ffc4445d93026681293ba36b';

     
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo+'-listener1', widgetGuid: firstPeriodFilter}, () => {filterValue()})
visApi().onSelectedValuesChangedListener({guid: w.general.renderTo+'-listener2', widgetGuid: secondPeriodFilter}, () => {filterValue()})
w.data.data.forEach(el => el.text.split('-')[1] == '12' ? el.text = el.text.split('-')[0] : el.text = "6 мес " + el.text.split('-')[0])

function filterValue() {
    let firstPeriodSelected = visApi().getSelectedValues(firstPeriodFilter)[0];
 
    let secondPeriodSelected = visApi().getSelectedValues(secondPeriodFilter)[0];
  
   // let data = [firstPeriodSelected, secondPeriodSelected].map(el => el.text.split('-')[1] == '12' ? el.text = el.text.split('-')[0] : el.text = "6 мес " + el.text.split('-')[0])
    
    console.log('firstPeriodSelected: ', firstPeriodSelected)
    console.log('secondPeriodSelected: ', secondPeriodSelected)
    
    visApi().setFilterSelectedValues(w.general.renderTo, [firstPeriodSelected, secondPeriodSelected]);
  
}

console.log('w: ', w)

FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: w.data
});

filterValue()
