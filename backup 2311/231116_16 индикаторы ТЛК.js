// GuId виджета для обновления данного
const widgetRefreshGuId = '265ff1b26644444d996c4c4a7f0c4567';

// GuId переключателя гранулярности
const granularityBtnGuid = 'a3fe6ad12f4c46709930f645616e9d08';

const unitValue = visApi().getSelectedValues(granularityBtnGuid).length ? visApi().getSelectedValues(granularityBtnGuid)[0][0] : '';

visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + '_granularityListeneer', widgetGuid: granularityBtnGuid }, refresh); 

if (!unitValue) {
    setTimeout(() => {
        refresh();
    }, 200);
}

function refresh() {
    visApi().setFilterSelectedValues(widgetRefreshGuId, [['Сброс значения']], function (response) {
        visApi().setFilterSelectedValues(widgetRefreshGuId, [], function (response) {}); 
    });
}

const indicListId = '591411e8afa549dab2769bde969ed349';

// до какого знака округляем
let roundTo = 1;
const fact = w.data.values[1][0].toFixed(roundTo);
const plan = unitValue == "target_plan" ? w.data.values[0][0].toFixed(roundTo) : w.data.values[3][0].toFixed(roundTo);
const unit = "млрд руб";

let prd = w.data.rows[0][1];

// подготовим процент выполнения плана, с проверкой на наличие факта и плана
let percent = Math.round((fact/plan) * 100);
if (!fact || !plan ||!isFinite(fact / plan)) percent='н/д';


// подготовим цвет индикатора
let indicator_color; 
if (prd === 'год' || prd === '4 квартал')  indicator_color = '#4291D0';
else if (percent=='н/д') indicator_color = "#37474F";
else if (percent <= 100) indicator_color = "#049D4B";
else indicator_color = "tomato";


TextRender({
    text: w.general,
    style: w.style
});

let mainDiv = document.getElementById(w.general.renderTo);

let id = `widget-${w.general.renderTo}`;

// console.log('test id', w.general.renderTo)


// зададим стили для классов
mainDiv.innerHTML = `
    <style>
    #${id}  {
            font-family : Open Sans;
        }
        
    #${id} .fact {
        margin-left:20px;
        padding-bottom:0px;
        line-height: 1.25;
        font-size: 48px;
        font-weight: bold;
        color : ${indicator_color}
        }
        
    #${id} .fact-unit {
        font-size: 20px;
        padding-left:3px;
        font-weight: 600;
        }
        
    #${id} .plan-container {
        margin-left:20px;
        margin-right:10px; 
        font-size:18px; 
        color:#757575;  
        font-weight:500;
        }
        
    #${id} .plan {
       display:inline-block; 
       width:70%;
        }
        
    #${id} .plan-percent {
       display:inline-block; 
       width: 30%; 
       text-align:right; 
       font-size:18px; 
       font-weight:bold; 
       color : ${indicator_color}
    }
    
    </style>
`;

// добавим факт   
$('<div>', {
    class: 'fact',
    text: fact.split('.').join(','),
}).appendTo(`#${w.general.renderTo}`);

// добавим единицу измерения
$('<span>', {
    class: 'fact-unit',
    text: unit
}).appendTo(`#${w.general.renderTo} .fact`);

// добавим план
$('<div>', {
    class: 'plan-container',
}).appendTo(`#${w.general.renderTo}`);

$('<span>', {
    class: 'plan',
    text: `план: ${plan.split('.').join(',')} ${unit}`
}).appendTo(`#${w.general.renderTo} .plan-container`);

$('<span>', {
    class: 'plan-percent',
    text: isNaN(percent) ? percent : `${percent}%`
}).appendTo(`#${w.general.renderTo} .plan-container`);


$('#' + w.general.renderTo + "> div")
    .css({
        "cursor": "pointer"
    })

    .click(function() {
        $('#' + w.general.renderTo + '> div').css({});
        visApi().setFilterSelectedValues('2b1c6af988a7423fae1c5c269bba9e9d', [
            [w.data.rows[0][0]]
        ]);
        $('#' + indicListId).click();
    });

var original_bgc = $('#' + w.general.renderTo).css('background-color');
var original_bgc2 = $('#widget-header-' + w.general.renderTo).css('background-color');

$('#' + w.general.renderTo).hover(
    function() {
        $('#' + w.general.renderTo).css('background-color', '#E8EAF6');
        $('#widget-header-' + w.general.renderTo).css('background-color', '#E8EAF6');
        $('#' + w.general.renderTo + ' div a').css('color', '#ECEFF1');
    },
    function() {
        $('#' + w.general.renderTo).css('background-color', original_bgc);
        $('#widget-header-' + w.general.renderTo).css('background-color', original_bgc2);
        $('#' + w.general.renderTo + ' div a').css('color', w.style.color);
    }
);
