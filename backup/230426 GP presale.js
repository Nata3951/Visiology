// раскраска в зависимости от значения виджета

if (w.data.values[0]<=0){
    w.style.color = '#aed581'
    w.general.text = 'Без отставания'
} else {
    
    w.style.color = '#ff5252'
    w.general.text = 'Отставание дней: '+ w.data.values[0]
}


TextRender({
    text: w.general,
    style: w.style
});
