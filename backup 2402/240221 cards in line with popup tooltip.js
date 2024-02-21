let text = 'Действующих</br>договоров';


const sum = w.data.values[0].reduce(function (total, current) {
    return total + current;
}, 0);

const value = sum


const textWidth = '140px';

const container = document.getElementById(w.general.renderTo);

for (let j = 0; j < 2; j++) {
  const newCell = document.createElement("div");
  newCell.style.height = container.offsetHeight + "px";
  newCell.style.boxSizing = "border-box";
  newCell.style.float = "left";
  newCell.style.display = "flex";

  // Изменяем стиль для первого дочернего элемента
  if (j === 0) {
    newCell.style.justifyContent = "flex-start";
    newCell.style.paddingRight = "0";
  } else {
    newCell.style.justifyContent = "flex-end";
    newCell.style.paddingRight = "0"; 
  }

  newCell.style.alignItems = "center";
  container.appendChild(newCell);
}

$('#' + w.general.renderTo + ' div:nth-child(1)').css({
  'font-family': 'Open Sans',
  'font-size': '15px',
  'color': '#757575',
  'width': textWidth,
  'text-align': 'left',
});

$('#' + w.general.renderTo + ' div:nth-child(2)').css({
  'font-family': 'Open Sans',
  'font-size': '25px',
  'color': 'black',
  'float': 'right',
  'padding-right': '0' 
});

// Вставляем значения в нужные ячейки
$('#' + w.general.renderTo + ' div:nth-child(1)').html(text);
$('#' + w.general.renderTo + ' div:nth-child(2)').html(value); 

// $('#' + w.general.renderTo).css({backgroundColor : 'pink'})


// создадим и отформатируем tooltip

let tooltipText = "количество договоров со статусом 'Act' в sald_legal_contract";
// let tooltipWidth = 200;// Задаем ширину tooltip

let tooltipWidth=$('#' + w.general.renderTo).width();

let mainID = '#widget-' + w.general.renderTo;
const containerDiv = document.getElementById(w.general.renderTo);
let styleForTooltip = document.createElement('style');


styleForTooltip.innerHTML += `
        ${mainID} .va-widget-body-container::after {
            position: absolute;
            width: '${tooltipWidth}px';
            background-color: white;
            padding : 10px;
            content : "${tooltipText}";
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
        
            ${mainID} .va-widget-body-container:hover::after {
            opacity: 1;
            visibility: visible;
        }
    `
    
    containerDiv.appendChild(styleForTooltip);
    
// исправление выравнивания, чтобы одиночный виджет выглядел единообразно
// с карточками собранными в один блок


$('#widget-' + w.general.renderTo + ' .va-widget-body').css({
    display: 'flex',
    alignItems : 'flex-start',
});

$('#' + w.general.renderTo + ' div:nth-child(1)').css({
  'width': 'auto',
  paddingRight : 10,
});

