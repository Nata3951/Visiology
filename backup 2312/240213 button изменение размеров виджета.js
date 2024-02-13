// GuId виджета, который будет увеличивать данная кнопка
const targetWidgetGuId = 'a68e4bf97e41481e9f7adaa32f759536'

// В какую сторону по горизонтали будет происходить расширение виджета. true - вправо; false - влево
const isGrowthRight = true
// В какую сторону по вертикали будет происходить расширение виджета. true - вниз; false - вверх
const isGrowthDown = true

ImageRender({
    image: w.general
});
const thisWidget = $("#widget-" + w.general.renderTo)
const thisWidgetState = visApi().getWidgetByGuid(w.general.renderTo).widgetState

const widget = $("#widget-" + targetWidgetGuId)
const widgetState = visApi().getWidgetByGuid(targetWidgetGuId).widgetState

let isDeployed = false

$("#widget-" + w.general.renderTo).click(function() {
    
    if (!isDeployed) {
        isDeployed = true
        
        widget.css('z-index', '900')
        thisWidget.css('z-index', '999')
        
        const finalWidth = widgetState.size.width * 2
        const finalHeight = widgetState.size.height * 1
        const animateObj = {
            left: isGrowthRight ? widgetState.position.x + "px" : widgetState.position.x - (finalWidth - widgetState.size.width) + "px",
            top: isGrowthDown ? widgetState.position.y + "px" : widgetState.position.y - (finalHeight - widgetState.size.height) + "px",
            width: finalWidth + "px",
            height: finalHeight + "px",
        }
        widget.animate(animateObj,
        {
            step: function() {
                
            },
            complete: function() {
                setTimeout(() => {
                    const targetIndex = Highcharts.charts.findIndex(el => {
                        if (!el) {
                            return false
                        }
                        return el.renderTo.id === targetWidgetGuId
                    })
                    var chartObj = Highcharts.charts[targetIndex];
                    chartObj.reflow();
                },100);
            }
        });
    } 
    
    else {
        isDeployed = false
        
        thisWidget.css('z-index', thisWidgetState.zIndex)
        
        widget.animate({ 
            left: widgetState.position.x + "px",
            top: widgetState.position.y + "px",
            width: widgetState.size.width + "px",
            height: widgetState.size.height + "px",
            zIndex: widgetState.zIndex,
        },
        {
            step: function() {
                
            },
            complete: function() {
                setTimeout(() => {
                    const targetIndex = Highcharts.charts.findIndex(el => {
                        if (!el) {
                            return false
                        }
                        return el.renderTo.id === targetWidgetGuId
                    })
                    var chartObj = Highcharts.charts[targetIndex];
                    chartObj.reflow();
                },100);
            }
        });
    }
      
})

// Изначально сворачиваем виджет, если до этого он был развёрнут
setTimeout(() => {
    
    thisWidget.css('z-index', thisWidgetState.zIndex)
    
    widget.animate({ 
        left: widgetState.position.x + "px",
        top: widgetState.position.y + "px",
        width: widgetState.size.width + "px",
        height: widgetState.size.height + "px",
        zIndex: widgetState.zIndex,
    },
    { 
        step: function() {
            
        },
        complete: function() {
            setTimeout(() => {
                const targetIndex = Highcharts.charts.findIndex(el => {
                    if (!el) {
                        return false
                    }
                    return el.renderTo.id === targetWidgetGuId
                })
                var chartObj = Highcharts.charts[targetIndex];
                chartObj.reflow();
            },100);
        }
    });    
}, 0)




