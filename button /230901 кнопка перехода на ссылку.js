TextRender({
    text: w.general,
    style: w.style
});

let str;
const industryId = '5506fd55577f45f6a5c2bba277e5a66f';
const lesseeId = '0450d493b7d04ea3bfe3609304973b3f';
function filterValues() { 
    str = '&lessee='+ 
    (visApi().getSelectedValues(lesseeId).length?visApi().getSelectedValues(lesseeId).map(el=>el[0]).join('_'):'');
    return str;
}

console.log(filterValues())

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

function pageTransition() {
    let protocol = self.location.protocol,
        hostName = self.location.hostname,
        dashId = 'dashboardGuid=d502e8e85ec34e53a6617d79a9c25283&sheetGuid=ecb82b90f8d54fcd9f0a4c6c58a98230&fit=true';
        
    console.log("protocol: ", protocol);
    console.log("hostName: ", hostName);
    console.log("dashId: ", dashId);
    
    window.top.location.href = protocol+"//"+hostName+"/viewer?"+dashId+filterValues();
}

$('#'+w.general.renderTo).css({'cursor':'pointer'}).click(pageTransition)
