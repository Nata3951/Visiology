// new
$('#widget-' + w.general.renderTo).css({
    'border-right': "2px solid #494b6f",
    'display': 'flex',
    'align-items': 'end',
    'justify-content': 'start',
});


$('#widget-' + w.general.renderTo + ' > div.va-widget-body-container > div').css({
});



// old

$('#widget-' + w.general.renderTo).css({
    'border-right': "2px solid #494b6f",
});

// align text at bottom
$('#widget-' + w.general.renderTo + ' > div.va-widget-body-container > div').css({
    'position' : 'absolute',
    'bottom' : 0,
});


TextRender({
    text: w.general,
    style: w.style
});

