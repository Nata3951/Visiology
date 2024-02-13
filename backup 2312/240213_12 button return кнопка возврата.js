//id таблицы
const idTable = 'aed9fa29b54649c28a929f6a1ccb6ead'
//id стрелочки возврата
const idReturnArrow = 'c899ccaf734242d2b83afb6cd82cd990'

ImageRender({
    image: w.general
})



const thisWidget = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body')
thisWidget.style.display = 'flex'
thisWidget.style.alignItems = 'center'
thisWidget.style.justifyContent = 'center'

thisWidget.innerHTML = `<div style="position: relative; top: 2px;">
    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 -960 960 960" >
    <path d="M120-120v-300h60v198l558-558H540v-60h300v300h-60v-198L222-180h198v60H120Z"/></svg></div>`

thisWidget.onclick = () => {
    document.querySelector('#widget-' + idTable).style.left = '30px';
    document.querySelector('#widget-' + idTable).style.top = '100px';
    document.querySelector('#widget-' + idTable).style.width = '1740px';
    document.querySelector('#widget-' + idTable).style.height = '735px';
    document.querySelector('#widget-' + idTable).style.zIndex = 90;
    document.querySelector('#widget-' + idReturnArrow).style.left = '1720px';
    document.querySelector('#widget-' + idReturnArrow).style.zIndex = 99;
}

// $(thisWidget).trigger('click')

