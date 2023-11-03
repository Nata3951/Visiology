// получим индексы колонок для транспонирования матрицы данных
let index_of_type = w.data.rowHeaders.indexOf('widget_type');
let index_of_name = w.data.rowHeaders.indexOf('widget_name');
let index_of_link = w.data.rowHeaders.indexOf('widget_link');


let mainDiv = document.getElementById(w.general.renderTo);

// добавим прокрутку
mainDiv.style.overflow = 'auto';


// зададим стили для классов

mainDiv.innerHTML = `
    <style>
        body {
            font-family : Open Sans;
            font-size: 18px;
        }
    
        .title {
            width: 100%;
            text-align: left;
            font-size: 180%;
            padding-top: 20px;
            padding-bottom: 0px;
            padding-left:20px;
            // background-color: wheat;

        }
        
        .image-container {
            display: inline-block;
            min-height: 50px;
            // background-color: gold;
        }
        
        .image-container div {
            display: inline-block;
            padding: 30px;
            // min-width: 20%;
            // max-width: 20%;
            width: 20%;
            text-align: left;
            font-size: 18px;

        }
        
        .image-container img {
            width: 100%;
            height: auto;
        }
    </style>
`;

// получим список уникальных типов виджетов
let widget_types = new Set();

w.data.rows.forEach((el, ind) => widget_types.add(el[index_of_type]) );


// создадим раздел для каждого типа виджетов
Array.from(widget_types).forEach((w_type,ind1) => { 
    
    let imageContainerId = 'container_' + w_type;

    $('<div>', {
        class: 'title',
        text: w_type
    })
    .appendTo(mainDiv);
    
    $('<div>', {
        id: imageContainerId,
        class: 'image-container'
    })
    .appendTo(mainDiv);
    

    // отфильтруем виджеты текущего типа
    let data_by_type = w.data.rows.filter((el) => el[index_of_type] == w_type);

    // поместим в контейнер изображения и подписи для каждого виджета в таблице 
    data_by_type.forEach ((row, ind2) => {
        
        $(`#${imageContainerId}`).append('<div>');

        $(`#${imageContainerId} div`).last()
        .append(
            `<img src=https://forjs.polyanalitika.ru/corelogic/api/query/image?fileGuid=${row[3]}&access_token=NoAuth>`,
            `<a href=${row[index_of_link]}></a>`
            );

         $(`#${imageContainerId} div a`).last()
         .append(`<label>${row[index_of_name]}</label>`);
         
    });
});




// console.log('test w', w);



