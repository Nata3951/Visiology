let red = '#ff1744',
    green = '#049D4B',
    grey = '#757575',
    black = '#212121';
    
// создадим объекты для карточек
function Card (name, value, tooltip) {
    this.name = name;
    this.value = value;
    this.tooltip = tooltip;
}

let plan = w.data.values[0].reduce((acc, val) => acc + val, 0);
let fact = w.data.values[1].reduce((acc, val) => acc + val, 0);
let payment_pct = plan ? (fact / plan  * 100).toFixed() : '';

let card1 = new Card (   
        "Собираемость</br>платежей, %",
        payment_pct,
        "Сумма фактических платежей с наступившей плановой датой  / сумму плановых платежей с наступившей отчетной датой"
        );
        
let plan_region = w.data.values[2].reduce((acc, val) => acc + val, 0);
let fact_region = w.data.values[3].reduce((acc, val) => acc + val, 0);
let payment_pct_region = plan_region ? (fact_region / plan_region  * 100).toFixed() : '';
        
let card2 = new Card (   
        "Собираемость</br>в регионе, %",
        payment_pct_region,
        "Значение показателя собираемости по всем контрагентам с регионом выбранного контрагента"
    );

let card3 = new Card (   
    'Просроченных</br>платежей',
    Math.round(w.data.values[4].reduce((acc, val) => acc + val, 0)).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' '),
    "TBC"
    );
    

let total = w.data.values[5].reduce((acc, val) => acc + val, 0);
let timely = w.data.values[6].reduce((acc, val) => acc + val, 0);
let timely_pct = total ? (timely / total  * 100).toFixed() : '';

let card4 = new Card (  
    '% оплат</br>в срок',
    timely_pct,
    "доля платежей (в рублях) когда фактическая дата превышала/была равна плановой дате от общего объема фактических платежей"
    );

    
// отформатируем основной контейнер
$(`#widget-${w.general.renderTo} .va-widget-body`)
    .css({
        display : 'flex',
        'flex-direction' : 'row',
        'justify-content' : 'space-between',
        'align-items' : 'center',
        fontFamily : 'Open Sans',
        fontSize : 16,
        color : grey,
    });

[card1, card2, card3, card4].forEach((el, ind) =>  {
    
// добавим контейнер для данных 
    $('<div>', {class: `box  box_${ind}`,})
    .css({
        display : 'flex',
        'flex-direction' : 'row',
    })
    .appendTo(`#widget-${w.general.renderTo} .va-widget-body`); 
    
 let lastBox = $(`#widget-${w.general.renderTo} .box`).last(); 
 
//  добавим название индикатора
     $(`<div> ${el.name} </div>`, {class: 'name',})
        .appendTo(lastBox);
 
// добавим значение индикатора 
     $(`<div> ${el.value} </div>`, {class: 'value',})
        .css({
            fontSize : 25,
            color : black,
            paddingLeft : 15,
            paddingRight : 5,
            'white-space' : 'nowrap',
        })
        .appendTo(lastBox);
        
// добавим тултип

let mainID = '#widget-' + w.general.renderTo;
let box_ = `#widget-${w.general.renderTo} .box_${ind}`;
let styleForTooltip = document.createElement('style');

let tooltipWidth=$(box_).width();

console.log('test width', tooltipWidth);

styleForTooltip.innerHTML = `
        ${box_}::after {
            position: absolute;
            width: ${tooltipWidth}px;
            background-color: white;
            padding : 10px;
            content : "${el.tooltip}";
            opacity: 0;
            visibility: hidden;
            top: calc(100% + 15px);
            display: block;
            border: 1px solid #ccc;
            border-radius : 10px;
            z-index: 99;
            box-shadow: 2px 2px 2px #eee;
            font-family: Open Sans;
        }
        
            ${box_}:hover::after {
            opacity: 1;
            visibility: visible;
        }
   `
$(`#widget-${w.general.renderTo}`).append(styleForTooltip);
        
})



