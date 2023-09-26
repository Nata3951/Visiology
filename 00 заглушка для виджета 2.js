//Работает начиная с версии Visiology 2.24
//данный виджет нужен для того, чтобы поменять/убрать текст ошибки с указанных виджетов (массив ниже).

//массив с гуидами виджетов, в которых может быть ошибка
const errorArr = ['3efcfeece16646308af8e114386b2755', '33317f365ba14212996922ad1cb5e298','882b99e119aa4d8b9b54d8694d2840b7', '2a11a3dcaf9b42c7a9225f481946e35c', '610319609da54297bc06ece72982cc60'];
const filtersArr = ['0450d493b7d04ea3bfe3609304973b3f', 'ac006d5bedf44a71a7a29f9e31f6ff82', '5506fd55577f45f6a5c2bba277e5a66f'];


// Объект с дефолтными ошибками, наличие которых мы будем проверять
const defaultErrTxtObj = {
    errNotData: 'У виджета нет данных',
    errRequesWidget: 'Произошла ошибка при запросе виджета', 
    errRequesData: 'Ошибка запроса данных', 
    errCustomCode: 'Произошла ошибка при выполнении пользовательского кода'
}

filtersArr.forEach((el, ind) => {
    visApi().onSelectedValuesChangedListener({guid:el+'-listener'+ind, widgetGuid:el}, () => {
        setTimeout(() => {
            changeErrorMessage()
        }, 1000)
    })
})

setTimeout(() => {
    changeErrorMessage()
}, 1000)

// visApi().onAllWidgetsLoadedListener({guid: `errorListener--${w.general.renderTo}`}, function () {
function changeErrorMessage () {

    errorArr.forEach(id =>{
        const customErrorId = 'custom-error-' + id
        // Очищаем предыдущие кастомные ошибки, если они есть
        document.querySelector('#' + customErrorId) ? document.querySelector('#' + customErrorId).remove() : false
        
        const widgetBody =  document.querySelector(`#widget-${id} .va-widget-body`);
        
        const widgetError = widgetBody.querySelector('.va-widget-error') ? widgetBody.querySelector('.va-widget-error') : false
        if(widgetError){
            widgetError.style.display = 'none'
             
            // Создаём текст для кастомной ошибки в зависимости от текста старой
            let customErrTxt = ''
            const widgetErrorTxt = widgetError.innerText.trim().toLowerCase()
            
            console.log(widgetErrorTxt)
            
            if(widgetErrorTxt === defaultErrTxtObj.errNotData.trim().toLowerCase()){
                customErrTxt = ''
            }
            if(widgetErrorTxt === defaultErrTxtObj.errRequesWidget.trim().toLowerCase()){
                customErrTxt = 'Произошла ошибка при запросе виджета :('
            }
            if(widgetErrorTxt === defaultErrTxtObj.errRequesData.trim().toLowerCase()){
                customErrTxt = 'Ошибка запроса данных :('
            }
            if(widgetErrorTxt === defaultErrTxtObj.errCustomCode.trim().toLowerCase()){
                customErrTxt = ' '
            }
            
            // Создаём кастомную ошибку
            const customErrorDOM = document.createElement('div')
            customErrorDOM.id = customErrorId
            customErrorDOM.innerHTML = `
                <style>
                    #${customErrorId} {
                        width: 100%;
                        height: 100%;
                    }
                    #${customErrorId} .error_container {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    #${customErrorId} .error_txt {
                        font-size: 20px;
                        color: tomato;
                    }
                </style>
                <div class='error_container'>
                    <div class='error_txt'>
                        ${customErrTxt}
                    </div>
                </div>
            `
            widgetBody.appendChild(customErrorDOM)
        }
    }) 
    
}
