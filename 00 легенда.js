// присвоим цвета сериям
w.series.forEach((el, ind) => {
    let i = Math.round(ind%10);
    el.color = series_colors[ind];
});



w.legend.itemStyle = ({
    'fontsize' : '15px',
    'font-family' : 'Open Sans',
    'font-weight' : 'normal',
    'color' : 'grey',
    'textOverflow' : 'ellipsis',
    'width' : '130px',
    
});

w.legend.width = '170px',
