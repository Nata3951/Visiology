var indicListId = '774219d065f84efa9478d9fc73289142';
let fact = w.data.values[0][0].toFixed(1);
let plan = w.data.values[1][0].toFixed(1);
let unit = " млрд руб.";

if (+fact >= +plan) {
    
    w.general.text =(
        '<div style="margin-left:20px; ">' + fact  + '<b style=" font-size:20px; font-weight:600; margin-left:5px;">' + unit + '</b>'
        + '</div><div style="margin-left:20px; font-size:16px; color:grey; font-weight:500;">' + plan + unit + '</div>'
        );
    
    } else {
       w.general.text =(
        '<div style="color:tomato; margin-left:20px;">' + fact  + '<b style="color:tomato; font-weight:600; font-size:20px; margin-left:5px;">' + unit + '</b>'
        + '</div><div style="color:grey;  font-size:16px; font-weight:500;  margin-left:20px;">' + plan + unit + '</div>'
        );
    }


TextRender({
    text: w.general,
    style: w.style
});

$('#' + w.general.renderTo + " div")
.css({
    "cursor": "pointer"
})

.click(function () {
    $('#' + w.general.renderTo + ' div').css({
    });
    visApi().setFilterSelectedValues('2abdbce03885492a8868e0146efa727b', [[w.data.rows[0][0]]]);
    $('#' + indicListId).click();
});

var original_bgc = $('#' + w.general.renderTo).css('background-color');
var original_bgc2 = $('#widget-header-' + w.general.renderTo).css('background-color');

$('#' + w.general.renderTo).hover(
    function() {
        $('#' + w.general.renderTo).css('background-color', '#E8EAF6');
        $('#widget-header-' + w.general.renderTo).css('background-color', '#E8EAF6');
        $('#' + w.general.renderTo + ' div a').css('color', '#ECEFF1');
    },
    function() {
        $('#' + w.general.renderTo).css('background-color', original_bgc);
        $('#widget-header-' + w.general.renderTo).css('background-color', original_bgc2);
        $('#' + w.general.renderTo + ' div a').css('color', w.style.color);
    }
);
