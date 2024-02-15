let red = '#ff1744',
    green = '#049D4B';
    


$(`#widget-${w.general.renderTo} .va-widget-body`)
    .css({
        // backgroundColor: '',
        'font-family': 'Open Sans',
    })
    .append('<div class ="card_header"> <span>Реструктуризация</span> </div>');

$(`#widget-${w.general.renderTo} .card_header`)
    .css({
        display: 'flex',
        'justify-content': 'space-between',
        'align-items':'center',
        'font-size': '16px',
        'color': '#757575',
    });
    
let value = '';
    
if (w.data.rows.length == 1) {
    value = w.data.values[0][0] === 0 ? 'нет' : 'да';
}    


if (w.data.rows.length > 1)  {

    w.data.values[0].forEach((el, ind) => {
    if (el > 0) value = value.concat('- ', w.data.rows[ind],'<br>');
    }); 
    
    if (value.length === 0) value = 'нет';
}  

let color = value == 'нет' ? green : red;

if (value == 'нет' || value == 'да') {

    $(`#widget-${w.general.renderTo} .card_header`)
    .append(`<span class ="yesno"> ${value} </span>`);
    
    $(`#widget-${w.general.renderTo} .yesno`)
    .css({
        // backgroundColor: 'pink',
        'font-size': '20px',
        'color': color,
    });

}

else {

    $(`#widget-${w.general.renderTo} .va-widget-body`)
    .append(`<div class ="firm"> ${value} </div>`);
    
    $(`#widget-${w.general.renderTo} .firm`)
    .css({
        'font-size': '1.1em',
        // fontWeight: 'bold',
        paddingLeft : 10,
        color : color,
    });
    
}

