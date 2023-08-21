// Индексы серий, у которых мы должны делать накопительный итог
const cumulativeTotalSeriesList = [0]
// Делаем накопительный итог у нужных серий
w.series.forEach((serie, serieIndex) => {
    if (cumulativeTotalSeriesList.includes(serieIndex)) {
        serie.data.forEach((el, index) => {
            if (index > 0) {
                el.y = (el.y || 0) + (serie.data[index - 1].y || 0)
            }
        })
    }
})

// - - -
//   Код для виджета с 4 запросами:
// Индексы серий, у которых мы должны делать накопительный итог
const cumulativeTotalSeriesList = [1, 3]
// Делаем накопительный итог у нужных серий
w.series.forEach((serie, serieIndex) => {
    if (cumulativeTotalSeriesList.includes(serieIndex)) {
        serie.data.forEach((el, index) => {
            if (index > 0) {
                el.y = (el.y || 0) + (serie.data[index - 1].y || 0)
            }
        })
    }
})
