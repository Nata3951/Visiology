// привести значение и год в колонки!

const filterIdForTable = '4334a86edb1840f6ad727902c2b6b8ef'
//цвет бара
const barColor = '#4db6ac'

const thisId = '#widget-' + w.general.renderTo + ' .va-widget-body'
document.querySelector(thisId).innerHTML = `
    <input type='text' id='slider_${w.general.renderTo}' value='' />
`
console.log(w)
let minYear = ''
let maxYear = ''
let yearsArr = []
w.data.cols.forEach(col=>{
    yearsArr.push(col[1])
})
minYear = Math.min(...yearsArr)
maxYear = Math.max(...yearsArr)
console.log(yearsArr)
$(`#slider_${w.general.renderTo}`).ionRangeSlider({
    min: minYear,
    max: 2033,
    from: minYear,
    to: 2033,
    type: 'double',
    grid: false,
    skin: 'flat',
    hide_min_max: false,
    postfix: " г", 
    onFinish: setFilterValues, 
    onStart: setFilterValues,
    prettify_enabled: false
})
function setFilterValues(data) {
    yearsArr.push('2033')
    let minY =  data.from
    let maxY = data.to
    console.log(maxY, minY)
    let selectedYears = []
    let findedIndexFrom = yearsArr.findIndex(el=> el === String(minY))
    let findedIndexTo = yearsArr.findIndex(el=> el === String(maxY))
    if(findedIndexTo < 0){
        selectedYears = yearsArr.slice(findedIndexFrom)
    }else{
        selectedYears = yearsArr.slice(findedIndexFrom, findedIndexTo + 1)
    }
    console.log(selectedYears)
    selectedYears = selectedYears.map(year=>[year])
    console.log(findedIndexFrom, findedIndexTo)
    
    visApi().setFilterSelectedValues(filterIdForTable, selectedYears, function (response) {});


}

$('#widget-' + w.general.renderTo + ' .irs-line').css({
    'background': 'lightgray'
});

$('#widget-' + w.general.renderTo + ' .irs-handle>i:first-child').css({
    'background-color': barColor
});

$('#widget-' + w.general.renderTo + ' .irs-bar').css({
    'background-color': barColor,
    'border' : 'none'
});

$('#widget-' + w.general.renderTo + ' .irs-from').css({
    'background-color': barColor,
    'font-size': '12px',
});

$('#widget-' + w.general.renderTo + ' .irs-to').css({
    'background-color': barColor,
    'font-size': '12px',
});
$('#widget-' + w.general.renderTo + ' .irs-min').css({
    'font-size': '12px',
});
$('#widget-' + w.general.renderTo + ' .irs-max').css({
    'font-size': '12px',
});
$('<style>').html(`#widget-${w.general.renderTo} .irs-from::before {
    border-top-color: ${barColor} !important;
    }`).appendTo($(`#widget-${w.general.renderTo}`))
    
$('<style>').html(`#widget-${w.general.renderTo} .irs-to::before {
    border-top-color: ${barColor} !important;
    }`).appendTo($(`#widget-${w.general.renderTo}`))
