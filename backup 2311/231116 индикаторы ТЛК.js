// GuId виджета для обновления данного
const widgetRefreshGuId = '265ff1b26644444d996c4c4a7f0c4567';

// GuId переключателя гранулярности
const granularityBtnGuid = 'a3fe6ad12f4c46709930f645616e9d08';

const unitValue = visApi().getSelectedValues(granularityBtnGuid).length ? visApi().getSelectedValues(granularityBtnGuid)[0][0] : '';

visApi().onSelectedValuesChangedListener({guid: w.general.renderTo + '_granularityListeneer', widgetGuid: granularityBtnGuid }, refresh); 

if (!unitValue) {
    setTimeout(() => {
        refresh();
    }, 500);
}

function refresh() {
    visApi().setFilterSelectedValues(widgetRefreshGuId, [['Сброс значения']], function (response) {
        visApi().setFilterSelectedValues(widgetRefreshGuId, [], function (response) {}); 
    });
}

const indicListId = '591411e8afa549dab2769bde969ed349';
const fact = w.data.values[1][0].toFixed(2);
const plan = unitValue == "target_plan" ? w.data.values[0][0].toFixed(2) : w.data.values[3][0].toFixed(2);
const unit = w.data.rows[0][1];

// подготовим процент выполнения плана, с проверкой на наличие факта и плана
let percent = Math.round((fact/plan) * 100);
if (fact / plan === 0 || !isFinite(fact / plan)) {
    percent = 0;
}
let indicator_color = percent >= 100 ? "#049D4B" : "tomato";


TextRender({
    text: w.general,
    style: w.style
});

let mainDiv = document.getElementById(w.general.renderTo);


// зададим стили для классов
mainDiv.innerHTML = `
    <style>
    body {
            font-family : Open Sans;
        }
        
    .fact {
        margin-left:20px;
        padding-bottom:0px;
        line-height: 1.1;
        color:${indicator_color};
        font-size: 48px;
        font-weight: bold;
        }
        
    .fact-unit {
        font-size: 20px;
        font-weight: 600;
        }
        
    .plan-container {
        margin-left:20px;
        margin-right:10px; 
        font-size:18px; 
        color:#757575;  
        font-weight:500;
        }
        
    .plan {
       display:inline-block; 
       width:70%;
        }
        
    .plan-percent {
       display:inline-block; 
       width: 30%; 
       text-align:right; 
       font-size:18px; 
       font-weight:bold; 
       color: ${indicator_color};
        }
        
    </style>
`;

// добавим факт   
$('<div>', {
    class: 'fact',
    text: fact.split('.').join(',')
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
    text: `${percent} %`
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
