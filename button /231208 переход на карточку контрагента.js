const lesseeId = 'ff1c604db8e3463b839902d00f9a68df';

const ArrowSvg = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="19px" height="19px" viewBox="2 -18 35 59"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
fill="#1c4680" stroke="none">
<path d="M277 373 c-4 -3 -7 -21 -7 -39 l0 -33 -102 -3 -103 -3 0 -55 0 -55
103 -3 102 -3 0 -34 c0 -18 4 -36 9 -39 4 -3 39 26 76 65 l68 70 -69 70 c-37
38 -69 69 -70 69 0 0 -4 -3 -7 -7z"/>
</g>
</svg>
`
$('#widget-' + w.general.renderTo).css({
    'border': '1px solid #1c4680',
    'border-radius' : '4px',
 });
w.general.text = '<span style="padding-left:5px;">Карточка контрагента ' + ArrowSvg + '</span>'

let styles = [];
var original_bgc = $('#' + w.general.renderTo).css('background-color');

$('#' + w.general.renderTo).hover(
    function() {
        $('#' + w.general.renderTo).css('background-color', '#E8EAF6');
        $('#' + w.general.renderTo + ' div a').css('color', '#ECEFF1');
    },
    function() {
        $('#' + w.general.renderTo).css('background-color', original_bgc);
        $('#' + w.general.renderTo + ' div a').css('color', w.style.color);
    }
);
TextRender({
    text: w.general,
    style: w.style
});
let str;

function filterValues() { 
    str = '&lessee='+ 
    (visApi().getSelectedValues(lesseeId).length?visApi().getSelectedValues(lesseeId).map(el=>el[0]).join('_'):'');
    return str;
}

console.log(filterValues())


function pageTransition() {
    let protocol = self.location.protocol,
        hostName = self.location.hostname,
        dashId = '/dashboardsViewer?sectionId=3&dashboardId=a3edc408d4534afa86bc850d3c860d4e&sheetId=5d4f134680a44cf6b0b007a52b902092';
        
    console.log("protocol: ", protocol);
    console.log("hostName: ", hostName);
    console.log("dashId: ", dashId);
    
    window.open(protocol+"//"+hostName + dashId+ filterValues(), '_blank');
    // window.top.location.href = protocol+"//"+hostName + dashId+ filterValues();
}

$('#'+w.general.renderTo).css({'cursor':'pointer'}).click(pageTransition)
