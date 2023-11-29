// https://bi.gtlk.ru/viewer?dashboardGuid=d3088081e6cc4bdc9c977e72974ce0f4&sheetGuid=4f63cfe83bde4466a3d11a1a7703cf23&fit=true

// let colorizedColumns = [8, 9, 12]
// let valueIdx = []
// let valueColumn = {}
let tableGuid = '2626b84fc81b4d20a39ed0135c54d6ee' 
let buttonGuid = '2024c5791d084f02867d025b386a04e7';
let styles = []; 
let levels = ["Низкий", "Средний", "Высокий", "Критический", "Без данных"];
let noDataLabels = ["Без данных", "<Пусто>", ""];
let noPosition = ["Без данных", "Без изменений", "Нет данных"];
let colors = ["#eef6e5", "#fffacc", "#ffeed8", "#ffe7e5", "#f5f5f5"];
const tooltipWidth = 270;// Задаем ширину изображение в tooltip
const tooltipHeight = 175;// Задаем высоту изображение в tooltip
let data = []
let newRecords = []
let columnNames = []
let sources = [w.general.renderTo, tableGuid];
let sourceData = _.map(sources, i => null);
let ready = 0;

let columnImages = {

    };

$('#'+buttonGuid+' > div').text("Раскрыть все")


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
        
        console.log('row: ', row, rowIdx)
        
        let item = { 
            name: row,
            subRow: [],
            columns: [],
            contractorAverageWeight: 0,
            contractorCriticalWeight: 0
        }
        _.each(sourceData[0].cols, function(col, colIdx){
            // console.log('col: ', col, colIdx)
            // console.log(sourceData[0].values[colIdx][rowIdx])
            // console.log(columnNames)
            

            if (sourceData[0].values[colIdx][rowIdx] !== null) {
                item.columns.push({
                    name: col[1],
                    value: sourceData[0].values[colIdx][rowIdx],
                    color: col[2],
                    position: col[3],
                    description: col[4]
                })
                
                if (col[2] == "Высокий" || col[2] == "Критический"){
                    item.contractorCriticalWeight++
                }
                if (col[2] == "Средний"){
                    item.contractorAverageWeight +=2
                }
                if (col[2] == "Низкий"){
                    item.contractorAverageWeight +=1
                }
                if (columnNames.indexOf(col[1]) === -1){
                    columnNames.push(col[1])
                }
            }
        })
        
        // console.log(item)
        // console.log(item.name)
        // console.log('-------')
        
        
        
        data.push(item)
    })
    
    
    _.each(sourceData[1].rows, function(row, rowIdx){
        let dataRow = _.find(data, function(item) { 
            let string1 = item.name.join(" ").toLowerCase().trim().replace(/\s+/g, ' ');
            let string2 = row.join(" ").toLowerCase().trim().replace(/\s+/g, ' ');
            
            return string1 == string2
        })
        
        if (dataRow) {
            dataRow.value = sourceData[1].values[0][rowIdx]
        }
    })
    
    
    // Map для хранения родительских элементов
    const parentMap = new Map();
    
    // Массив для хранения новых родительских элементов (с дочерними элементами в childrensArr)
    const newArray = [];
    let tempData = [];
    
    
    data.forEach((el, ind) => {
        if (ind == 0 || data[ind-1].name[0] !== el.name[0]) {
            if (el.name[1] !== '') {
                let duplicate = JSON.parse(JSON.stringify(el)); // Предполагается, что это объект
                
                duplicate.columns = []
                duplicate.value = null;
                
                
                duplicate.name[1] = '';
    
                // Вставляем дубликат в массив на позицию i+1
                // data.splice(ind, 0, duplicate);
                
                tempData.push(duplicate)
                tempData.push(el)
            } 
            else {
                tempData.push(el)
            }
        } else {
            tempData.push(el)
        }
    })
    
    data = tempData
    
    
    // Первый проход: Идентификация родительских элементов
    data.forEach(item => {
        if (item.name[1] === '') {
            // Добавляем пустой массив childrensArr к родительскому элементу
            item.childrensArr = [];
            // Сохраняем родительский элемент в Map
            parentMap.set(item.name[0], item);
            // Добавляем родительский элемент в новый массив
            newArray.push(item);
        }
    });
    

    
    // Второй проход: Нахождение и добавление дочерних элементов
    data.forEach(item => {
        if (item.name[1] !== '') {
            // Ищем родительский элемент в Map
            const parentItem = parentMap.get(item.name[0]);
            if (parentItem) {
                parentItem.contractorCriticalWeight += item.contractorCriticalWeight;
                parentItem.contractorAverageWeight += item.contractorAverageWeight;
                // Добавляем дочерний элемент в childrensArr родительского элемента
                parentItem.childrensArr.push(item);
            }
        }
    });
    
    // Сортируем массив newArray
    newArray.sort((a, b) => {
        if (a.contractorCriticalWeight > 0 || b.contractorCriticalWeight > 0) {
            return b.contractorCriticalWeight - a.contractorCriticalWeight;
        }
        return b.contractorAverageWeight - a.contractorAverageWeight;
    });
    
    newArray.forEach((el, ind) => {
        if (el.childrensArr.length)
            el.contractorAverageWeight = el.contractorAverageWeight / el.childrensArr.length
    })
    
    // Создаем новый массив для хранения "раскрытых" элементов
    const expandedArray = [];
    
    // Проходимся по отсортированному массиву newArray
    newArray.forEach(item => {
        // Добавляем родительский элемент в expandedArray
        expandedArray.push(item);
        // Если у родительского элемента есть дочерние элементы, добавляем их тоже
        if (Array.isArray(item.childrensArr)) {
            expandedArray.push(...item.childrensArr);
        }
    });
    
    data = expandedArray;

    columnNames.unshift('Ед')
    refresh()
} 

function refresh(){
    let records = []
    let rowNames = []
    
    _.each(data, function(el, idx){
        let rec = {
            rowNames: el.name.map(el => {return (el == "<Пусто>"?"":el)}),
            recid: records.length,
        }
        rec['column 0'] = el.value?el.value:null
        
        _.each(columnNames, function(col, colIdx){
            if (colIdx > 0) {
                let itemCol = _.find(el.columns, { name: col })
                rec['column ' + colIdx] =  itemCol ? Number(itemCol.value).toLocaleString('ru-RU') : ''
            }
        })
        rec.item = el
        // rec.subRow = item
        let names = el.name
        
        rowNames.push(names);
        records.push(rec)
    })
    
    records = records.sort(function(a, b){
        if (a.rowNames[0] === 'Итого по отрасли') return -1; 
        if (b.rowNames[0] === 'Итого по отрасли') return 1;
    })
    
    TableRender({
        table: w.general,
        tooltip: {
            useHTML: true,
            formatter: function() { 
                return '<img src="http://highcharts.com/demo/gfx/sun.png"/>' + s;
            }
        },
        style: w.style,
        columns: _.flatten([{ captions: ["КИР"] }, { captions: ["Парк в аренде"] },_.map(columnNames, function(el, idx){ return {  captions: [el], field: 'column ' + idx } })]),
        records: records,
        editMask: w.data.editMask,
        rowNames: rowNames,
        colNames: _.map(columnNames, function(el){ return [el] }),
        showToolbar: false
    });
    
    const mainTable = document.querySelector('#table-' + w.general.renderTo);
    const listRows = document.querySelectorAll('#table-' + w.general.renderTo + ' tbody tr');
    const mainRows = []; 
    let hiddenRowsArr = [];
    
    // находим строчки которые должны открываться
    listRows.forEach((el, ind) => {
        if ($(el)[0].children[0].innerText !== "Итого по отрасли" 
        && $(el)[0].children[1].innerText == ""
        && $(listRows[ind+1])[0]
        && $(el)[0].children[0].innerText == $(listRows[ind+1])[0].children[0].innerText) {
            el.classList.add('row-trigger');
            mainRows.push(el);
        }
    })
    
    mainRows.forEach((el, ind) => {
        hiddenRowsArr[ind] = [];
        
        listRows.forEach((row) => {
            if ($(row)[0].children[0].innerText == $(el)[0].children[0].innerText && $(row)[0].children[1].innerText !== "")
                hiddenRowsArr[ind].push(row)
        })
    })
    
    hiddenRowsArr.forEach(rows => appendHiddenRows(rows))
    
    // // поиск строк для скрытия
    // const indexHiddenRow = [];
    // for (let i = 0; i < nameRows.length; i++) {
    //     indexHiddenRow.push(null);
    // }
    
    // listRows.forEach((el, index) => {
    //     for (let i = 0; i < indexHiddenRow.length; i++) {
    //         if (el === mainRows[i]) {
    //             indexHiddenRow[i] = index;
    //         }
    //     }
    // })
    
    
    // const hiddenRowsArr = [];
    // for (let i = 0; i < indexHiddenRow.length; i++) {
    //     hiddenRowsArr[i] = Array.from(listRows).slice(indexHiddenRow[i] + 1, indexHiddenRow[i + 1])
    // }
    
    
    // добавление строк в скрытый контейнер
    function appendHiddenRows(rows) {
        let wrapper = document.createElement('table');
        wrapper.setAttribute('class', 'wrapper__rows-hidden');
    
        for (let i = 0; i < rows.length; i++) {
            rows[i].parentNode.insertBefore(wrapper, rows[i]);
            wrapper.appendChild(rows[i]);
        }
    }

    
    // по клику открываем/скрываем строки
    const hiddenRows = document.querySelectorAll('#table-' + w.general.renderTo + ' tbody .wrapper__rows-hidden');
    
    if (mainRows.length && hiddenRows.length) {
        mainRows.forEach((row, index) => row.addEventListener('click', (e) => {
            if (!row.classList.contains('active')) {
                row.classList.add('active');
                hiddenRows[index].classList.add('active');
            } else {
                row.classList.remove('active');
                hiddenRows[index].classList.remove('active');
            }
        }))
    }
    
    var headColor = '#f5f5f5'
    let tr = $('#table-' + w.general.renderTo + ' tbody tr')
    tr.each(function(index, item){
        let firstTd = $(this).find('td').eq(0)
        firstTd.attr('rowspan', '1')
        firstTd.show()
    })
    $('#table-' + w.general.renderTo + ' thead').css({
        'z-index': 1,
        'position': 'relative',
        'background': headColor,
        'border-bottom': '3px solid #eeeeee',
        'height': '125px'
    });
    
    $('#table-' + w.general.renderTo + ' thead tr th').css({
        'border': '3px solid #eeeeee',
        'width': '80px',
        'word-break': 'break-word',
        'font-weight': 'normal'
    });
    
    $('#table-' + w.general.renderTo + '  table  tr  td').css({
        'background': '#fafafa',           //цвет раскрытых строк
        'color': '#757575'
    });

    $('#table-' + w.general.renderTo + ' thead tr th:first-child').css({
        'width': '180px'
    })

    $('#table-' + w.general.renderTo + ' thead tr th:nth-child(3)').css({
        'width': '40px'
    })
    $('#table-' + w.general.renderTo + ' thead tr th:first-child > div > span').css({
        'text-align': 'center'
    });
    $('#table-' + w.general.renderTo + ' tbody tr td').css({
        'border': '1px solid #eeeeee',
        'padding': '5px',
        'text-align': 'right'
    });
        $('#table-' + w.general.renderTo + ' tbody tr').css({
        'background': '#eeeeee'
    });
    $('#table-' + w.general.renderTo + ' tbody tr td:first-child').css({
        'text-align': 'left'
      
        
    });
    $('#table-' + w.general.renderTo + ' tbody tr td:nth-child(2)').css({
        'text-align': 'left'
    })
    // Выделение чисел жирным
    $('#table-' + w.general.renderTo + ' > tbody tr td:nth-child(n+3):nth-child(-n+11').css({
        'font-weight': 'bold'
    });
    // $('#table-' + w.general.renderTo + ' tr:nth-child(odd) td:first-child').css({
    //     'background': 'white'
    // }) 
    
    
    
    
    tr.each(function(index, item){
        $(item).find('td').each(function(tdKey){
            if (tdKey > 2) {
                let column = _.find(records[index].item.columns, { name: columnNames[tdKey - 2] })
                if (column) {
                    var triangle = '<svg height="13" id="triangle-up" viewBox="0 0 32 32" width="13" xmlns="http://www.w3.org/2000/svg"><path d="M4 24 H28 L16 6 z"/></svg>'
                    let triangleblock = $('<div class="triangle-container">' + triangle + '</div>')
                    let columnImageId = columnImages[column.name];
                    if (columnImageId) {
                        $(this).attr('data-img-src', columnImageId); 
                    }
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

    $('div.tooltip').remove();
    const tooltip = $('<div class="tooltip"></div>').appendTo('body');
    
    $('td:nth-child(n+3)').off('mouseenter').on('mouseenter', function() {
    if ($(this).text() !== "") {
        const imgSrc = $(this).data('img-src');
        
        // Позиционирование тултипа относительно ячейки
        const cellOffset = $(this).offset();
        tooltip.css({
            background: imgSrc,
            width: tooltipWidth+'px', // Задаем ширину изображение в tooltip
            height: tooltipHeight+'px', // Задаем высоту изображение в tooltip
            top: cellOffset.top + $(this).height(),
            left: cellOffset.left - 100,
            visibility: 'visible',
            opacity: 1
        });
    }
    })
    $('td').off('mouseleave').on('mouseleave', function() {
        tooltip.css({
            visibility: 'hidden',
            opacity: 0
        });
    });
    const thisId = `#widget-${w.general.renderTo}`
    const styleTable = document.createElement('style');
    
    styleTable.innerHTML = `
    
    ${thisId} table {
        position: relative;
        font-family: ${w.style.header.textStyle.fontFamily};
    }
    
    ${thisId} tbody {
        overflow: scroll;
        height: 100%;
    }
    

    
    ${thisId} td:first-child {
        padding-left: 55px !important;
    }
    

    
    ${thisId} td {
        border-right: none !important;
        border-left: none !important;
    }
    
    ${thisId} .row-trigger {
        transition: 0.3s;
    }

    
    ${thisId} .row-trigger td:first-child {
        position: relative;
    }
    
    ${thisId} .row-trigger td:first-child::after {
        position: absolute;
        content: "";
        left: 30px;
        top: 5px;
        width: 9px;
        height: 9px;
        border-bottom: 1px solid #758e9a;
        border-right: 1px solid #758e9a;
        transform: rotate(45deg);
        transition: 0.3s
    }
    
    ${thisId} .row-trigger.active td:first-child::after {
        transform: rotate(225deg);
        top: 12px;
    }
    
    ${thisId} .wrapper__rows-hidden {
        background: '#ffffff';
        width: ${$('#table-' + w.general.renderTo).width()+'px'};
        table-layout: fixed;
        border-collapse: collapse;
        display: none;
    }
    
    ${thisId} .wrapper__rows-hidden.active {
        display: table;
    }

    ${thisId} .wrapper__rows-hidden td {
        width: 80px;
    }
    
    ${thisId} .wrapper__rows-hidden td:nth-child(1) {
        width: 180px;
    }
    
    ${thisId} .wrapper__rows-hidden td:nth-child(3) {
        width: 40px;
    }

    ${thisId} tbody tr:last-of-type.row-result {
        table-layout: fixed;
        border-collapse: collapse; 
        font-weight: bold;
        background-color: #FAFAFA !important;
        box-shadow: 0px 0px 0px 2px #b4e5fc inset;
    }
    
     tbody tr:nth-child(odd) td:first-child {
        background-color: red; 
    }
    .tooltip {
        position: absolute;
        z-index: 1;
        padding: 5px;
        border: 1px solid #ccc;
        visibility: hidden;
        transition: opacity 0.3s;
        opacity: 0;
    }
    
    .tooltip img {
        max-width: 200px;
        max-height: 200px;
    }
    `
    
    $('#table-'+w.general.renderTo+' > tbody > tr > td:first-child').each(function(index) {
        if (index % 2 === 0) {
            $(this).css('background-color', '#ffffff'); // цвет для четных строк
        } else {
            $(this).css('background-color', '#ffffff'); // цвет для нечетных строк
        }
    });

    
    mainTable.appendChild(styleTable)
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



styles.push("#widget-" + w.general.renderTo + " { font-family: Open Sans; font-size: 13px;}");
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

