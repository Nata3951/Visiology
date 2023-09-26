const dateFilterGuid = "da6c657d1ed947c1b118788511a79ad5";

const ratingSvg = 
`<div class="svg-text-pair" style="margin-right: 100px;">
    <div class="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Слой_1" x="0px" y="0px" viewBox="0 0 70 20" xml:space="preserve" style="height: 12px;">
            <style type="text/css">
            	.ratingSvg0{fill:#AED581;}
            	.ratingSvg1{fill:#FFD600;}
            	.ratingSvg2{fill:#FFAB40;}
            	.ratingSvg3{fill:#FF8A80;}
            </style>
            <g>
            	<path class="ratingSvg0" d="M8.6,16c3.3,0,6-2.7,6-6s-2.7-6-6-6s-6,2.7-6,6S5.2,16,8.6,16"/>
            	<path class="ratingSvg1" d="M26.2,16c3.3,0,6-2.7,6-6s-2.7-6-6-6s-6,2.7-6,6S22.9,16,26.2,16"/>
            	<path class="ratingSvg2" d="M43.8,16c3.3,0,6-2.7,6-6s-2.7-6-6-6c-3.3,0-6,2.7-6,6S40.5,16,43.8,16"/>
            	<path class="ratingSvg3" d="M61.4,16c3.3,0,6-2.7,6-6s-2.7-6-6-6c-3.3,0-6,2.7-6,6S58.1,16,61.4,16"/>
            </g>
        </svg>
    </div>
    <p class="svg-text" >рейтинг</p>
</div>`

w.yAxis.tickPositions = [0, 1.4, 2.4, 3.4, 4.4];

w.xAxis.labels.formatter = function() {
    let label = this.value.split(' - ');
    return label[1] + 'Q '+ label[0];
};

w.yAxis.labels.formatter = function() {
    let label = this.value;
    if (label == 4.4) return 'D';
    else if (label == 3.4) return 'C';
    else if (label == 2.4) return 'B';
    else if (label == 1.4) return 'A';
    return '';
};

let red = '#ff8a80';
let orange = '#ffab40';
let yellow = '#ffea00'; 
let green = '#aed581';

// Задаём цвета для диапазонов значений
w.plotOptions.series.zones = [
    {
        color:green,
        value: 1.4
    },{
        color:yellow,
        value: 2.4
    },{
        color:orange,
        value: 3.4
    },{
        color:red
    }];

visApi().getWidgetDataByGuid(dateFilterGuid).then(d => {
    if (d.data)
        w.series[0].data = filterBeforeDate(w.series[0].data, d.data.rows[0][0]);
    
    Highcharts.chart({
        chart: w.general,
        xAxis: w.xAxis,
        yAxis: w.yAxis,
        plotOptions: w.plotOptions,
        series: w.series,
        drilldown: w.drilldown,
        legend: w.legend,
        tooltip: {
                backgroundColor: '#212121',
                borderColor: '#212121',
                borderWidth: 1,
                borderRadius: 8,
                headerFormat: '<span style="font-size:12px;color:#bdbdbd;font-family:Open Sans">{point.key}</span><table>',
                pointFormat: '<tr><td style="font-size:12px;font-family:Open Sans;color:#bdbdbd;padding:10">{series.name}: </td>' +
                '<td style="padding:0;text-align:right"><b style="font-size:13px;color:#ffffff;font-family:Open Sans">{point.y:,.2f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
    });
    
    
    $(`#widget-header-${w.general.renderTo} > a`)[0]
    .innerHTML = '<span style="display:inline-block;width:90%;"> Динамика изменения рейтинга </span><span style="font-weight:normal;color: #757575;"> баллы </span>';
    
    $('#widget-header-' + w.general.renderTo + ' > a').css({
        'padding-top': '10px',
        'padding-bottom': '10px',
        'padding-left': '10px'
     });
     
      $(`#widget-${w.general.renderTo}  > div.va-widget-body-container`).css({
          'padding-bottom': '2px'
     });
})


function filterBeforeDate(inputData, dateString) {
    const [year, month] = dateString.split('-').map(Number);

    // Определяем квартал на основе месяца
    const quarter = Math.ceil(month / 3);

    // Фильтруем данные
    return inputData.filter(item => {
        const itemYear = Number(item.names[0]);
        const itemQuarter = Number(item.names[1]);

        if (itemYear < year) return false;
        if (itemYear === year && itemQuarter < quarter) return false;
        
        return true;
    });
}
