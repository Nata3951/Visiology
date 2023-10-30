


let mainDivId = w.general.renderTo;

let mainDiv = document.getElementById(mainDivId);




mainDiv.innerHTML = `
    <style>
        body {
            font-family : Open Sans;
        }
    
        .title {
            width: 100%;
            text-align: left;
            font-size: 30px;
            padding: 20px;
            background-color: pink;
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

// Тип виджета / Название виджета / 

let widget_types = new Set();
let index_of_type = w.data.rowHeaders.indexOf('widget_type');
w.data.rows.forEach((el, ind) => widget_types.add(el[index_of_type]) );

console.log('test array', Array.from(widget_types));

// Array.from(widget_types).forEach((el, ind) => console.log('test el', el));


Array.from(widget_types).forEach((el,ind) => { 

    let headerId = 'header'+ind;
    let header = createElem('div', headerId, ['title'], mainDivId);
    header.innerHTML = el;
    
    let imageContainerId = 'image-container'+ind;
    let imageContainer = createElem('div', imageContainerId, ['image-container'], mainDivId);
    
    for (let i = 0; i < 5; i++) {
        
        let tmpImgContainerId = 'image-container-lvl2-' + ind + i;
        let tmpImgContainer = createElem('div', tmpImgContainerId, [], imageContainerId);
        
        let image = createElem('img', 'img-' + ind + i, [], tmpImgContainerId);
        image.setAttribute('src', 'https://img-fotki.yandex.ru/get/96333/10235337.3/0_15dec3_1535c4e_orig.jpg');
        
        let linkID = 'a-' + ind + i;
        let link = createElem('a', linkID, [], tmpImgContainerId);
        let label = createElem('label', 'label-'+ ind + i, [], linkID);
        label.innerHTML = 'Widget '+ ind + i  ;  
    }
}
);




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
