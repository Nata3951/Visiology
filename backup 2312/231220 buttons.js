

TextRender({
    text: w.general,
    style: w.style
});

const mainWidget = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body');
mainWidget.style.cursor = 'pointer';

let originalBackground = $('#' + w.general.renderTo).css('background-color');

$('#' + w.general.renderTo).hover(
    function () {
        $(this).css({'background-color' : 'white'});
     },
     function () {
        $(this).css({'background-color' : originalBackground});
     }
);

mainWidget.addEventListener('click', function () {
    goToSheetByNumber(2);
})

function goToSheetByNumber(sheetNumber) {
    $("#va-sheet-tabs>li:nth-child(" + sheetNumber + ")").trigger("click");
}

// filter

$(`#widget-${w.general.renderTo} .va-widget-body`).hover(
    function () {
        $(this).find('svg').css({'fill' : '#06325F'});
     },
     function () {
        $(this).find('svg').css({'fill' : fill});
     }
);
