//00  https://visi-dev.лизинг.ru/dashboardsViewer?sectionId=5&dashboardId=a112b8874e704ca48e5e71d68a176bfd&sheetId=615a37a607fb4517999c50545de607fc
//mod https://visi-dev.лизинг.ru/viewer?dashboardGuid=2180c8c2e92b4653ad87f6220982e68f&sheetGuid=dca33bb7951f4c90bdb56eab1ef34502&fit=true

// Виджет типа слайдер для установки фильтра по датам 
// Для его использования необходимо добавить на виджет (можно за пределами видимости) фильтр по датам и привязать его к данным
// а также установить влияние на другие виджеты.
// После этого слайдер будет использовать данные, подключенные к дашборду, и передавать измененные данные в фильтр по датам


let tempElem = document.createElement('script');                                                            //создаём элемент script в html дереве
tempElem.type = 'text/javascript';                                                                          //задаём ему тип
tempElem.src = 'https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js';     //подключаем библиотеку
document.head.append(tempElem);

let tempElem1 = document.createElement('link');                                                             //создаём элемент link в html дереве
tempElem1.type = "text/css";
tempElem1.rel = "stylesheet";                                                                               //задаём ему тип
tempElem1.href = 'https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css'; //подключаем css
document.head.append(tempElem1);

//Блок кода для правильной работы превью и экспорта
var loadHandler = null;
var loadedPromise = new Promise((resolve,reject)=>{
            loadHandler = resolve;
        });
        
 
tempElem.onload = function(){                                    // ждем пока загрузится библиотека
$("#" + w.general.renderTo).append("<input id=\"iron_range\">"); // добавляем базовый элемент типа input
$("#iron_range").ionRangeSlider({                                // устанавливаем слайдер 
    type: "double",                                              // выбираем тип слайдера (в данном случае с двумя указателями)
    skin: "round",                                                 // выбираем скин для слайдера (см. документацию к бибилотеке)
    values: w.data.rows,                                         // в качестве диапазона данных передаем данные из строки, подключенные к виджету "График"
onChange: function (data) {                                      // при изменении положения ползунков передаем данные в фильтр по датам через ID элемента    
           visApi().setDateFilterSelectedValues("45d051af29f447cb8d0a8b05f992a1d3", [new Date(data.from_value[0]),new Date(data.to_value[0])]);
        }
});
};
