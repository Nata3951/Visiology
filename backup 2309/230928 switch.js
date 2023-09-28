/*  
    Виджет "переключатель".
    
    Виджет предназначен для смены видимости различных виджетов, находящихся на одном месте.
    При нажатии на кнопки, нужный виджет появляется поверх других, закрывая собой остальные.
    
    
    Для правильной работы виджета необходимо:
    
    1. Создать необходимое количество виджетов для скрытия. Любое количество, начиная с 2-х.
    Добавить всем виджетам фон (если он не предусмотрен, добавить белый).
    
    2. Добавить в переменную "hiddenWidgetsListID" список ID виджетов, которые нужно скрыть, в формате строк в массиве. 
    В том же порядке, который будет совпадать с названием кнопок.
    Например: 1 кнопка - "круговая диаграмма", значит первый id должен быть круговой диаграммы.
    
    3. Добавить в переменную "nameList" список названия кнопок, в формате строк в массиве. 
    В том же порядке и количестве, что и id виджетов для скрытия.
    
    4. Расположить виджеты для скрытия друг над другом, с одинаковым размером.
    
    5. Выбрать активную кнопку по умолчанию, переменная для настройки "defaultName".
    
    6. Настроить внешний вид кнопок, все переменные для настройки подписаны.
    Кнопки растягиваются по всей доступной ширине. Чтобы сделать их шире/уже - нужно тянуть за края виджета.
    Высота кнопок зависит от внутренних отступов, переменная "paddingY".
*/
 
// список id виджетов для скрытия (минимум - 2)
const hiddenWidgetsListID = [
    ['2c7e124e4b9948aeba68689718022fa3', 'ab57d81cfe32410283622c06da80a8ed', '378422b3939c4382991134f6ec39af48', '533f8ab648104293b2e292bbd3bf05fb'], 
    ['60bc556a740a478fa98a1740824daf87', '7150699b088a41c4adfdec2de90edb66', '80260f1fd8a34e909f98443a9f9958fe', '8d293d9d7dc041f38b95acfd50268bf5', '63a35a45e2a84ff3b9c95d1a3e3017d5'],
    ['7228a84c548447839e2d0492e7bf0637', '06039cf42ae64a21833f083c6259ed16', '260f703fd5834423a0677308e56c6725', '65ee1e8fac5548cba4ba8d4424ba0af0'],
    ['8d43bf7ae9f044c0a2ad9b2a14b9b2a1', '32fc61852a8244c6a5976e6190fc0735', 'f96d4f7a98d747168c662785bb401244', '941dc2458cd04fbc85d5f2da98ba3178', '4d81438cb9d14807b27554bb631d4ecb'], 
    ['4df925c1a9d34fbf97949f4c0f3e4817', 'b9f2596c4bc2413182201dfc99d28a52', '23ee649760814339a48ea088e3ccf007', '593bf34eac1748379f570222acc516d2', '9b0cf590ec014a2a87e6e6e6e14147ad'],
];

// список для названия переключателей (в том же порядке, что и нужные виджеты для скрытия)
const nameList = ['Потери РЭС', 'Нетариф. выручка', 'Охват рынка', 'Потери/произв. общество', 'Потери/произв. филиал'];

// настройка внешнего вида
const defaultName = 1;  // какой виджет (и кнопку) по умолчанию выбирать активным (отсчет с 1)

const offset   = 3;  // отступ между кнопками (поставить 0, если не нужно)
const paddingY = 1;  // отступ верха и низа у кнопки
const paddingX = 0; // отступ слева и справа у кнопки

const fontFamily = 'Open Sans'; // шрифт
const fontSize   = 13;          // размер шрифта

const backgroundTab = '#494B6F'; // цвет фона переключателей по умолчанию
const colorText     = 'gray';    // цвет текста по умолчанию
const borderRadius  = 5;         // скругление углов (поставить 0, если не нужно)

const backgroundTabActive = '#9ac1ef'; // цвет фона активной кнопки
const colorTextActive     = 'white';   // цвет текста активной кнопки

const backgroundHover = '#72a9eb'; // цвет фона при наведении на кнопки
const colorTextHover  = '#ecedef'; // цвет текста при наведении на кнопки

const lineBottom       = false;       // нужна ли линия под всеми кнопками (true - нужна, false - не нужна)
const lineBottomHeight = 1;           // толщина линии под всеми кнопками
const lineBottomColor  = '#b19e773d'; // цвет линии под всеми кнопками

const mainLineBottom = false;     // нужна ли линия под активной кнопкой (true - нужна, false - не нужна)
const mainLineHeight = 2;         // толщина линии под активной кнопкой
const mainLineColor  = '#B19E77'; // цвет линии под активной кнопкой



// код для работы виджета, аналитикам не редактировать (!)

// список нужных блоков из DOM для скрытия
const hiddenWidgets = [];
hiddenWidgetsListID.forEach(arr => {
    hiddenWidgets.push(arr.map(el => document.querySelector('#widget-' + el)))
});

// верстка переключателей
const mainWidget = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body');
const mainWidgetID = '#widget-' + w.general.renderTo;

const layoutWidget = document.createElement('div');
layoutWidget.classList.add('tabs__wrapper');

nameList.forEach((el, index) => {
    layoutWidget.innerHTML += `
        <div class="tab ${index + 1 == defaultName ? 'active' : ''}">
            ${el}
        </div>
    `
});

// стили переключателей
const styleWidget = document.createElement('style');
const borderBottom = 'border-bottom: ' + lineBottomHeight +'px solid ' + lineBottomColor + ';';

styleWidget.innerHTML = `
    ${mainWidgetID} .tabs__wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        ${lineBottom ? borderBottom : '' }
    }
    
    ${mainWidgetID} .tab {
        width: calc((100% / ${nameList.length}) - ${offset}px);
        padding: ${paddingY}px ${paddingX}px;
        font-family: ${fontFamily};
        font-size: ${fontSize}px; 
        background: ${backgroundTab};
        text-align: center;
        color: ${colorText};
        border-radius: ${borderRadius}px;
        cursor: pointer;
        transition: 0.3s;
        position: relative;
    }
    
    ${mainWidgetID} .tab:hover {
        background: ${backgroundHover};
        color: ${colorTextHover};
    }
    
    ${mainWidgetID} .tab.active {
        background: ${backgroundTabActive};
        color: ${colorTextActive};
        cursor: default;
    }
    
    ${mainWidgetID} .tab::after {
        position: absolute;
        content: "";
        bottom: -1px;
        left: 0;
        width: 100%;
        height: ${mainLineHeight}px;
        background: ${mainLineColor};
        opacity: 0;
        transition: 0.3s;
    }
    
    ${mainWidgetID} .tab.active::after {
        position: absolute;
        content: "";
        bottom: -1px;
        left: 0;
        width: 100%;
        height: ${mainLineHeight}px;
        background: ${mainLineColor};
        ${mainLineBottom ? 'opacity: 1;' : 'opacity: 0;'};
    }
    
    ${mainWidgetID} .tab:hover::after {
        ${mainLineBottom ? 'opacity: 1;' : 'opacity: 0;'};
    }
`

mainWidget.appendChild(layoutWidget);
mainWidget.appendChild(styleWidget);


// добавление событий кликов для кнопок и скрытия виджетов
const tabsList = layoutWidget.querySelectorAll('.tab');

hiddenWidgets.forEach(_arr => _arr.forEach(el => {
    el.style.zIndex = '5'
    el.style.visibility = 'hidden'
}));
hiddenWidgets.forEach((_arr, _index) => {
    _arr.forEach((_el) => {
        if (_index + 1 === defaultName) {
            _el.style.zIndex = '10'
            _el.style.visibility = 'visible'
        }  
    })
});

tabsList.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabsList.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');
        
        hiddenWidgets.forEach((_arr) => _arr.forEach((_el, _index) => {
            _el.style.zIndex = '5'
            _el.style.visibility = 'hidden'
        }));
        hiddenWidgets.forEach((arr, _index) => {
            arr.forEach((_el) => {
                if (_index === index) {
                    _el.style.zIndex = '10';
                    _el.style.visibility = 'visible'
                }   
            })
        })
    });
});

for (let i=1; i<4; i++) {
$(`#widget-${w.general.renderTo} div.tab:nth-child(${i})`).css({
    'width' : '17%'
});
}

for (let i=4; i<6; i++) {
$(`#widget-${w.general.renderTo} div.tab:nth-child(${i})`).css({
    'width' : '22%'
});
}
