const imageID = '9e7565f8ae57428a88a9349fd061a8ce'; // id картинки для показа

const lesseeId = 'ff1c604db8e3463b839902d00f9a68df';

const ArrowSvg =  `<svg class='icon' fill="#8da2bf" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
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

let styles = [];
var original_bgc = $('#' + w.general.renderTo).css('background-color');

TextRender({
    text: w.general,
    style: w.style
});
let str;

$('#widget-' + w.general.renderTo).css({
    'border': '1px solid #1c4680',
    'border-radius' : '4px',
 });

$(`#widget-${w.general.renderTo} .va-widget-body`).css({
    'display': 'flex',
    'align-items' : 'center',
    'cursor': 'pointer'
    // 'background-color' : 'pink',
});

$(`#widget-${w.general.renderTo} .va-widget-body div`).css({
   'height' : 'auto',
   'text-align' : 'center',
});

$(`#widget-${w.general.renderTo} .icon`).css({
    'vertical-align' : 'middle'
});

const mainImg = document.querySelector('#widget-' + imageID);

document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body').addEventListener('click', () => {
    mainImg.style.top = '100px';
})
