let background =  '#18324b';


// светофор
let red = '#ff5252';
let orange = '#ffb300';
let yellow = '#ffd740';
let green = '#aed581';

// текст 
let text1 = '#fafafa';
let text2 = '#9e9e9e';

// таблица
let table_background = "#233c53";
let row_dark = '#00000030';
let border_color =  '#33465b';
let border_width = '1px';

// график 
let line = '#33465b';
let azure = "#2196f3";
let orange_b = "#ff9800";
let turq = '#00bcd4';
let turq2 = '#3d90a8';
let purple = '#9c27b0';
let purple2 = '#6b328d';
let lime = '#cddc39';




// bar chart
w.yAxis.OnTick = false; 
w.yAxis.endOnTick = false;
w.plotOptions.series.borderColor = 'transparent';
// w.tooltip.crosshairs = true;
// w.tooltip.shared = true;
// w.plotOptions.series.lineWidth = 4;

w.xAxis.labels.style = ({
    'color' : text2,
    'fontSize': '18px',
    'fontFamily' : 'Open Sans',
    'wordBreak' : 'break-all', 
    'textOverflow': 'allow'
});

w.yAxis.labels.style = ({
    'color' : text2,
    'fontSize': '18px',
    'fontFamily' : 'Open Sans',
    'wordBreak' : 'break-all', 
    'textOverflow': 'allow'
});

w.plotOptions.series.dataLabels.style = ({
    'color' : text1,
    'fontSize': '18px',
    'fontFamily' : 'Open Sans',
});


//  фон виджета
 $(`#widget-${w.general.renderTo}`).css({
      'background-color': background,
      'border-radius' : '8px'
     });

// поля виджета
 $(`#widget-${w.general.renderTo}  > div.va-widget-body-container`).css({
      'padding': '10px',
    });
 
// заголовок виджета: отступы и высота
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'padding': '15px',
    'height' : '70px',
    'text-align' : 'left',
});

// текст в заголовке виджета
$(`#widget-${w.general.renderTo} .va-widget-header`)
    .html(`<span>Отгружено за период</span> <span style='font-weight:normal'>тонн</span>`)
    .css({
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items':'end',
    });

// заголовок виджета: шрифт
$(`#widget-${w.general.renderTo} .va-widget-header`).css({
    'text-align' : 'left',
    'font' : 'bold 22px Open Sans',
    'color' : text1
});

// ТАБЛИЦА
// шапка
$(`#table-${w.general.renderTo} > thead  th`).css({ 
    'text-align' : 'left',
    "color": text1,
    'word-break' : 'normal',
    "background-color" : table_background,
    "padding" : "3px 5px",
});

// фиксируем шапку
$('#table-' + w.general.renderTo).css({'border-collapse':'initial'});
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});

// зебра
$(`#table-${w.general.renderTo} tbody tr:nth-child(odd)`)
.css("background-color", row_dark);

// ячейки таблицы: шрифт, границы
$(`#table-${w.general.renderTo} td`)
    .css({
        'font' : '18px Open Sans',
        'color' : text1,
        'border-color' : border_color,
        'border-width' : '1px',
    });

// ячейки: выравнивание, padding; 0-based
// $('#table-' + w.general.renderTo + ' tbody tr')
//     .each(function(index,item){
//     $(item.children[4]).css({"text-align": "center"});
//     $(item.children[5]).css({"text-align": "center"});
//     $(item.children[6]).css({"text-align": "right"});
//     $(item.children).css({"padding-left": "10px", "padding-right": "10px"});
// });

// ГРАФИК 
w.yAxis.gridLineColor = line;//линии, направляющие
w.yAxis.gridLineWidth = 1;
w.xAxis.lineColor = line;
w.plotOptions.bar = { borderWidth: 0 };
w.series[0].color = red;

// w.general.marginLeft = 300; // расстояние до оси






