let mainDivId = w.general.renderTo;

// Тип виджет / Название виджета / 

let mainDiv = document.getElementById(mainDivId);
//let newElem = document.createElement('div');
//mainDiv.appendChild(newElem);

mainDiv.innerHTML = `
    <style>
        .title {
            width: 100%;
            text-align: center;
            font-size: 2rem;
            padding: 30px;
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
            min-width: 30%;
            max-width: 30%;
            text-align: center;
        }
        
        .image-container img {
            width: 100%;
            height: auto;
        }
    </style>
`

let header = createElem('div', 'header', ['title'], mainDivId)
header.innerHTML = 'Карты'

let imageContainerId = 'image-container';
let imageContainer = createElem('div', imageContainerId, ['image-container'], mainDivId)

for (let i = 0; i < 5; i++) {
    
    let tmpImgContainerId = 'image-container-next-lvl-' + i;
    let tmpImgContainer = createElem('div', tmpImgContainerId, [], imageContainerId)
    
    let image = createElem('img', 'img-' + i, [], tmpImgContainerId)
    image.setAttribute('src', 'https://img-fotki.yandex.ru/get/96333/10235337.3/0_15dec3_1535c4e_orig.jpg')
    
    let linkID = 'a-' + i
    let link = createElem('a', linkID, [], tmpImgContainerId)
    let label = createElem('label', 'label-' + i, [], linkID)
    label.innerHTML = 'Widget ' + i    
}




function createElem(elemType, elemID, classes, parentID) {
    
    //console.log(elemType, elemID, classes, parentID)
    
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
