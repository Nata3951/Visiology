let val = String(w.data.values[0][0]).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

let background =  '#162535';
let line = '#33465b';
let text1 = '#fafafa';
let text2 = '#9e9e9e';

w.general.text = `<div>
<p style="font-size:200%">${val} </p>
<div style="height:4px; background-color: ${line}"></div>
<p >Всего доставлено СПГ </p>
<p style="color:${text2}; font-size:80%;line-height:80%">(тонн)</p>
</div>
`

// console.log ('test wv',val);

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
      'padding': '10px 30px',
    });
