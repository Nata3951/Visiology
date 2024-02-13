//фильтр для бубликов год
const idFilterYear = 'c5033bf6d30d4e6fbabccf0469343099'
//id бубликов
const idBubGas = 'ee8c620329d54905a75f6f573da6e735'
const idBubKond = 'a2de318574e8494981f053ddfaaa32b5'
//id стрелочки
const idArrow = '183f2ca3ad0e44b8b229678e7a96ed70'

ImageRender({
    image: w.general
})



const thisWidget = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body')
thisWidget.style.display = 'flex'
thisWidget.style.alignItems = 'center'
thisWidget.style.justifyContent = 'center'

thisWidget.innerHTML = `<div style="transform: rotate(90deg); position: absolute; right: 4px;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M18 3h-6.5C10.1 3 9 4.1 9 5.5v12.1l-2.3-2.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4 4c.1.1.2.2.3.2.1.1.3.1.4.1s.3 0 .4-.1.2-.1.3-.2l4-4c.4-.4.4-1 0-1.4s-1-.4-1.4 0L11 17.6V5.5c0-.3.2-.5.5-.5H18c.6 0 1-.4 1-1s-.4-1-1-1z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg></div>`

thisWidget.onclick = () => {
    document.querySelector('#widget-' + idBubKond).style.visibility = 'hidden'
    document.querySelector('#widget-' + idBubGas).style.visibility = 'hidden'
    document.querySelector('#widget-' + idArrow).style.visibility = 'hidden'
    document.querySelector('#widget-' + idFilterYear).style.visibility = 'hidden'
}

$(thisWidget).trigger('click')
