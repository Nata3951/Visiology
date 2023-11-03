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
  
        .grid_container {
        background-color: linen;
        display: grid;
        grid-gap: .875rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 5fr));
    }

    .chart_link {
        background-color: pink;   
        display: inline-flex;
        flex-direction: column;
        align-items: start;
        color: #1b1e23;
        width: 100%;
    }

    .chart_image{
        border: solid 1px #e8e8e8;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
        padding-top: 62.5%;
        background-size: cover;
        // background-image: url(https://static.observableusercontent.com/thumbnail/882768da05f294d7eea3aef0e4d5e060b9f9ee542d681772b54341f26b6abfef.jpg);  
    }

    .chart_description{
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
        
    </style>
`;

// получим список уникальных типов виджетов
let widget_types = new Set();

w.data.rows.forEach((el, ind) => widget_types.add(el[index_of_type]) );

// для каждого типа виджетов
Array.from(widget_types).forEach((w_type,ind1) => { 
  
    let imageContainerId = 'container_' + w_type;

    // заголовок для раздела   
    $('<div>', {
        class: 'title',
        text: w_type
    })
    .appendTo(mainDiv);
    
    // контейнер для сетки виджетов  
    $('<div>', {
        id: imageContainerId,
        class: 'grid_container'
    })
    .appendTo(mainDiv);
    

    // отфильтруем виджеты текущего типа
    let data_by_type = w.data.rows.filter((el) => el[index_of_type] == w_type);

    // поместим в контейнер изображения и подписи для каждого виджета в таблице 
    data_by_type.forEach ((row, ind2) => {
    
        // контейнер для ссылки
        $('<a>', {
            class: 'chart_link',
            href: "example.com",
            title:"pop-up message"
        }).appendTo(`#${imageContainerId}`);
        
        // картинка для ссылки
        $(`#${imageContainerId} a`).last()
            .append(`<div class="chart_image" </div>`);
            
        $(`#${imageContainerId} a .chart_image`).last()
        .css({
            "background-image" : `url(https://forjs.polyanalitika.ru/corelogic/api/query/image?fileGuid=${row[3]}&access_token=NoAuth)` 
        })
        .append(`<div class="chart_description">Animated treemap blah blah</div>`);


//         $(`#${imageContainerId}`).append('<div>');

//         $(`#${imageContainerId} div`).last()
//         .append(
//             `<img src=https://forjs.polyanalitika.ru/corelogic/api/query/image?fileGuid=${row[3]}&access_token=NoAuth>`,
//             `<a href=${row[index_of_link]}></a>`
//             );

//          $(`#${imageContainerId} div a`).last()
//          .append(`<label>${row[index_of_name]}</label>`);
         
    });
});




// console.log('test w', w);



