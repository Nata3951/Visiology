// GuId виджета, с которого будут браться данные для всплывающего окна
const dataGuId = '1c3c316f4a684efb88368f3a8fb67e64' // таблица Info 2

// Индекс столбца, из которого будут браться данные для popup
const colIndex = 0


ImageRender({
    image: w.general
})

 

// Код всплывающего окна (отрисовка, позиционирование, функционал) - START
const widget = document.querySelector('#widget-' + w.general.renderTo)
widget.onclick = widget.onmouseover = widget.onmouseout = (event) => {
    if (event.type == 'mouseover' || event.type == 'click') {
        // visApi().getWidgetDataByGuid(dataGuId).then(function (widgetData) {
        //       const data = widgetData.data.values[colIndex].filter(el => el);           
        // });
           
            const data = ["Средний балл по филиалу = средний балл ...."];           
            const targetState = visApi().getWidgetByGuid(w.general.renderTo)
            const targetX = targetState.x() - 330
            const targetY = targetState.y()+35 
            const targetWidth = 270
            const targetHeight = 90
            
            const thisState = visApi().getWidgetByGuid(w.general.renderTo)
            const thisX = thisState.x()
            const thisY = thisState.y()
            
            const popup = document.createElement('popup')
            popup.classList.add('popup-' + w.general.renderTo)
            
            const cssDOM = `
                .popup-${w.general.renderTo} * {
                    font-family: Open Sans;
                    color: #fff;
                }
                .popup-${w.general.renderTo} .popup-container {
                    position: absolute; 
                    z-index: 6000; 
                    left: ${targetX - thisX}px; 
                    top: ${targetY - thisY}px; 
                    width: ${targetWidth}px; 
                    height: ${targetHeight}px;
                    overflow: hidden;
                    background: #353763;
                    border: 1px solid silver;
                }
                .popup-${w.general.renderTo} .popup-scroll-container {
                    position: absolute;
                    top: 0px;
                    bottom: 0px;
                    left: 0px;
                    right: 0px;
                    overflow-y: auto;
                }
                .popup-${w.general.renderTo} .popup-container-body {
                    padding: 10px;
                }
                .popup-${w.general.renderTo} .popup-container-row {
                    margin-top: 2px;
                }
                .popup-${w.general.renderTo} .popup-close-${w.general.renderTo} {
                    user-select: none;
                    width: 30px; 
                    height: 30px; 
                    border: 2px solid #494b6f;
                    border-radius: 50%;
                    position: absolute; 
                    top: 7px; 
                    left: 100%; 
                    margin-left: -45px;
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                }
                .popup-${w.general.renderTo} .popup-close-${w.general.renderTo}:hover {
                    cursor: pointer;
                }
            `
            const htmlDOM = `
                <div class="popup-container">
                    
                    <div class="popup-scroll-container">
                        <div class="popup-container-body">
                            ${data.map(val => createRowDOM(val)).join('')}
                        </div>
                    </div>
                </div>
            `
            
            popup.innerHTML = `
                <style>${cssDOM}</style>
                ${htmlDOM}
            `
            document.querySelector('#widget-' + w.general.renderTo).appendChild(popup)
            
            document.querySelectorAll(`.popup-close-${w.general.renderTo}`).forEach(but => {
                but.onclick = () => {
                    document.querySelectorAll('.popup-' + w.general.renderTo).forEach(el => el.remove())
                }
            })
        // })    
    }
    if (event.type == 'mouseout') {
        document.querySelectorAll('.popup-' + w.general.renderTo).forEach(el => el.remove())
    }
}

function createRowDOM(str) {
    const domStr = `
        <div class="popup-container-row">
            ${str}
        </div>
    `
    return domStr
}

// Код всплывающего окна (отрисовка, позиционирование, функционал) - END





