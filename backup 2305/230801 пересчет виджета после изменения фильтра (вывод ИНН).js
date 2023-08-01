const filterGuid = '6a680a9c78b44ecaa2c7937ba28f32b3'; // Контрагент
// console.log('test ', w);

visApi().onSelectedValuesChangedListener({ guid: w.general.renderTo, widgetGuid: filterGuid }, render);

function render() {
  const selectedValues = visApi().getSelectedValues(filterGuid);
  const valueName = selectedValues.length ? selectedValues[0][0] : '';
  const targetRowIndex = w.data.rows.findIndex(el => el[0] === valueName);
  const valueSecondName = (targetRowIndex + 1) ? w.data.rows[targetRowIndex][1] : '';
  const valueINN = ((targetRowIndex > 0) && /\d/.test(w.data.rows[targetRowIndex][2])) ? w.data.rows[targetRowIndex][2] : 'отсутствует';
  
  
  const oniTotalMap = {
    'Авиация': w.data.values[1][1],
    'Авто и ДСТ': w.data.values[1][2],
    'Водный транспорт': w.data.values[1][3],
    'Ж/Д Транспорт': w.data.values[1][4],
    'Прочее': w.data.values[1][5],
    'Цифровые активы': w.data.values[1][6],
  };
if (targetRowIndex > 0) {
  const oniTotal = oniTotalMap[w.data.rows[7][1]] || w.data.values[1][0];
  w.general.text = `
    <span style="color:#212121;font-weight:bold;padding-left:0px">${valueName}, ИНН ${valueINN}</span> 
    | <span style="color:#212121;font-weight:bold">${valueSecondName}</span> 
    | Доля в портфеле отрасли: <span style="color:#212121;font-weight:bold">${(w.data.values[0][7] / oniTotal * 100).toFixed(2).split('.').join(',')}%</span>
    `;
} else {
w.general.text = `<span style="color:#212121;font-weight:bold;padding-left:0px">${valueName}</span>`; 
}
  TextRender({
    text: w.general,
    style: w.style,
  });
}

setTimeout(() => {
  render();
}, 100);
