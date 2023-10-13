let background =  '#18324b'
let azure = "#2196f3";
let orange_b = "#ff9800";
let turq = '#00bcd4';
let turq2 = '#3d90a8';
let purple = '#9c27b0';
let purple2 = '#6b328d';
let lime = '#cddc39';
let text1 = '#fafafa';
let text2 = '#9e9e9e';
// светофор
let red = '#ff5252';
let orange = '#ffb300';
let yellow = '#ffd740';
let green = '#aed581';

// bar chart
w.yAxis.OnTick = false; 
w.yAxis.endOnTick = false;
w.plotOptions.series.borderColor = 'transparent';
w.series[0].color = turq2;
w.series[1].color = azure;
w.series[2].color = orange_b;


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
