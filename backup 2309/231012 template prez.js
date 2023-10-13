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
w.tooltip.crosshairs = true;
w.tooltip.shared = true;
w.plotOptions.series.lineWidth = 4;

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
    'height' : '60px',
    'text-align' : 'left',
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
    "border-width" : "1px",
    'border-color' : border_color,
    "background-color" : table_background,
    "padding" : "3px 5px",
});

// ячейки таблицы: шрифт
$(`#table-${w.general.renderTo} td`)
    .css({
        'font' : '18px Open Sans',
        'color' : text1,
  });

// зебра
$(`#table-${w.general.renderTo} tbody tr:nth-child(odd)`)
.css("background-color", row_dark);

