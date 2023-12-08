// GuId фильтров, которые нужно сбросить
const filtersClearArr = ['6068aa3159d049ff839ab11db0a65ecc', '94d50c7211fa4c90839a00c8807a079f', '67556d66168e479a8f23adf1af67b5aa']


let fill = "white";

let icon = `<svg xmlns="http://www.w3.org/2000/svg" 
            height="75%" fill=${fill}
            viewBox="0 -1090 1060 960"><path d="M601-454 233-823h538q37 0 51.5 31.5T817-731L601-454ZM841-33 584-290v90q0 
            26-19 44t-45 18h-80q-26 0-44.5-18T377-200v-296L33-841l49-48L889-82l-48 49Z"/></svg>`;

w.general.text = '×';

TextRender({
    text: w.general,
    style: w.style
});

$(`#widget-${w.general.renderTo} .va-widget-body-container *`).css({
    'padding' : '0px',
})

$(`#widget-${w.general.renderTo} .va-widget-body div`).css({
    'overflow' : 'visible',
})
