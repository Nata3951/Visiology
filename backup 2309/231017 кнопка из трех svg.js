// ImageRender({
//     image: w.general
// });


const newBlock = document.createElement('div')

// height="31"

newBlock.innerHTML = `
<svg width="110"  viewBox="0 0 87 31" fill="none">
    <rect width="110" rx="4" fill="#37474F"/>
    <g class="btn-screen active">
        <rect class="main-rect half-screen" x="3" y="3" width="25" height="25" rx="3" fill="#37474F"/>
        <rect class="inner-rect" x="6.5" y="6.5" width="18" height="7.26086" rx="0.5" stroke="#565A5F" stroke-linejoin="round"/>
        <rect class="inner-rect" x="6.5" y="17.2391" width="18" height="7.26086" rx="0.5" stroke="#565A5F" stroke-linejoin="round"/>
    </g>
    <g class="btn-screen">
        <rect class="main-rect full-screen-first" x="31" y="3" width="25" height="25" rx="2" fill="#37474F"/>
        <rect class="inner-rect" x="34.5" y="6.5" width="18" height="12" rx="0.5" stroke="#565A5F" stroke-linejoin="round"/>
        <rect class="inner-rect" x="34.5" y="21.5" width="18" height="3" rx="0.5" stroke="#565A5F" stroke-linejoin="round"/>
    </g>
    <g class="btn-screen">
        <rect class="main-rect full-screen-second" x="59" y="3" width="25" height="25" rx="2" fill="#37474F"/>
        <rect class="inner-rect" x="62.5" y="6.5" width="18" height="3" rx="0.5" stroke="#565A5F" stroke-linejoin="round"/>
        <rect class="inner-rect" x="62.5" y="12.5" width="18" height="12" rx="0.5" stroke="#565A5F" stroke-linejoin="round"/>
    </g>
</svg>

<style>
.main-rect {
    transition: 0.3s;    
}

.btn-screen.active .main-rect {
    fill: #314ED8;
}

.btn-screen:not(.active):hover {
    cursor: pointer;
}

.btn-screen:not(.active):hover .main-rect {
    fill: #33424A;
}

.btn-screen.active .inner-rect {
    stroke: #8BA0F0;
}
</style>
`

document.querySelector('#' + w.general.renderTo).appendChild(newBlock);

const btnsScreen = document.querySelectorAll('.btn-screen');


function getActiveButton() {
    btnsScreen.forEach((el, index) => el.addEventListener('click', (e) => {
        if (!el.classList.contains('active')) {
            btnsScreen.forEach(_el => _el.classList.remove('active'));
            el.classList.add('active');
            
            if (index === 0) {
                window.getInitialView();
            } else if (index === 1) {
                window.getGanttMainView();
            } else if (index === 2) {
                window.getTableMainView();
            }
        }
    }));
}

getActiveButton()


window.getInitialView = function() {
    // открываем таблицу
    window.mainTable.style.display = 'flex';
    document.querySelector('#widget-14f2aa8cf1c94adaa021304019438a1c').style.height = '300px';
    document.querySelector('#widget-14f2aa8cf1c94adaa021304019438a1c').style.top = '400px';
    document.querySelector('#widget-b5642579e0404d439a2577e56970d1c8').style.top = '400px';
    document.querySelector('#widget-b5642579e0404d439a2577e56970d1c8').style.height = '300px';
    
    // открываем гант
    window.mainGantt.style.display = 'block';
    document.querySelector('#widget-9fbb8e378e544777a9c6781f1f7e94a1').style.height = '290px';
    document.querySelector('#widget-76725fb5d00144f8b6a8cf75be0d74ae').style.height = '290px';
    
    // открываем фильтр
    document.querySelector('#widget-f142a78eace94749923dd3ead259dcb3').style.display = 'block';
    
    // прячем "показать раздел"
    window.showGanttBtn.style.display = 'none';
    window.showTableBtn.style.display = 'none';
}


window.getGanttMainView = function() {
    // двигаем вниз и уменьшаем таблицу
    window.mainTable.style.display = 'none';
    document.querySelector('#widget-14f2aa8cf1c94adaa021304019438a1c').style.height = '45px';
    document.querySelector('#widget-14f2aa8cf1c94adaa021304019438a1c').style.top = '655px';
    document.querySelector('#widget-b5642579e0404d439a2577e56970d1c8').style.top = '655px';
    document.querySelector('#widget-b5642579e0404d439a2577e56970d1c8').style.height = '300px';
    
    // увеличиваем гант
    window.mainGantt.style.display = 'block';
    document.querySelector('#widget-9fbb8e378e544777a9c6781f1f7e94a1').style.height = '540px';
    document.querySelector('#widget-76725fb5d00144f8b6a8cf75be0d74ae').style.height = '540px';
    
    // прячем сортировку
    document.querySelector('#widget-f142a78eace94749923dd3ead259dcb3').style.display = 'block';
    
    // показываем "показать раздел" у ганта
    window.showGanttBtn.style.display = 'none';
    window.showTableBtn.style.display = 'block';
}

window.getTableMainView = function() {
    // поднимаем и увеличиваем таблицу
    window.mainTable.style.display = 'flex';
    document.querySelector('#widget-14f2aa8cf1c94adaa021304019438a1c').style.height = '540px';
    document.querySelector('#widget-14f2aa8cf1c94adaa021304019438a1c').style.top = '155px';
    document.querySelector('#widget-b5642579e0404d439a2577e56970d1c8').style.top = '155px';
    document.querySelector('#widget-b5642579e0404d439a2577e56970d1c8').style.height = '100%';
    document.querySelector('#dataGridContainer_b5642579e0404d439a2577e56970d1c8 .dx-datagrid-rowsview').style.maxHeight = '380px'
    
    // уменьшаем гант
    window.mainGantt.style.display = 'none';
    document.querySelector('#widget-9fbb8e378e544777a9c6781f1f7e94a1').style.height = '45px';
    
    // скрываем сортировку
    document.querySelector('#widget-f142a78eace94749923dd3ead259dcb3').style.display = 'none';
    
     // показываем "показать раздел" у таблицы
    window.showGanttBtn.style.display = 'block';
    window.showTableBtn.style.display = 'none';
}
