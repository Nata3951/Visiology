let svg_icon = ` 
<svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 -1070 960 960" width="25" style="overflow:visible;
 preserveAspectRatio="xMidYMid meet">
<path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"/></svg>
`;

w.general.text = svg_icon;

TextRender({
    text: w.general,
    style: w.style
});
$('#' + w.general.renderTo + ' div').css({
    'border' : '1px solid #e0e0e0',
    'border-radius': '4px',
    "cursor": "pointer"
})
document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body').onclick = () => {
    visApi().getWidgetDataByGuid('0450d493b7d04ea3bfe3609304973b3f').then(function(info) {
        const list = info.data.rows
        const selected = visApi().getSelectedValues('0450d493b7d04ea3bfe3609304973b3f')
        const index = list.findIndex(item => item[0] === selected[0][0])
        const next = list[index - 1]
        visApi().setFilterSelectedValues('0450d493b7d04ea3bfe3609304973b3f', [next]);
    }) 
}

$('#' + w.general.renderTo + '> div > svg').css({
     'fill' : 'gray',
});
