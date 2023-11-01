// получим индексы колонок для транспонирования матрицы данных
let index_of_type = w.data.rowHeaders.indexOf('widget_type');
let index_of_name = w.data.rowHeaders.indexOf('widget_name');
let index_of_link = w.data.rowHeaders.indexOf('widget_link');


let mainDiv = document.getElementById(w.general.renderTo);


// зададим стили для классов

mainDiv.innerHTML = `
    <style>
        body {
            font-family : Open Sans;
        }
    
        .title {
            width: 100%;
            text-align: left;
            font-size: 30px;
            padding-top: 20px;
            padding-bottom: 0px;
            padding-left:20px;
            // background-color: pink;
        }
        
        .image-container {
            display: inline-block;
            min-height: 50px;
            background-color: lightgrey;
        }
        
        .image-container div {
            display: inline-block;
            padding: 20px;
            min-width: 20%;
            max-width: 20%;
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
    
    let imageContainerId = 'image-container'+ind1;

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

        $(`#${imageContainerId} div`)
        .append(
            `<img src=https://img-fotki.yandex.ru/get/96333/10235337.3/0_15dec3_1535c4e_orig.jpg>`,
            `<a href=${row[index_of_link]}></a>`
            );

// добавим изображение по id изображения на сервере
        // $(`#${imageID}`).css({ 
        //     'width' : '100%', 
        //     'height': '100px', 
        //     'background' : "https://forjs.polyanalitika.ru/corelogic/api/query/image?fileGuid=7b6a6025d4284bb0b535a7538f5f533d&access_token=NoAuth"
        // });

         $(`#${imageContainerId} div a`)
         .append(`<label>${row[index_of_name]}</label>`);
         
    });
});


// добавим прокрутку

// console.log('test w', w);



