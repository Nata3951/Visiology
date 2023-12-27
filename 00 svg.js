

// vertical align
// https://stackoverflow.com/questions/32030276/aligning-an-svg-inline-with-text


const ArrowSvg =  `<svg class='icon27' fill="#8da2bf" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	   width="1.1em" height="1.1em" viewBox="0 0 450 450"
	 >
<g>
	<path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
		c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
		c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
		c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
		c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/>
</g>
</svg>
`

w.general.text = 'Предпосылки модели ️' + ArrowSvg


TextRender({
    text: w.general,
    style: w.style
});


$(`#widget-${w.general.renderTo} .va-widget-body`).css({
    'display': 'flex',
    'align-items' : 'center',
    'background-color' : 'green',
});

$(`#widget-${w.general.renderTo} .va-widget-body div`).css({
   'height' : '1.5em',
   'text-align' : 'center',
    'background-color' : 'gold',
    'padding-top' : 3,

});

$(`#widget-${w.general.renderTo} .icon27`).css({
    'background-color' : 'white',
    'vertical-align' : 'middle'
});
