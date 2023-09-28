ImageRender({
    image: w.general
});


// виджет
$(`#widget-${w.general.renderTo}`).css({
    'background-color' : 'white',
});

// padding для картинки
$(`#widget-${w.general.renderTo} > div`).css({
    'padding' : '5px',
});

// формат заголовка виджета
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'height': '50px',
    'padding-left': '10px',
    'padding-top': '5px',
    'padding-bottom': '5px',
    'background-color' : '#3f51b5',


});

$(`#widget-${w.general.renderTo} a.va-widget-header`).css({
    'font-family' : 'Open Sans',
    'font-size' : '16px',
    'font-weight' : 600,
    'color' : 'white',

});

////////
TextRender({
    text: w.general,
    style: w.style
});


$(`#widget-${w.general.renderTo}`).css({
    'background-color' : 'white',
});

// расположить текст внизу и выровнять по центру
$('#widget-' + w.general.renderTo + ' > div.va-widget-body-container > div').css({
    'position' : 'absolute',
    'bottom' : '10px',
    'padding' : '5px',
});

// формат заголовка виджета
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'height': '70px',
    'padding-left': '10px',
    'padding-top': '5px',
    'padding-bottom': '5px',
    'background-color' : '#4dd0e1',


});

$(`#widget-${w.general.renderTo} a.va-widget-header`).css({
    'font-family' : 'Open Sans',
    'font-size' : '16px',
    'font-weight' : 600,
    'color' : 'white',

});
