var indicListId = '774219d065f84efa9478d9fc73289142';

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
