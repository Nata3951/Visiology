let fill = 'grey'

// height="30px" fill=${fill}



let icon = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" fill=${fill} viewBox="0 -960 960 960" >
<path d="m304-82-56-57 343-343-343-343 56-57 400 400L304-82Z"/></svg>`;

TextRender({
    text: w.general,
    style: w.style
});


$(`#widget-${w.general.renderTo} .va-widget-body`).css({
    'display':'flex',
    'justify-content': 'space-between',
    'align-items':'center',
    'padding' : '0px 20px',
})

$(`#widget-${w.general.renderTo} .va-widget-body div`).first().css({
    'width':'70%',
    'text-align':'left',
});

    $('<div>', {
        class: 'icon',
    })
    .html(icon)
    .appendTo($(`#widget-${w.general.renderTo} .va-widget-body`));
    
