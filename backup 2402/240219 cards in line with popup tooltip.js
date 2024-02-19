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

let card1 = new Card (   
        "Действующих </br>договоров",
        w.data.values[0].reduce((acc, val) => acc + val),
        "Количество договоров со статусом 'Act' в sald_legal_contract"
        );
        
let card2 = new Card (   
        "Переданных </br>в собственность",
        w.data.values[1].reduce((acc, val) => acc + val, 0),
        "Количество договоров со статусом 'End' в sald_legal_contract при условии отсутствия ПДЗ"
    );

let card3 = new Card (   
    'Лизинговый</br>портфель, млн руб',
    Math.round(w.data.values[2].reduce((acc, val) => acc + val, 0)).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' '),
    "Разница между объемом обязательств и фактическими оплатами"
    );

let card4 = new Card (  
    'Объем оплат,<br> млн руб',
    Math.round(w.data.values[3].reduce((acc, val) => acc + val, 0)).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' '),
    "Сумма фактических платежей контрагента в sald_potok_lp_plan_fact_full"
    );
    
let payment_pct = (
    w.data.values[3].reduce((acc, val) => acc + val, 0) / w.data.values[4].reduce((acc, val) => acc + val, 0) * 100
    ).toFixed();
    
let card5 = new Card (  
    '% оплаты</br>обязательств',
    payment_pct,
    "TBD - сумма фактических платежей деленная на сумму запланированных платежей"
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

let tooltipWidth = [];

[card1, card2, card3, card4, card5].forEach((el, ind) =>  {
    
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
        // .css({
            // backgroundColor : 'gold',
        // })
        .appendTo(lastBox);
 
// добавим значение индикатора 
     $(`<div> ${el.value} </div>`, {class: 'value',})
        .css({
            fontSize : 25,
            color : black,
            // backgroundColor : 'pink',
            paddingLeft : 10,
        })
        .appendTo(lastBox);
        
// добавим тултип

let mainID = '#widget-' + w.general.renderTo;
let box_ = `#widget-${w.general.renderTo} .box_${ind}`;

let styleForTooltip = document.createElement('style');
// let tooltipWidth1 = document.getElementById(w.general.renderTo).offsetHeight;

tooltipWidth[ind]=$(box_).width();

console.log('test width', tooltipWidth);

styleForTooltip.innerHTML += `
        ${box_}::after {
            position: absolute;
            width: ${tooltipWidth[ind]}px;
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



