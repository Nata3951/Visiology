let red = '#ff1744',
    green = '#049D4B',
    grey = '#757575',
    black = '#212121',
    blue3 = '#d1dae5';
    
let big = '20px';
    
// найдем индексы колонок
let restr = w.data.cols.findIndex(el => el[0].includes('структ'));
let contr = w.data.cols.findIndex(el => el[0].includes('пробл'));
let contr_comment = w.data.cols.findIndex(el => el[0].includes('прогноза'));
let bankr = w.data.cols.findIndex(el => el[0].includes('индикатор'));
let bankr_comment = w.data.cols.findIndex(el => el[0].includes('коммент'));


TextRender({
    text: w.general,
    style: w.style
});



// разметим заголовки

$(`#widget-${w.general.renderTo} .va-widget-body`)
    .empty() // уберем исходный div
    .css({
        fontFamily: 'Open Sans',
        fontSize: 16,
        'overflow-y' : 'scroll',
        'overflow-x' : 'hidden',
    })
    .append('<div class ="name"><span>Реструктуризация</span></div>')
    .append('<div class ="section">Дополнительная информация</div>')
    .append('<div class ="name name1">Особый контроль</div>')
    .append('<div class ="name name1">Индикатор банкротства</div>')

// добавим контейнеры для данных 
    $('<div>', {class: 'box',})
    .css({
        display: 'flex', 
        'min-height' : 90,
        'flex-wrap' : 'wrap',
        fontSize : 16,
        
    })
    .insertAfter(`#widget-${w.general.renderTo} .name`); 
    
// применим стили 
// заголовок "дополнительная информация"
$(`#widget-${w.general.renderTo} .section`)
    .css({
        fontWeight: 'bold',
        color: black,
        fontSize : 18,
        paddingTop : 10,
    });


// заголовки разделов
$(`#widget-${w.general.renderTo} .name`)
    .css({
        color: grey,
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        paddingTop : 10,
        paddingBottom : 10,
    });
    
// запретим прокрутку верхней части
$(`#widget-${w.general.renderTo} .va-widget-body`)
    .children().eq(0)
    .css({
        position: 'sticky',
        top: 0,
    })
$(`#widget-${w.general.renderTo} .va-widget-body`)
    .children().eq(1)
    .css({
        position: 'sticky',
        backgroundColor : 'white',
        top: 47,
    })
    
$(`#widget-${w.general.renderTo} .va-widget-body`)
    .children().eq(2)
    .css({
        position: 'sticky',
        backgroundColor : 'white',
        top: 137,
    })

// отформатируем заголовки "особый контроль" и "индикатор банкротства"

$(`#widget-${w.general.renderTo} .name1`)
    .css({
        backgroundColor : '#f5f5f5',
        marginTop: 5,
        marginBottom : 5,
        height: '1.6em',
        color : black,

    })


// РЕСТРУКТУРИЗАЦИЯ

let is_restr = w.data.values[restr].reduce((acc, val) => acc + val);


let restr_val = '',
    restr_color;

if (!is_restr) {
    restr_val = 'нет';
    restr_color = green;
}

else if (is_restr == 1 && w.data.values[restr][0] == 1) {
    restr_val = 'да';
    restr_color = red
}

else {
    w.data.values[restr].forEach((el, ind) => {
        if (el > 0) restr_val = restr_val.concat(w.data.rows[ind], '<br>');
    });
    restr_color = red;
}


// добавим ДА/НЕТ
if (["да", "нет"].includes(restr_val)){
    $('<span>', {
        class: 'yesno',
        text: `${restr_val}`,
    })
    .css({
        fontSize: big,
        color : restr_color,
    })
    .appendTo(`#widget-${w.general.renderTo} .name:contains('Рестр')`);
}

// пропишем проблемные компании
else {
    $(`#widget-${w.general.renderTo} .name:contains('Рестр')`).next()
    .html(restr_val)
    .css({color : red,})
}

// ОСОБЫЙ КОНТРОЛЬ

// пройдем по уровням проблемности
w.data.values[contr].forEach((el,ind) => {

    let box = $(`#widget-${w.general.renderTo} .name:contains('контроль')`).next();
    
    if (el) { // если уровень не пустой
    
    // то выведем компанию, уровень и комментарий
    
    // компания
    $('<div>')
    .css({
        width : '100%', 
        color : 'black',
     })
    .text(w.data.rows[ind]) 
    .appendTo(box);    
    
    // уровень
    $('<div>')
    .css({
        color : red,
        'width' : '100%',
        backgroundColor : 'white', // прячем overflow из фирм
        // paddingLeft : 5,
    })
    .text(el) 
    .appendTo(box);  
    
// комментарий    
    $('<div>')
    .css({
        color : grey,
        paddingTop : 5,
        paddingLeft : 20,
        paddingBottom: 15,
        width : '100%',
        // backgroundColor : 'gold',
    })
    .text(w.data.values[contr_comment][ind]) 
    .appendTo(box);  
    }

// если в данные изначально пришла только одна строка, уберем название компании
    if (w.data.rows.length == 1) {
        box.children().first().remove();
    }
    


});

// ИНДИКАТОР БАНКРОТСТВА


// пройдем по индикаторам банкротства
w.data.values[bankr].forEach((el,ind) => {

    let box = $(`#widget-${w.general.renderTo} .name:contains('банкр')`).next();
    
    if (el) { // если индикатор не пустой
    
    // то выведем компанию, индикатор и комментарий
    
    // компания
    $('<div>')
    .css({
        width : '70%', 
        color : 'black',
     })
    .text(w.data.rows[ind]) 
    .appendTo(box);    
    
    // индикатор
    $('<div>')
    .css({
        color : el == 'низкий' ? green : red,
        'width' : '30%',
        backgroundColor : 'white', // прячем overflow из фирм
        paddingLeft : 5,
        textAlign: 'right',
    })
    .text(el) 
    .appendTo(box);  
    
// комментарий    
    $('<div>')
    .css({
        color : grey,
        paddingTop : 5,
        paddingLeft : 20,
        paddingBottom: 15,
        width : '100%',
    })
    .text(w.data.values[bankr_comment][ind]) 
    .appendTo(box);  
    }

// если в данные изначально пришла только одна строка, уберем название компании
    if (w.data.rows.length == 1) {
        box.children().first().remove();
        box.children().first().css({textAlign : 'Left'});
    }
    
});




console.log ('test w1', w)


// console.log ('test v', restr_val)


