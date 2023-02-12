// VERSION 1

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


// VERSION 2

ImageRender({
    image: w.general
});

$('#' + w.general.renderTo).hover(
    function mouseenter() {
        $('#' + w.general.renderTo).children().css('background', 'url("https://rosseti.polyanalitika.ru/corelogic/api/query/image?fileGuid=4acc84b4fb894287838c97e143827c39&access_token=NoAuth") center center / contain no-repeat')
    },
    function mouseleave() {
        $('#' + w.general.renderTo).children().css('background', 'url("https://rosseti.polyanalitika.ru/corelogic/api/query/image?fileGuid=4569d6f8b6ba4210ae4fad8c37375dd0&access_token=NoAuth") center center / contain no-repeat')
    }
)

$('#' + w.general.renderTo).click(function() {
    window.top.location.href  = "https://rosseti.polyanalitika.ru/dashboardsViewer?sectionId=7&dashboardId=f9774c12ff6e4fa68c1ed08ca5acc633&sheetId=091d585351444ed2bacbcc974999e97f"
})
