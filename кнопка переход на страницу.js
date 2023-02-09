TextRender({
    text: w.general,
    style: w.style
});

var $container = $('#' + w.general.renderTo)
.css({'cursor': "pointer"});
function onHover(){
    $container.css({'text-decoration': "underline"});
}

function onOut(){
     $container.css({'text-decoration': ""});
}
var url = "/viewer?dashboardGuid=1f07ad7648b04be2a3a398b202d530ed&showNav=true&fit=true&sheetGuid=d57c061da097497e8dc002400fe73e52";
//var url = "/dashboardsViewer?sectionId=1&dashboardId=1f07ad7648b04be2a3a398b202d530ed&sheetId=d57c061da097497e8dc002400fe73e52";
var type = "frame";
$container.hover(onHover, onOut);
$container.on('click', function(){
            switch (type){
                case 'frame':
                    location.href = url;
                    break;
                case 'top':
                    window.top.location.href = url;
                    break;
                case 'new':
                    window.open(url, '_blank');
                    break;
            }
    });

