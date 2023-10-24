let background = '#18324b';
let text1 = '#fafafa';
let text2 = '#9e9e9e';
let fill1 = '#3d4e60';
let line = '#33465b';
let green = '#4caf50';
let red = '#ff8a80';


console.log('test w', w);


let postavka, virabotka, otgruzka, ostatok;

for (let i = 0; i < w.data.rows.length; i++) {
    if (w.data.rows[i][0] == "Поставка") postavka = i;
    else if (w.data.rows[i][0] == "Выработка") virabotka = i;
    else if (w.data.rows[i][0] == "Отгрузка") otgruzka = i;
    else if (w.data.rows[i][0] == "Остаток") ostatok = i;
    continue;
}

let fact, plan, diff, diff_pct;

for (let i = 0; i < w.data.cols.length; i++) {
    if (w.data.cols[i][0] == "План") plan = i;
    else if (w.data.cols[i][0] == "Факт") fact = i;
    else if (w.data.cols[i][0] == "Отклонение") diff = i;
    else if (w.data.cols[i][0] == "diff_pct") diff_pct = i;
    continue;
}

// let postavka_diff = w.data.values[postavka][diff];


console.log('test postavka', w.data.values[diff][postavka]);


w.general.text = `
<p class='head15'>Поставка</p>
<div class = 'space15'> 
    <div class="column col1">
        <p class='data'> ${w.data.values[plan][postavka]} </p>
        <p class='name'> План </p>
    </div>
    
    <div class="column col2">
        <p class='data'> ${w.data.values[fact][postavka]} </p>
        <p class='name'> Факт </p>
    </div>
    
    <div class="column col3">
        <p class='data'> ${w.data.values[diff][postavka]} 
        <span class='diff'>${w.data.values[diff_pct][postavka]}</span></p>
        <p class='name'> Отклонение </p>
    </div>
</div>
<p class='head15'>Выработка</p>
<div class = 'space15'> 
    <div class="column col1">
        <p class='data'> ${w.data.values[plan][virabotka]} </p>
        <p class='name'> План </p>
    </div>
    
    <div class="column col2">
        <p class='data'> ${w.data.values[fact][virabotka]} </p>
        <p class='name'> Факт </p>
    </div>
    
    <div class="column col3">
        <p class='data'> ${w.data.values[diff][virabotka]} 
        <span class='diff'>${w.data.values[diff_pct][virabotka]}</span></p>
        <p class='name'> Отклонение </p>
    </div>
</div>
<p class='head15'>Отгрузка</p>
<div class = 'space15'> 
    <div class="column col1">
        <p class='data'> ${w.data.values[plan][otgruzka]} </p>
        <p class='name'> План </p>
    </div>
    
    <div class="column col2">
        <p class='data'> ${w.data.values[fact][otgruzka]} </p>
        <p class='name'> Факт </p>
    </div>
    
    <div class="column col3">
        <p class='data'> ${w.data.values[diff][otgruzka]} 
        <span class='diff'>${w.data.values[diff_pct][otgruzka]}</span></p>
        <p class='name'> Отклонение </p>
    </div>
</div>
<p class='head15'>Остаток</p>
<div class = 'space15'> 
    <div class="column col1">
        <p class='data'> ${w.data.values[plan][ostatok]} </p>
        <p class='name'> План </p>
    </div>
    
    <div class="column col2">
        <p class='data'> ${w.data.values[fact][ostatok]} </p>
        <p class='name'> Факт </p>
    </div>
    
    <div class="column col3">
        <p class='data'> ${w.data.values[diff][ostatok]} 
        <span class='diff'>${w.data.values[diff_pct][ostatok]}</span></p>
        <p class='name'> Отклонение </p>
    </div>
</div>

`;


console.log('test w rows', w);


TextRender({
    text: w.general,
    style: w.style
});


//  фон виджета
 $(`#widget-${w.general.renderTo}`).css({
      'background-color': background,
      'border-radius' : '8px'
     });

// поля виджета
 $(`#widget-${w.general.renderTo}  > div.va-widget-body-container`).css({
     'padding-top': '80px',
     'padding-left' : '10px',
     'padding-right' : '10px',
     'padding-bottom' : '0px',
    });

$(`#${w.general.renderTo} .head15`).css({
    'text-align':'left',
    'font-size' : '18px',
    'margin-top' : '5px',
    'font-weight' : 'bold',
    'font-family' : 'Open Sans',
    'background-color' : fill1,
    'color' : text2,
    'padding-left' : '15px'
});

$(`#${w.general.renderTo} .space15`).css({
    'height' : '19%',
    'padding': '5px 0px',
    'margin-top' : '5px',
    'font-size' : '16px',
    'font-weight' : 'normal',
    'font-family' : 'Open Sans',
    'color' : text2,

});

$(`#${w.general.renderTo} .column`).css({
    'float':'left',
    'border-right' : '2px solid #33465b',
    'height' : '100%',
    'color' : text2
});

$(`#${w.general.renderTo} .col1`).css({'width' : '20%', 'position' : 'relative',});
$(`#${w.general.renderTo} .col2`).css({'width' : '20%', 'position' : 'relative',});
$(`#${w.general.renderTo} .col3`).css({'width' : '25%', 'position' : 'relative',});

$(`#${w.general.renderTo} .data`).css({
    'position' : 'absolute', 
    'top':'40%',
    'color':text1,
    'font-weight' : 'bold',
    'font-size' : '120%',
    'text-align' : 'center',
    'width':'100%',
    // 'background-color': 'gold',
});

$(`#${w.general.renderTo} .name`).css({
    'position' : 'absolute', 
    'top':'60%',
    'text-align' : 'center',
    'width':'100%',
    // 'background-color': 'pink',
});

// индикатор отклонения, в %
$(`#${w.general.renderTo} .diff`)
    .css({'font-weight' :'normal',})
    .each(function () {
        let new_text = (+$(this).text()).toFixed(1);
        let color = $(this).text() < 0 ? red : green
        $(this)
        .text(`(${new_text}%)`)
        .css({'color': color,});
    });
