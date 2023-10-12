//  фон виджета
 $(`#widget-${w.general.renderTo}`).css({
      'background-color': '#18324b',
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
    'color' : '#fafafa'
});
