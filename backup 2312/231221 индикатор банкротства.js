// Последний месяц в наборе данных (набор содержит только первые месяцы кварталов)
const month = w.data.rows[w.data.rows.length-1][0].split('-')[1];

// ищет текущий квартал, первый квартал текущего года и первый квартал предыдущего года
// для первого квартала текущего года ищет второй квартал предыдыщего года и второй квартал два года назад
const index = {
  '01': [w.data.rows.length - 9, w.data.rows.length - 5, w.data.rows.length - 1],
  '04': [w.data.rows.length - 6, w.data.rows.length - 2, w.data.rows.length - 1],
  '07': [w.data.rows.length - 7, w.data.rows.length - 3, w.data.rows.length - 1],
  '10': [w.data.rows.length - 8, w.data.rows.length - 4, w.data.rows.length - 1]
};


// формируем новый набор данных, только из нужных рядов
if (index.hasOwnProperty(month)) {
  const [row1, row2, row3] = index[month];
  w.data.values = w.data.values.map(row => [row[row1], row[row2], row[row3]]);
  w.data.rows = [w.data.rows[row1][0], w.data.rows[row2][0], w.data.rows[row3][0]];
}



const rowsCount = 5;
const colsCount = 4;
const container = document.getElementById(w.general.renderTo);
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;
const cellWidth = containerWidth / colsCount;
const cellHeight = containerHeight / rowsCount;
for (let i = 0; i < rowsCount; i++) {
  for (let j = 0; j < colsCount; j++) {
    const newCell = document.createElement("div");
    newCell.style.width = cellWidth + "px";
    newCell.style.height = cellHeight + "px";
    newCell.style.border = "0px solid #E7E7E7";
    newCell.style.boxSizing = "border-box";
    newCell.style.float = "left";
    newCell.style.display = "flex";
    newCell.style.justifyContent = "center";
    newCell.style.alignItems = "center";
    container.appendChild(newCell);
  }
}

$('#' + w.general.renderTo + ' div:nth-child(n+1):nth-child(-n+4)').css({
  'font-family': 'Open Sans',
  'font-size': '14px',
  'color': '#757575',
  'font-weight': '500',
});
$('#' + w.general.renderTo + ' div:nth-child(n+5):nth-child(-n+20)').css({
  'font-family': 'Open Sans',
  'font-size': '14px',
  'color': '#212121',
  'font-weight': '500',
})
$('#' + w.general.renderTo + ' div:nth-child(4n+1)').css({
  'font-family': 'Open Sans',
  'font-size': '14px',
  'color': '#212121',
  'justify-content': 'left',
  'padding-left': '10px',
  'font-weight': '500',
})

// Вставляем значения в нужные ячейки

// заголовки столбцов
$('#' + w.general.renderTo + ' div:nth-child(2)').html(w.data.rows[0].toString().split('-').reverse().join('.'));
$('#' + w.general.renderTo + ' div:nth-child(3)').html(w.data.rows[1].toString().split('-').reverse().join('.'));
$('#' + w.general.renderTo + ' div:nth-child(4)').html(w.data.rows[2].toString().split('-').reverse().join('.'));

// заголовки строк
$('#' + w.general.renderTo + ' div:nth-child(5)').html('Имуществ. риски');
$('#' + w.general.renderTo + ' div:nth-child(9)').html('Кредитные риски');
$('#' + w.general.renderTo + ' div:nth-child(13)').html('Рейтинг');
$('#' + w.general.renderTo + ' div:nth-child(17)').html('Банкр. индикатор');

// имущ. риски
$('#' + w.general.renderTo + ' div:nth-child(6)').html(w.data.values[0][0] == '1' ? 'низкий (1)' : w.data.values[0][0] == '2' ? 'средний (2)' : w.data.values[0][0] == '3' ? 'высокий (3)' : 'критический (4)');
$('#' + w.general.renderTo + ' div:nth-child(7)').html(w.data.values[0][1] == '1' ? 'низкий (1)' : w.data.values[0][1] == '2' ? 'средний (2)' : w.data.values[0][1] == '3' ? 'высокий (3)' : 'критический (4)');
$('#' + w.general.renderTo + ' div:nth-child(8)').html(w.data.values[0][2] == '1' ? 'низкий (1)' : w.data.values[0][2] == '2' ? 'средний (2)' : w.data.values[0][2] == '3' ? 'высокий (3)' : 'критический (4)');

// кредитные риски
$('#' + w.general.renderTo + ' div:nth-child(10)').html(w.data.values[1][0]+ ' ('+ (w.data.values[3][0]).toFixed(2).split('.').join(',') +')');
$('#' + w.general.renderTo + ' div:nth-child(11)').html(w.data.values[1][1]+ ' ('+ (w.data.values[3][1]).toFixed(2).split('.').join(',') +')');
$('#' + w.general.renderTo + ' div:nth-child(12)').html(w.data.values[1][2]+ ' ('+ (w.data.values[3][2]).toFixed(2).split('.').join(',') +')');

// рейтинг
$('#' + w.general.renderTo + ' div:nth-child(14)').html(w.data.values[2][0]+ ' ('+ (w.data.values[4][0]).toFixed(2).split('.').join(',') +')');
$('#' + w.general.renderTo + ' div:nth-child(15)').html(w.data.values[2][1]+ ' ('+ (w.data.values[4][1]).toFixed(2).split('.').join(',') +')');
$('#' + w.general.renderTo + ' div:nth-child(16)').html(w.data.values[2][2]+ ' ('+ (w.data.values[4][2]).toFixed(2).split('.').join(',') +')');

// банкротство

for (let i=0; i<3; i++) {
    // если рейтинг банкротства не пустой
    if (w.data.values[5][i]) {
        $(`#${w.general.renderTo} div:nth-child(${18+i})`).html(w.data.values[5][i]+ ' ('+ w.data.values[6][i] +')');
    }
}

// console.log('test w', w);


// Раскраска фона div-ов в зависимости от значения

// имущественные
$('#' + w.general.renderTo + ' div:nth-child(n+6):nth-child(-n+8)').each(function() {
  const value = $(this).html().split(' ')[0];
  if (value === 'низкий') {
    $(this).css('background-color', '#ccebdb');
  } else if (value === 'средний') {
    $(this).css('background-color', '#FFFFCC');
  } else if (value === 'высокий') {
    $(this).css('background-color', '#FCC1C1');
  } else {
    $(this).css('background-color', '#FF6666');
  }
});

// кредитные
$('#' + w.general.renderTo + ' div:nth-child(n+10):nth-child(-n+12)').each(function() {
  const value = $(this).html().split(' ')[0];
  if (value === 'низкий') {
    $(this).css('background-color', '#ccebdb');
  } else if (value === 'средний') {
    $(this).css('background-color', '#FFFFCC');
  } else if (value === 'высокий') {
    $(this).css('background-color', '#FCC1C1');
  } else {
    $(this).css('background-color', '#FF6666');
  }
});


// рейтинг
$('#' + w.general.renderTo + ' div:nth-child(n+14):nth-child(-n+16)').each(function() {
  const value = $(this).html()[0];
  if (value === 'A') {
    $(this).css('background-color', '#ccebdb');
  } else if (value === 'B') {
    $(this).css('background-color', '#FFFFCC');
  } else if (value === 'C') {
    $(this).css('background-color', '#FCC1C1');
  } else {
    $(this).css('background-color', '#FF6666');
  }
});

// банкротство
$('#' + w.general.renderTo + ' div:nth-child(n+18):nth-child(-n+20)').each(function() {
  const value = $(this).html().split(' ')[0];
  if (value === 'низкий') {
    $(this).css('background-color', '#ccebdb');
  } else if (value === 'средний') {
    $(this).css('background-color', '#FFFFCC');
  } else if (value === 'высокий') {
    $(this).css('background-color', '#FCC1C1');
  } else if (value === 'критический') {
    $(this).css('background-color', '#FF6666');
  } 
});
