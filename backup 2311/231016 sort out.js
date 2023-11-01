// insert with jquery
$('<div>', {
    id: 'id10',
    class: 'chart-container',
    text: 'this is MAIN CONTAINER'
    })
    .appendTo(mainDiv);


// formatter
dataLabels: {

                formatter: function () {
                                if (this.point.value !== 0) {
                                return this.point.value;
                                }
                            return null;


// pie chart series colors

w.series[0].data[0].color = '#2196f3';
w.series[0].data[1].color = '#ff9800';
w.series[0].data[2].color = '#00bcd4';
w.series[0].data[3].color = '#9c27b0';


// посчитать суммы колонок
const rowCount = w.data.rowNames.length;
const colCount = w.data.colNames.length;

// console.log(w.data.colNames[colCount - 1][1])

w.data.colNames[colCount - 1][1] = 'ВСЕГО по<br>проекту';  // добавление заголовка в последний столбец
w.data.rowNames[rowCount] = ['ИТОГО по терминалу'];    // добавление заголовка в последнюю строку

let sumCol0 = 0;
let sumCol1 = 0;
let sumCol2 = 0;
let sumCol3 = 0;

w.data.records.forEach(el => {
    sumCol0 += el['column 0'];
    sumCol1 += el['column 1'];
    sumCol2 += el['column 2'];
    sumCol3 += el['column 3'];
})

// запись суммы столбцов в последнюю строку
w.data.records[rowCount] = {
    "rowNames": w.data.rowNames[rowCount],
    "recid": rowCount
}

if (sumCol0) 
    w.data.records[rowCount]["column 0"] = sumCol0;
if (sumCol1) 
    w.data.records[rowCount]["column 1"] = sumCol1;
if (sumCol2) 
    w.data.records[rowCount]["column 2"] = sumCol2;
if (sumCol3) 
    w.data.records[rowCount]["column 3"] = sumCol3;

// partial match
// https://complete-concrete-concise.com/tutorials/webdev/front-end-basics/attribute-selectors-advanced-css-selectors-part-4/
      for (let elem of links) {
            if (elem.matches('[href*="://"]') && !elem.matches('[href^="http://internal"]')) {
                console.log("test Ссылка на архив: " + elem.href);
                elem.style.backgroundColor = 'gold';
            }
        }

