let green = '#aed58199',
    darkGreen = '#4caf50',
    yellow = '#ffea0066',
    darkYellow = '#ffab40',
    red = '#ff8a8066',
    darkRed = '#ff1744';

// console.log ('test w', w)


    
// создадим объекты для вывода категорий

let groups = {
    best : {
        title:'Существенный ( >20%)',
        items: [],
        color : green,
        colorB : darkGreen,
    },
    
    medium : {
        title:'Незначительный (от 0 до 20%)',
        items: [],
        color: yellow,
        colorB : darkYellow,
    },
    
    worst : {
        title:'Отрицательный (< 0%)',
        items: [],
        color: red,
        colorB: darkRed,
    },
};

// распределим типы вагонов по категориям

w.data.values[0].forEach((el, ind) => {
    if (el > 0.2) groups.best.items.push(w.data.rows[ind][0]);
    else if (el > 0 || el === 0) groups.medium.items.push(w.data.rows[ind][0]);
    else if (el < 0) groups.worst.items.push(w.data.rows[ind][0]);
    
});

// w.data.values[0].forEach((el, ind) => {
//     if (el > 50) groups.best.items.push(w.data.rows[ind][0] + 'akjg');
//     else if (el > 50) groups.medium.items.push(w.data.rows[ind][0]+ 'asjg');
//     else groups.worst.items.push(w.data.rows[ind][0]+ 'akgjglsjg');
// });


let mainDiv = document.getElementById(w.general.renderTo);

// создадим контейнеры для элементов

// общий контейнер
    $('<div>', {
        id: `cont-${w.general.renderTo}`
    })
    .css ({
        height : 55,
        // 'background-color' : 'white',
        'display' : 'flex',
        'font-family' : 'Open Sans',
        'font-size' : 13,
        'margin-top' : '5px',
       
    })
    .appendTo(mainDiv);

    
// заголовок
    $('<div>')
    .text('Запас прочности ставки текущего парка')
    .css ({
        // 'background-color' : 'wheat',
        fontWeight : 'bold',
        fontSize: 15,
        'padding-top': 10,
        'padding-left': 15,
        'padding-right': 15,
        minWidth: '15%',
        maxWidth : '20%',
        'border-right': '1px solid #ccc',
        'flex-grow' : 0,

    })
    .appendTo($(`#cont-${w.general.renderTo}`));
    
    

for (let [key, value] of Object.entries(groups)) {

// контейнеры для категорий

    $('<div>', {id: `cont-${key}-${w.general.renderTo}` })
    .css ({
    // backgroundColor : 'coral',
    'flex-grow' : '1',
     borderLeft: '1px solid #ccc',
    })
    .appendTo($(`#cont-${w.general.renderTo}`));
    
    

// категория - название

    $('<div>')
    .text(value.title)
    .css ({
        // 'background-color' : 'gold',
        'font-weight' : 'bold',
        'font-size' : '13px',
        minWidth : 140,
        'display':'table-cell',
        'vertical-align' : 'bottom',
        height : '2em',
        'padding-left': '10px',
        'color' : 'grey',
    })
    .appendTo($(`#cont-${key}-${w.general.renderTo}`));

// категория - контейнер для типов вагонов  

    $('<div>', {id: `items-${key}-${w.general.renderTo}` })
    .css ({
        // backgroundColor : 'plum',
        minHeight: '50%',
        paddingLeft : 5,
        display: 'flex',
        'flex-wrap' : 'wrap',
    })
    .appendTo($(`#cont-${key}-${w.general.renderTo}`));


    // типы вагонов
    value.items.forEach(el => {

        $('<div>')
        .text(el)
        .css ({
            backgroundColor : value.color,
            padding : '1px 10px',
            margin : '2px 3px',
            // border : '1px solid',
            // borderColor : value.colorB,
            borderRadius : 10,
        })
        .appendTo($(`#items-${key}-${w.general.renderTo}`));
    })
}
