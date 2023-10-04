// если нужно добавить текст, пишем его в эту переменную
let newtext = "окрасить число или фон в зависимости от значения / добавить справа символ / показать min|max...";

// настройки шрифта и цвета заголовка, рамки сохранены в теме виджета 
ImageRender({image: w.general});

// создадим новый элемент с текстом
if (newtext.length > 0 && !$('#newtext').length) {
$(`#widget-10dd286c24c94df1be10e8490d75f5b3 > div.va-widget-body-container`).append(`<div id="newtext">${newtext}</div>`);
}

// если элемент с текстом уже существует - перезапишем текст
if ($('#newtext').length) {$('#newtext').text(newtext);}

$('#newtext').css({
    'font-size' : '12px',
    'font-family' : 'Open Sans',
    'color': '#666666',
    'text-align' : 'center',
    'padding-bottom' : '5px',
    });

// виджет
$(`#widget-${w.general.renderTo}`).css({
    'background-color' : 'white',
});

// padding для картинки
$(`#widget-${w.general.renderTo} div.va-widget-body`).css({
    'padding' : '10px',
});

// формат заголовка виджета
$(`#widget-${w.general.renderTo} div.va-widget-header-container`).css({
    'padding-left': '10px',
    'padding-top': '5px',
    'padding-bottom': '5px',
});

$(`#widget-${w.general.renderTo} a.va-widget-header`).css({
    'font-weight' : 600,
});

// on hover над заголовком 

let original_bgc = $(`#widget-${w.general.renderTo} div.va-widget-header-container`).css('background-color');  

$(`#widget-${w.general.renderTo} div.va-widget-header-container`).hover(
    function() {
        $(`#widget-${w.general.renderTo} div.va-widget-header-container`).css('background-color', 'gainsboro');
    },
    function() {
        $(`#widget-${w.general.renderTo} div.va-widget-header-container`).css('background-color', original_bgc);
    }
);
