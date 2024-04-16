const dumbellGuid = 'a86323021e6a494ebdf06fb05da5a012';
const clientFilterGuid = 'ff1c604db8e3463b839902d00f9a68df';

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

 $(`#widget-${w.general.renderTo}  > div.va-widget-body-container`).css({
      'padding-left': '0px',
      'padding-right': '0px'
 });

// изменяем заголовок виджета
$(`#widget-header-${w.general.renderTo} > a`)[0]
.innerHTML = '<span style="display:inline-block;width:90%">Сведения по контрагентам </span> <span style="font-weight:normal;color:#757575"> млн руб. </span>';

$('#widget-header-' + w.general.renderTo + ' > a').css({
      'padding-top': '10px',
      'padding-bottom': '10px',
      'padding-left': '20px'
 });
 
//  $(`#widget-${w.general.renderTo}  > div.va-widget-body-container`).css({
//       'padding-left': '0px'
//  });

// прячем первый столбец, с глубиной ПДЗ
$('#table-' + w.general.renderTo + ' th:first-child').css({ 'display': 'none' });
$('#table-' + w.general.renderTo + ' tbody > tr > td:first-child').css({ 'display': 'none' });

// фиксируем шапку
$('#table-' + w.general.renderTo).css({'border-collapse':'collapse'});
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});

// Добавляем/заменяем заголовки
let header = {2:'Уровень проблемности', 3:'Клиент', 4:'Предмет лизинга'};

for (let key in header) {
    $(`#table-${w.general.renderTo} > thead > tr > th:nth-child(${key}) > div > div > span:nth-child(1)`)
    .text(header[key]);
}

// console.log('test ', $(`#table-${w.general.renderTo} > thead`))

// ширина колонок
// 2 Уровень проблемности
// 3 Клиент
// 4 предмет лизинга
// 11 причины прогноза
let width = {2:'12%', 3:'11%', 4:'14%', 10:'21%'};

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

// формат первой ячейки заголовка
$('#table-'+w.general.renderTo+' th:nth-child(2)').css({ 
    'padding-left' : '10px'
});


let red = '#ffe7e5';
let orange = '#ffeed9';
let yellow = '#fffacc'; // прозрачность 30%
let green = '#eff7e6';

$('#table-' + w.general.renderTo + ' tr > td:nth-child(7)').css('padding-top', '1.7em');

// раскрасим второй столбец
$('#table-' + w.general.renderTo + ' tr > td:nth-child(2)').each(function(i, td) {
        if (td.innerText.slice(0,3) == 'Про') {
            $(td).css({'background-color' : red});
        }
        else if (td.innerText.slice(0,6) == 'Потенц') {
            $(td).css({'background-color' : orange});
        }
        else if (td.innerText.slice(0,2) == ('На')) {
            $(td).css({'background-color' : yellow});
        }
    });
    
// добавим переносы строк в столбец 4
$('#table-' + w.general.renderTo + ' tr > td:nth-child(4)').each(function(i, td) {
        td.innerHTML = td.innerHTML.replaceAll(";", "</br>")
    });
    
// раскрасим столбцы с рейтингами
let colors = {'A' : green, 'B': yellow, 'C': orange, 'С': orange, 'D': red};

[5,6].forEach(function (j) {
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

[7,8,9].forEach(function(j) {
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
let curr_rating = $(`#table-${w.general.renderTo} tr > td:nth-child(5)`);
let prev_rating = $(`#table-${w.general.renderTo} tr > td:nth-child(6)`);

// Определяем словарь сопоставления рейтингов и их числовых значений
let ratingMap = {
  A: 8,
  BBB: 7,
  BB: 6,
  B: 5,
  CCC: 4,
  CC: 3,
  C: 2,
  D: 1
};

curr_rating.each(function (i, td) {
  if (!prev_rating[i].innerText) return;
  var curr = ratingMap[curr_rating[i].innerText];  // Получаем числовое значение текущего рейтинга
  var prev = ratingMap[prev_rating[i].innerText];  // Получаем числовое значение предыдущего рейтинга
  
  if (curr < prev) {
    td.innerHTML += '<span style="color: #ff1744">▼</span>';  // Текущий рейтинг меньше предыдущего
  } else if (curr > prev) {
    td.innerHTML += '<span style="color: #4caf50">▲</span>';  // Текущий рейтинг больше предыдущего
  }
});

// добавим маркеры динамики ПДЗ 
let curr_pdz = $(`#table-${w.general.renderTo} tr > td:nth-child(7)`);
let forecast_pdz = $(`#table-${w.general.renderTo} tr > td:nth-child(8)`);
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

let lessee_property = $(`#table-${w.general.renderTo} tr > td:nth-child(4)`);
lessee_property.each(function (i, td) {
    td.innerHTML = lessee_property[i].innerText.replace('{"','').replace('"}','').replaceAll('","','<br>'); 
});
prev_rating.each(function (i, td) {
    td.innerHTML = prev_rating[i].innerText.replace('0',''); 
});


// прячем последний столбец, с глубиной ПДЗ
$('#table-' + w.general.renderTo + ' th:last-child').css({ 'display': 'none' });
$('#table-' + w.general.renderTo + ' tbody > tr > td:last-child').css({ 'display': 'none' });

$('#'+w.general.renderTo + ' tbody > tr').not('th').click(function() {
  const secondCellText = $(this).find('td').eq(2).text();
  selectValue(secondCellText)
});

function selectValue (text) { 
    visApi().setFilterSelectedValues(clientFilterGuid, [[text]]);
    
    $('#widget-'+w.general.renderTo).css('left', 1830);
    $('#widget-action-'+dumbellGuid).css('display', 'block');
    $('#widget-action-'+dumbellGuid).find('div.va-widget-filter-btn').css('display', 'block');
    
      // Фильтруем эти divs, чтобы найти те, у которых первый дочерний элемент имеет определенный текст
    const targetDiv = $('div.rowDiv.tooltip').filter(function() {
        return $(this).children().first().text() === text;
    });
    
    // Если такой div найден, делаем что-то (например, выводим его в консоль)
    if (targetDiv.length > 0) { 
        setTimeout(() => { 
            $(targetDiv[0]).css('background-color', 'rgba(255, 255, 255, 0.7)');
            $(targetDiv[0]).css({
              'border-left': '5px solid rgb(28,70,128)',
              'background-color': 'rgba(245,245,245, 0.7)',
              'color': '#1c4680'
            });
        }, 100);
    }
} 
