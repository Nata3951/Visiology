w.data.rows = w.data.rows.slice(-1);
w.data.values = w.data.values.map((row) => row.slice(-1));
let svgIcon = `
<svg version="1.0" width="20px" height="20px" viewBox="-10 0 50 50" style="overflow:visible;
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(-20,63) scale(0.1,-0.1)"
fill="#049d4b" stroke-width="20" stroke="#049d4b">
<path d="M411 895 c-214 -47 -352 -260 -307 -474 66 -318 453 -435 682 -207
226 227 111 615 -202 681 -82 17 -90 17 -173 0z m216 -77 c79 -29 162 -112
191 -191 29 -78 29 -176 0 -254 -30 -80 -112 -162 -193 -192 -87 -33 -198 -27
-278 14 -157 79 -228 264 -165 432 28 77 112 162 188 191 76 29 180 29 257 0z"/>
<path d="M575 530 l-110 -110 -65 65 -66 66 -22 -24 -22 -23 88 -87 87 -87
138 138 c133 133 137 139 119 155 -10 9 -23 17 -28 17 -5 0 -59 -49 -119 -110z"/>
</g>
</svg>
`;
let svgIcon2 = `
<svg version="1.0" width="20px" height="20px" viewBox="-10 0 50 50" style="overflow:visible;
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(-20,63) scale(0.1,-0.1)"
fill="#ff1744" stroke-width="20" stroke="#ff1744">
<path d="M386 944 c-225 -54 -376 -286 -338 -517 62 -367 512 -513 773 -252
329 330 18 879 -435 769z m219 -39 c312 -81 418 -473 191 -701 -241 -240 -651
-107 -709 230 -50 295 226 546 518 471z"/>
<path d="M324 669 c-4 -6 28 -45 72 -90 l79 -79 -80 -80 c-63 -63 -77 -82 -67
-92 10 -10 29 4 92 67 l80 80 80 -80 c63 -63 82 -77 92 -67 10 10 -4 29 -67
92 l-80 80 80 80 c63 63 77 82 67 92 -10 10 -29 -4 -92 -67 l-80 -80 -78 78
c-42 42 -80 77 -84 77 -4 0 -10 -5 -14 -11z"/>
</g>
</svg>
`;
let svgIcon3 = `
<svg version="1.0" width="20px" height="20px" viewBox="-10 0 50 50" style="overflow:visible;
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(-20,63) scale(0.1,-0.1)"
fill="#ffea00" stroke-width="20" stroke="#ffea00">
<path d="M386 944 c-225 -54 -376 -286 -338 -517 62 -367 512 -513 773 -252
329 330 18 879 -435 769z m219 -39 c312 -81 418 -473 191 -701 -241 -240 -651
-107 -709 230 -50 295 226 546 518 471z"/>
<path d="M480 630 l0 -110 -110 0 c-103 0 -110 -1 -110 -20 0 -19 7 -20 110
-20 l110 0 0 -110 c0 -103 1 -110 20 -110 19 0 20 7 20 110 l0 110 110 0 c103
0 110 1 110 20 0 19 -7 20 -110 20 l-110 0 0 110 c0 103 -1 110 -20 110 -19 0
-20 -7 -20 -110z"/>
</g>
</svg>
`;
$("#"+w.general.renderTo).css
('box-shadow', '2px 2px 6px rgba(0, 0, 0, 0.4)');
if (w.data.values == 'D') {
$('#' + w.general.renderTo).css({
     'border' : '1px solid #ff1744'
});
w.general.text = '<div style="padding:20px 20px;">Вывод:</div>' +
'<div style="padding:20px 20px;">'+svgIcon2+'</div>' +
'<div style="padding:20px 20px;font-weight:500">Рейтинг: '+w.data.values+'</div>'+
'<div style="padding:20px 20px;font-weight:500;font-size:14px">Преддефолтное состояние.</div>'
} if (w.data.values == 'CC' || w.data.values == 'С') {
$('#' + w.general.renderTo).css({
     'border' : '1px solid #ff1744'
});
w.general.text = '<div style="padding:20px 20px;">Вывод:</div>' +
'<div style="padding:20px 20px;">'+svgIcon2+'</div>' +
'<div style="padding:20px 20px;font-weight:500">Рейтинг: '+w.data.values+'</div>'+
'<div style="padding:20px 20px;font-weight:500;font-size:14px">Уровень риска высокий. Прогноз негативный.</div>'
} if (w.data.values == 'CCC') {
$('#' + w.general.renderTo).css({
     'border' : '1px solid #ff1744'
});
w.general.text = '<div style="padding:20px 20px;">Вывод:</div>' +
'<div style="padding:20px 20px;">'+svgIcon2+'</div>' +
'<div style="padding:20px 20px;font-weight:500">Рейтинг: '+w.data.values+'</div>'+
'<div style="padding:20px 20px;font-weight:500;font-size:14px">Уровень риска высокий. Прогноз стабильный.</div>'
} if (w.data.values == 'B') {
$('#' + w.general.renderTo).css({
     'border' : '1px solid #ffea00'
});
w.general.text = '<div style="padding:20px 20px;">Вывод:</div>' +
'<div style="padding:20px 20px;">'+svgIcon3+'</div>' +
'<div style="padding:20px 20px;font-weight:500">Рейтинг: '+w.data.values+'</div>'+
'<div style="padding:20px 20px;font-weight:500;font-size:14px">Уровень риска средний. Прогноз негативный.</div>'
} if (w.data.values == 'BB') {
$('#' + w.general.renderTo).css({
     'border' : '1px solid #ffea00'
});
w.general.text = '<div style="padding:20px 20px;">Вывод:</div>' +
'<div style="padding:20px 20px;">'+svgIcon3+'</div>' +
'<div style="padding:20px 20px;font-weight:500">Рейтинг: '+w.data.values+'</div>'+
'<div style="padding:20px 20px;font-weight:500;font-size:14px">Уровень риска средний. Прогноз стабильный.</div>'
} if (w.data.values == 'BBB') {
$('#' + w.general.renderTo).css({
     'border' : '1px solid #ffea00'
});
w.general.text = '<div style="padding:20px 20px;">Вывод:</div>' +
'<div style="padding:20px 20px;">'+svgIcon3+'</div>' +
'<div style="padding:20px 20px;font-weight:500">Рейтинг: '+w.data.values+'</div>'+
'<div style="padding:20px 20px;font-weight:500;font-size:14px">Уровень риска средний. Прогноз позитивный.</div>'
} if (w.data.values == 'A') {
$('#' + w.general.renderTo).css({
     'border' : '1px solid #049d4b'
});
w.general.text = '<div style="padding:20px 20px;">Вывод:</div>' +
'<div style="padding:20px 20px;">'+svgIcon+'</div>' +
'<div style="padding:20px 20px;font-weight:500">Рейтинг: '+w.data.values+'</div>'+
'<div style="padding:20px 20px;font-weight:500;font-size:14px">Уровень риска низкий. Прогноз негативный.</div>'
} if (w.data.values == 'AA' || w.data.values == 'AAA') {
$('#' + w.general.renderTo).css({
     'border' : '1px solid #049d4b'
});
w.general.text = '<div style="padding:20px 20px;">Вывод:</div>' +
'<div style="padding:20px 20px;">'+svgIcon+'</div>' +
'<div style="padding:20px 20px;font-weight:500">Рейтинг: '+w.data.values+'</div>'+
'<div style="padding:20px 20px;font-weight:500;font-size:14px">Уровень риска низкий. Прогноз стабильный.</div>'
}
TextRender({
    text: w.general,
    style: w.style
});
