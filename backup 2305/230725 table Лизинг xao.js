w.data.columns.map((row) => row.sortable = false);
w.data.columns[1].sortable = false
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
var colors = {
    'low': '#ccebdb',
    'medium': '#FFFFCC',
    'high': '#FCC1C1',
    'critical': '#FF6666'
};

var rowNames = w.data.rowNames[0][0];

$('#table-' + w.general.renderTo + ' tr > td:nth-child(4)').each(function(i, td) {
    var value = parseFloat(td.innerHTML.replace(',', '.'));
    var color = '';
    
    if (value < 1) {
        color = colors['low'];
    } else if (value < 1.11) {
        color = colors['medium'];
    } else if (value < 1.21) {
        color = colors['high'];
    } else {
        color = colors['critical'];
    }
    
    $(td).css({
        "background-color": color,
    });
});

$('#table-' + w.general.renderTo + ' tr > td:nth-child(5)').each(function(i, td) {
    var value = parseFloat(td.innerHTML.replace(',', '.'));
    var color = '';
    
    if (rowNames === 'Водный транспорт') {
        if (value === 0) {
            color = colors['low'];
        } else if (value < 11) {
            color = colors['medium'];
        } else if (value < 20) {
            color = colors['high'];
        } else {
            color = colors['critical'];
        }
    } else if (rowNames === 'Авиация' || rowNames === 'Ж/Д Транспорт') {
        if (value < 6) {
            color = colors['low'];
        } else if (value < 16) {
            color = colors['medium'];
        } else if (value < 30) {
            color = colors['high'];
        } else {
            color = colors['critical'];
        }
    }
    
    $(td).css({
        "background-color": color,
    });
});

var headColor = '#fff'
$('#table-' + w.general.renderTo + ' thead').css('background',headColor);
$('#table-' + w.general.renderTo); // initial - жирные разделители столбцов; collapse - тонкие разделители
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});
$('#table-' + w.general.renderTo + ' th:nth-child(2)')
.html('Предмет лизинга/<br>аренды')
.css({
    "width":"210px",
    "text-align": "left"    
});
$('#table-' + w.general.renderTo + ' th:nth-child(3)')
.html('Кол-во, ед.')
.css({
    "width":"140px",
    "text-align": "left"    
});
$('#table-' + w.general.renderTo + ' th:nth-child(4)')
.text('LTV')
.css({
    "width":"140px",
    "text-align": "left"   
});
$('#table-' + w.general.renderTo + ' th:nth-child(5)')
.html('Простой, %')
.css({
    "width":"140px",
    "text-align": "left"    
});
$('#table-' + w.general.renderTo + ' th')
.css({
    "font-weight": "500",
})
var $cols = $('#table-' + w.general.renderTo + ' td:not(:nth-child(1))');
$cols.css({
    "font-weight":"500"
});
$('#table-' + w.general.renderTo + ' th:first-child').remove();
$('#table-' + w.general.renderTo + ' tbody > tr > td:first-child').remove();
var final = document.getElementById('table-' + w.general.renderTo);
var newRow = final.insertRow(-1);

var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);

cell1.innerHTML = '<span style="font-family:Open Sans;padding-left:5px;font-size:14px">ИТОГО</span>';

var sum = 0;
for (var i = 0; i < w.data.records.length; i++) {
  var value = w.data.records[i]["column 0"]; // извлекаем числовое значение из ячейки
  if (!isNaN(value)) { // проверяем, что значение действительно является числом
    sum += value;
  }
}

cell2.innerHTML = '<span style="font-family:Open Sans;padding-left:5px;font-size:14px">'+ sum.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') +'</span>';
cell3.innerHTML = '';
cell4.innerHTML = '';

newRow.style.fontWeight = '500';
newRow.style.backgroundColor = '#fff';
newRow.style.position  = 'sticky'
newRow.style.bottom  = 0
newRow.style.height = '30px'; // устанавливаем высоту строки

