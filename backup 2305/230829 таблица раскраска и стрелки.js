// let colorizedColumns = [8, 9, 12]
// let valueIdx = []
// let valueColumn = {}
let tableGuid = '7142b9c4c00840248c0cae5ff6ed7d17'
let styles = [];
let levels = ["Низкий", "Средний", "Высокий", "Критический", "Без данных"];
let noDataLabels = ["Без данных", "<Пусто>", ""];
let noPosition = ["Без данных", "Без изменений"];
let colors = ["#aed581", "#ffea00", "#ffab40", "#ff8a80", "#f5f5f5"];
let data = []
let newRecords = []
let columnNames = []
let sources = [w.general.renderTo, tableGuid];
let sourceData = _.map(sources, i => null);
let ready = 0;
_.each(sources, function (guid, idx) {
    visApi().getWidgetDataByGuid(guid).then(function (widgetData) {
        sourceData[idx] = widgetData.data;
        ready++;
        if (ready == sources.length) {
            prepareData();  
        }
    });
});

function prepareData() {
    _.each(sourceData[0].rows, function(row, rowIdx){
        let item = {
            name: row[0],
            subRow: [],
            columns: []
        }
        _.each(sourceData[0].cols, function(col, colIdx){
            if (sourceData[0].values[colIdx][rowIdx] !== null){
                item.columns.push({
                    name: col[1],
                    value: sourceData[0].values[colIdx][rowIdx],
                    color: col[2],
                    position: col[3],
                    description: col[4]
                })
                if (columnNames.indexOf(col[1]) === -1){
                    columnNames.push(col[1])
                }
            }
        })
        data.push(item)
    })
    _.each(sourceData[1].rows, function(row, rowIdx){
        let dataRow = _.find(data, { name: row[0] })
        if (dataRow) {
            dataRow.subRow.push({
                name: row[1],
                value: sourceData[1].values[0][rowIdx]
            })
        }
    })
    columnNames.unshift('Ед')
    refresh()
} 

function refresh(){
    let records = []
    let rowNames = []
    _.each(data, function(el, idx){
        el.name = el.name.trim()
        if (el.subRow.length === 0){
            el.subRow.push({
                name: '',
                value: null
            })
        }
        _.each(el.subRow, function(item, index){
            let rec = {
                rowNames: [el.name, item.name],
                recid: records.length,
            }
            rec['column 0'] = item.value
            _.each(columnNames, function(col, colIdx){
                if (colIdx > 0) {
                    let itemCol = _.find(el.columns, { name: col })
                    rec['column ' + colIdx] =  itemCol ? itemCol.value : ''
                }
            })
            rec.item = el
            rec.subRow = item
            rowNames.push([el.name, item.name]);
            records.push(rec)
        })
    })
   
    records = records.sort(function(a, b){
        if (a.rowNames[0] === 'Итого по отрасли' || b.rowNames[0] === 'Итого по отрасли'){
            return -1
        }
        return a.rowNames[0] > b.rowNames[0] ? 1 : -1
    })
    
    TableRender({
        table: w.general,
        style: w.style,
        columns: _.flatten([{ captions: ["КИР"] }, { captions: ["Парк в аренде"] },_.map(columnNames, function(el, idx){ return { captions: [el], field: 'column ' + idx } })]),
        records: records,
        editMask: w.data.editMask,
        rowNames: rowNames,
        colNames: _.map(columnNames, function(el){ return [el] }),
        showToolbar: false
    });
    var headColor = '#f5f5f5'
    let tr = $('#table-' + w.general.renderTo + ' tbody tr')
    tr.each(function(index, item){
        let firstTd = $(this).find('td').eq(0)
        firstTd.attr('rowspan', '1')
        firstTd.show()
    })
    $('#table-' + w.general.renderTo + ' thead').css({
        'background': headColor,
        'border-bottom': '3px solid #f2f2f2',
        'height': '80px'
    });
    $('#table-' + w.general.renderTo + ' thead tr th').css({
        'border': '1px solid ' + headColor,
        'width': '80px',
        'word-break': 'break-word',
        'font-weight': 'normal'
    });
    $('#table-' + w.general.renderTo + ' thead tr th:first-child').css({
        'width': '180px'
    })
    $('#table-' + w.general.renderTo + ' thead tr th:nth-child(3)').css({
        'width': '40px'
    })
    $('#table-' + w.general.renderTo + ' thead tr th:first-child > div > span').css({
        'text-align': 'left'
    });
    $('#table-' + w.general.renderTo + ' tbody tr td').css({
        'background': headColor,
        'border': '1px solid white',
        'padding': '5px',
        'text-align': 'right'
    });
    $('#table-' + w.general.renderTo + ' tbody tr td:first-child').css({
        'text-align': 'left'
    });
    $('#table-' + w.general.renderTo + ' tbody tr td:nth-child(2)').css({
        'text-align': 'left'
    })
    // Выделение первой строки жирным 
    $('#table-' + w.general.renderTo + ' tbody tr:first-child').css({
        'font-weight': 'bold'
    });
    $('#table-' + w.general.renderTo + ' tr:nth-child(odd) td:first-child').css({
        'background': 'white'
    }) 
    tr.each(function(index, item){
        $(item).find('td').each(function(tdKey){
            if (tdKey > 2) {
                let column = _.find(records[index].item.columns, { name: columnNames[tdKey - 2] })
                if (column) {
                    var triangle = '<svg height="13" id="triangle-up" viewBox="0 0 32 32" width="13" xmlns="http://www.w3.org/2000/svg"><path d="M4 24 H28 L16 6 z"/></svg>'
                    let triangleblock = $('<div class="triangle-container">' + triangle + '</div>')
                    $(this).css({
                        background: getCellColor(column.color)
                    })
                    if (getPosition(column.position)) {
                        if (column.position === "Положительная вниз"){
                            triangleblock.addClass('positive down')
                        }
                        if (column.position === "Положительная вверх"){
                            triangleblock.addClass('positive up')
                        }
                        if (column.position === "Отрицательная вниз"){
                            triangleblock.addClass('negative down')
                        }
                        if (column.position === "Отрицательная вверх"){
                             triangleblock.addClass('negative up')
                        }
                        $(this).append(triangleblock)
                    }
                    
                }
            }
        })
    });
    $('#table-' + w.general.renderTo).css({'border-collapse':'collapse'}); // initial - жирные разделители столбцов; collapse - тонкие разделители
    document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
      var translate = "translate(0,"+this.scrollTop+"px)";
      this.querySelector("thead").style.transform = translate;
    });
}
function getCellColor(text){
    if (noDataLabels.indexOf(text) >= 0){
        text = noDataLabels[0]
    }
    let idxText = levels.indexOf(text)
    if (idxText >= 0){
        return colors[idxText]
    } else {
        return colors[colors.length - 1]
    }
}
function getPosition(text){
    let idxText = noPosition.indexOf(text)
    if (idxText >= 0){
        return false
    } else {
        return true
    }
}



styles.push("#widget-" + w.general.renderTo + " { font-family: Open Sans; font-size: 13px; }");
styles.push("#widget-" + w.general.renderTo + " .triangle-container { display: inline-block; }");
styles.push("#widget-" + w.general.renderTo + " .triangle-container.positive svg { fill: green; stroke: white;stroke-width: 3px; }");
styles.push("#widget-" + w.general.renderTo + " .triangle-container.down { transform: rotate(180deg);position: relative;top: 1px;left:2px;}");
styles.push("#widget-" + w.general.renderTo + " .triangle-container.up { position: relative;top: -1px;left:2px;}");
styles.push("#widget-" + w.general.renderTo + " .triangle-container.negative svg { fill: red; stroke: white;stroke-width: 3px; }");
// styles.push("#widget-" + w.general.renderTo + " .triangle-container.negative.down svg { fill: red; stroke: white;stroke-width: 3px; }");

$("#styles-" + w.general.renderTo).remove();
let styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = (styles.join(' ')).split('  ').join(' ');
styleSheet.id = "styles-" + w.general.renderTo;
document.head.appendChild(styleSheet);

