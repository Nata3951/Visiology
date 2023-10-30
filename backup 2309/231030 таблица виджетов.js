let index_of_type = w.data.rowHeaders.indexOf('widget_type');
let index_of_name = w.data.rowHeaders.indexOf('widget_name');
let index_of_link = w.data.rowHeaders.indexOf('widget_link');



let mainDivId = w.general.renderTo;

let mainDiv = document.getElementById(mainDivId);


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

    let headerId = 'header'+ind1;
    let header = createElem('div', headerId, ['title'], mainDivId);
    header.innerHTML = w_type;
    
// создадим контейнер для изображений в каждом разделе
    let imageContainerId = 'image-container'+ind1;
    let imageContainer = createElem('div', imageContainerId, ['image-container'], mainDivId);


// отфильтруем виджеты текущего типа

    let data_by_type = w.data.rows.filter((el) => el[index_of_type] == w_type);


// поместим в контейнер изображения и подписи для каждого виджета в таблице 
    // console.log('test z', data_by_type);

    data_by_type.forEach ((row, ind2) => {
        
        let tmpImgContainerId = 'image-container-lvl2-' + ind1 + ind2;
        let tmpImgContainer = createElem('div', tmpImgContainerId, [], imageContainerId);
        
        let imageID = 'img-' + ind1 + ind2;
        let image = createElem('img', imageID, [], tmpImgContainerId);
        image.setAttribute('src', 'https://img-fotki.yandex.ru/get/96333/10235337.3/0_15dec3_1535c4e_orig.jpg');

        // $(`#${imageID}`).css({ 
        //     'width' : '100%', 
        //     'height': '100px', 
        //     'background' : "https://forjs.polyanalitika.ru/corelogic/api/query/image?fileGuid=7b6a6025d4284bb0b535a7538f5f533d&access_token=NoAuth"
        // });

        let linkID = 'a-' + ind1 + ind2;
        let link = createElem('a', linkID, [], tmpImgContainerId);
        link.setAttribute('href', row[index_of_link]);
        
        let label = createElem('label', 'label-'+ ind1 + ind2, [], linkID);
        label.innerHTML = row[index_of_name];  
    });
}
);

    console.log('test w', w);



function createElem(elemType, elemID, classes, parentID) {

    let newElem = document.createElement(elemType);
    
    if (elemID) { 
        newElem.id = elemID;
    }
    
    classes.forEach((cssClass) => {
        newElem.classList.add(cssClass);
    });
    
    if (parentID) {
        document.querySelector('#' + parentID).appendChild(newElem);
    }
    
    return newElem;
}

