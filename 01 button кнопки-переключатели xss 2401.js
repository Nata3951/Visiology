const activeBtn = 3; // выбор активной кнопки при загрузке (отсчет с 0)

const mainWidget = document.querySelector('#widget-' + w.general.renderTo + ' .va-widget-body');
const mainID = '#widget-' + w.general.renderTo;

const widgetWrapper = document.createElement('div');
widgetWrapper.classList.add('widget__wrapper');

w.data.rows.map(el => {
    widgetWrapper.innerHTML += `
        <button>${el}</button>
    `
});


const widgetStyle = document.createElement('style');
widgetStyle.innerHTML =`
${mainID} .widget__wrapper {
    background: #F5F5F5;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
}

${mainID} .widget__wrapper button {
    font-family: 'Open Sans';
    color: #757575;
    background: #F5F5F5;
    border: none;
    padding: 2px;
    margin: 2px;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.1s;
    min-width: 60px;
    height: 25px;
    font-size: 14px;
    font-weight: bold;
}

${mainID} .widget__wrapper button:hover {
    background: #e3e6e9;
}

${mainID} .widget__wrapper button.active {
    color: black;
    background: #E6E6E6;
    cursor: default;
}
`
mainWidget.appendChild(widgetWrapper);
mainWidget.appendChild(widgetStyle);

const allBtns = widgetWrapper.querySelectorAll('button');


allBtns.forEach(el => {
    el.addEventListener('click', () => {
        allBtns.forEach(el => el.classList.remove('active'));
        
        visApi().setFilterSelectedValues(w.general.renderTo, [[el.textContent]], function () {});
        
        el.classList.add('active');
    });
});

allBtns[activeBtn].classList.add('active');
visApi().setFilterSelectedValues(w.general.renderTo, [[allBtns[activeBtn].textContent]], function () {});
