// TLK KPI

var indicListId = '090acbe5f43c4908ad3a55aa8e5a829f';

w.general.text =(
'<div style="color:#666666; margin-left:20px;">' + 'на главную страницу' + '</div>'
);

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
    visApi().setFilterSelectedValues('2abdbce03885492a8868e0146efa727b', [], function (response) {});
    $('#' + indicListId).click();
});

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
