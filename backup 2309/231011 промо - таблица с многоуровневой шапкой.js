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



// формируем многоуровневый заголовок


//убираем пустые ячейки в начале второго и третьего уровня заголовка, и в конце каждого уровня
$(`#table-${w.general.renderTo}  > thead > tr:nth-child(2) > th:nth-child(1)`)
    .remove();
$(`#table-${w.general.renderTo}  > thead > tr:nth-child(3) > th:nth-child(1)`)
    // .css("background-color", "pink")
    .remove();
$(`#table-${w.general.renderTo} th:contains("temp")`)
    .remove(); 

// расставляем высоту по строкам и колонкам 
[1,2,3,4,5,9,10,11].forEach(function(j) {
    $(`#table-${w.general.renderTo} > thead > tr:nth-child(1) > th:nth-child(${j})`)
        .attr("rowspan", "3");
});


[2,3,4,5,6,7].forEach(function(j) {
    $(`#table-${w.general.renderTo} > thead > tr:nth-child(2) > th:nth-child(${j})`)
        .attr("rowspan", "2");
});

$(`#table-${w.general.renderTo} th:contains("ремонтов")`)
    .attr("colspan", "4");

$(`#table-${w.general.renderTo} th:contains("каталога")`)
    .attr("colspan", "3"); 
    
$(`#table-${w.general.renderTo} th:contains("актические")`)
.attr("colspan", "2"); 



// шрифт шапки
$(`#table-${w.general.renderTo} th`).css({
    "font-weight":"normal",
    'padding-left' : '7px',
});

// форматируем текст шапки 
$('#table-'+w.general.renderTo+' > thead  div span').css({ 
    'text-align' : 'left',
    'word-break' : 'normal',
});

// скрываем маркеры сортировки
$(`#table-${w.general.renderTo} th .fa-sort`).css({ 
        "color" : "transparent",
});

// настраиваем колонки
$('#table-' + w.general.renderTo + ' th:nth-child(1)').css({
    "width":"13%"
});

$('#table-' + w.general.renderTo + ' th:last-child').css({
    "width":"8%"
});

// выравниваем числовые ячейки по правому краю
$(`#table-${w.general.renderTo} td`)
    .not(":last-child")
    .not(":first-child")
    .css({ 
        "text-align" : "right",
        "padding-right" : '10px',
});

// формат текста заголовков строк
$(`#table-${w.general.renderTo} td:first-child`)
    .css({ 
        "font-weight" : "600",
});

// подсветим последнюю строку
$(`#table-${w.general.renderTo} tbody tr:last-child`)
    .css({ 
        "background-color" : "#2196f352",
        // "font-weight" : "600",
});
