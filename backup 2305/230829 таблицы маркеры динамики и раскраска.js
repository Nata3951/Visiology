TableRender({
    table: w.general,
    style: w.style,
    columns: w.data.columns,
    records: w.data.records,
    editMask: w.data.editMask,
    rowNames: w.data.rowNames,
    colNames: w.data.colNames,
    showToolbar: false
});

// фиксируем шапку
$('#table-' + w.general.renderTo).css({'border-collapse':'collapse'});
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});

// Добавляем/заменяем заголовки
let header = {1:'Уровень проблем-ти', 2:'Клиент', 3:'Предмет лизинга'};

for (let key in header) {
    $(`#table-${w.general.renderTo} > thead > tr:nth-child(1) > th:nth-child(${key}) > div > span:nth-child(1)`)
    .text(header[key]);
}

// ширина колонок
let width = {1:'11%', 2:'12%', 3:'15%', 10:'23%'};

for (let key in width) {
    $(`#table-${w.general.renderTo} th:nth-child(${key})`)
    .css({"width": width[key],
    });
}

// форматируем текст шапки 
$('#table-'+w.general.renderTo+' > thead  div span').css({ 
    'text-align' : 'left',
    'word-break' : 'normal',
    'font-weight' : 'normal',
});

$('#table-'+w.general.renderTo+' th').css({ 
    'padding-left' : '3px'
});

let red = '#ff8a8080';
let orange = '#ffab4080';
let yellow = '#ffea0040'; // прозрачность 30%
let green = '#aed58180';

// раскрасим первый столбец
$('#table-' + w.general.renderTo + ' tr > td:nth-child(1)').each(function(i, td) {
        if (td.innerText.slice(0,3) == 'Про') {
            $(td).css({'background-color' : red});
        }
        else if (td.innerText.slice(0,3) == 'Пре') {
            $(td).css({'background-color' : orange});
        }
        else if (td.innerText.slice(0,2) == ('На')) {
            $(td).css({'background-color' : yellow});
        }
    });
    
// добавим переносы строк в столбец 3
$('#table-' + w.general.renderTo + ' tr > td:nth-child(3)').each(function(i, td) {
        td.innerHTML = td.innerHTML.replaceAll(";", "</br>")
    });
    
// раскрасим столбцы с рейтингами
let colors = {'A' : green, 'B': yellow, 'C': orange, 'D': red};

[4,5].forEach(function (j) {
   $(`#table-${w.general.renderTo} tr > td:nth-child(${j})`).each(function (i, td) {
         $(td).css({
            'background-color': colors[td.innerText[0]],
        });
    });
});

// отформатируем числа
function numberWithSpaces(x) {
  var parts = x.toString().split(".");
  let head = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//   let tail = parts[1] ? parts[1].slice(0,1) : 0;
  return head;
}

[6,7,8,9].forEach(function(j) {
    $('#table-' + w.general.renderTo + ' tr > td:nth-child(' + j + ')').each(function(i, td) {
        var value = +td.innerHTML;
        td.innerText = numberWithSpaces(td.innerText); 
        $(td).css({
            'text-align': 'right',
            'font-weight': 'bold',
        });
    }); 
});

// добавим маркеры динамики рейтинга
let curr_rating = $(`#table-${w.general.renderTo} tr > td:nth-child(4)`);
let prev_rating = $(`#table-${w.general.renderTo} tr > td:nth-child(5)`);

curr_rating.each(function (i, td) {
    if (curr_rating[i].innerText >  prev_rating[i].innerText) {td.innerHTML += '<span style="color: #ff1744">▼</span>';}
    if (curr_rating[i].innerText <  prev_rating[i].innerText) {td.innerHTML += '<span style="color: #4caf50">▲</span>';}
});

// добавим маркеры динамики ПДЗ 
let curr_pdz = $(`#table-${w.general.renderTo} tr > td:nth-child(6)`);
let forecast_pdz = $(`#table-${w.general.renderTo} tr > td:nth-child(7)`);
let pdz_depth = $(`#table-${w.general.renderTo} tr > td:nth-child(11)`);

forecast_pdz.each(function (i, td) {
    let curr = +curr_pdz[i].innerText.replace(" ","");
    let forecast = +forecast_pdz[i].innerText.replace(" ","");

    if (curr <  forecast) {
      td.innerHTML += '<span style="color: #ff1744">▲</span>';
    }
    else if (curr > forecast) {
      td.innerHTML += '<span style="color: #4caf50">▼</span>';
    }
});

//добавим глубину ПДЗ
curr_pdz.each(function (i, td) {
    let depth = pdz_depth[i].innerText;
    td.innerHTML += '</br><span style="color: #757575; font-weight: normal">' + depth +'</span>';
});

forecast_pdz.each(function (i, td) {
    let curr = +curr_pdz[i].innerText.replace(" ","");
    let forecast = +forecast_pdz[i].innerText.replace(" ","");

    if (curr <  forecast) {
      td.innerHTML += '<span style="color: #ff1744">▲</span>';
    }
    else if (curr > forecast) {
      td.innerHTML += '<span style="color: #4caf50">▼</span>';
    }
});



// прячем последний столбец, с глубиной ПДЗ
$('#table-' + w.general.renderTo + ' th:last-child').css({ 'display': 'none' });
$('#table-' + w.general.renderTo + ' tbody > tr > td:last-child').css({ 'display': 'none' });
