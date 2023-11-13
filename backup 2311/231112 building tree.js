// проекты время 231109

let data = {
    "Рыбы": {
        "форель": {},
        "лосось": {}
    },

    "Деревья": {
        "Огромные": {
            "секвойя": {},
            "дуб": {}
        },
        "Цветковые": {
            "яблоня": {},
            "магнолия": {}
        }
    }
};

let mainDiv = document.getElementById(w.general.renderTo);

$(mainDiv).append('<ol class=level_0>');
$(`#${w.general.renderTo} ol`)
// .text('lorem ipsum')
.css({
    'min-height' : '30px',
    'background-color' : 'pink',
});

let hasProp = (obj) => Object.keys(obj).length > 0;

for (let key in data) {
    if (hasProp(data[key])) {
        console.log ('test key ', key)
        $(`.level_0`).append(`<li id=${key}>`);
        $(`#${key}`).text(key);
    }
}

// console.log('test ', data);

hasProp(data);

