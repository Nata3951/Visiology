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
    "font-weight":"normal"
});


// настраиваем колонки
$('#table-' + w.general.renderTo + ' th:nth-child(1)').css({
    "width":"14%"
});

$('#table-' + w.general.renderTo + ' th:last-child').css({
    "width":"8%"
});
