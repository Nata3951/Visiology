const wDup = JSON.parse(JSON.stringify(w))

const filterData = wDup.data.rows.map(row => {
    return ({
        id: row[0],
        text: row[0],
        lazyLoading: false
    })
})

wDup.data = {
    data: filterData,
    isTruncated: false,
    selected: []
}

FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: wDup.data
});

