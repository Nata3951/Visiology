// переписываем заголовки строк
w.data.rowNames.forEach(el => {
    if (el[0].includes('ыручка')) el[0] = '2. Увеличение нетарифной выручки по конкурентным видам услуг';
    if (el[0].includes('отери')) el[0] = '1. Снижение потерь электрической энергии 0,4 - 20 кВ';    
    if (el[0].includes('роизводит')) el[0] = '3. Повышение производительнсти труда';
    });

// сортируем по возрастанию заголовков строк

w.data.rowNames.sort(function(a, b) {
    return (a[0] > b[0]) ? 1: -1;
});

w.data.records.sort(function(a, b) {
    return (a.rowNames[0] > b.rowNames[0]) ? 1: -1;
});

// переписываем названия показателей
// [1].forEach(function(j) {
//     $(`#table-${w.general.renderTo} tr > td:nth-child(${j})`).each(function(i, td) {
//         var value = +td.innerHTML;
//         if (td.innerText.includes('ыручка')) td.innerText = '2. Увеличение нетарифной выручки по конкурентным видам услуг';
//         if (td.innerText.includes('отери')) td.innerText = '1. Снижение потерь электрической энергии 0,4 - 20 кВ';    
//         if (td.innerText.includes('роизводит')) td.innerText = '3. Повышение производительнсти труда';
//     });        
// });
