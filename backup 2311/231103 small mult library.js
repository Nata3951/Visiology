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
            padding-top: 50px;
            padding-bottom: 10px;
            padding-left:20px;


        }
  
        .grid_container {
        // background-color: linen;
        display: grid;
        grid-gap: .875rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 5fr));
    }

    .chart_link {
        display: inline-flex;
        flex-direction: column;
        align-items: start;
        color: #1b1e23;
        width: 100%;
    }

    .chart_image{
        border: solid 1px lightgrey;
        border-radius: 8px;
        box-sizing: border-box;
        width: 100%;
        max-height: 65%;
        padding-top: 65%;

    }

    .chart_description{
        // border: solid 2px green;
        width: 100%;
        overflow: scroll;
        background-color : white;
    }
    
    a {
        text-decoration:none;
    }
        
    </style>
`;

// получим список уникальных типов виджетов
let widget_types = new Set();



w.data.rows.forEach((el, ind) => widget_types.add(el[index_of_type]) );

// для каждого типа виджетов
Array.from(widget_types).forEach((w_type,ind1) => { 
  
    let imageContainerId = 'container_' + w_type.replace(' ', '_');
    
    console.log('test w', w_type, imageContainerId);

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
        
        let chart_name = row[index_of_name];
    
        // контейнер для ссылки
        $('<a>', {
            class: 'chart_link',
            href: row[index_of_link],
            title: chart_name,
        }).appendTo(`#${imageContainerId}`);
        
        // картинка для ссылки
        $(`#${imageContainerId} a`).last()
            .append(`<div class="chart_image" </div>`)
            .append(`<div class="chart_description">${chart_name}</div>`);
            
        $(`#${imageContainerId} a .chart_image`).last()
        // $(`#${imageContainerId} a`).last()
        .css({
            "background-image" : `url(https://forjs.polyanalitika.ru/corelogic/api/query/image?fileGuid=${row[3]}&access_token=NoAuth)`,
            'background-size': 'contain', 
            'background-repeat': 'no-repeat',
            'background-position':'50% 2%',

        });
    });
});
