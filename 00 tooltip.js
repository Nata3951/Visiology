// https://www.highcharts.com/docs/chart-concepts/templating


w.tooltip = {
    shared: true,
    useHTML: true,
    formatter: function () {
        // console.log ('test this', this);
        let name = this.points[0].key;
        let name_style = "font-size:12px;color:#757575;font-family:Open Sans; font-weight:bold";
        let item_style = 'font-size:12px;font-family:Open Sans;padding:10';
        let value_style = 'padding:0; text-align:right;font-weight:bold; font-size:12px;color:#212121;font-family:Open Sans';
        let str = `<span style="${name_style}">${name}:</span><table>`;
        this.points.forEach((el, ind) => {
            
            let item = `<tr><td style="${item_style}">${el.series.name}: </td>`;
            let v = el.y.toFixed().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
            let value =  `<td style = "${value_style}">${v}</td></tr>`;
            str += item + value;
            
        })
        return str;
    }
};




const chart = Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: {
            borderWidth: 1,
            borderRadius: 8,
            headerFormat: '<span style="font-size:12px;color:#757575;font-family:Open Sans">{point.key}</span><table>',
            pointFormat: '<tr><td style="font-size:12px;font-family:Open Sans;color:{series.color};padding:10">{series.name}: </td>' +
            '<td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">{point.y:,.2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
});

// series

    plotOptions: {
        column: {
            pointPadding: 0.2,
            tooltip:{
            pointFormat: 'Value: {point.y:.2f} mm' // округление до 2 знаков
            },


         pointFormat: "{series.name} : {point.y:,.2f}"


//

        tooltip: {
        backgroundColor: '#212121',
        borderColor: '#363841',
        borderWidth: 1,
        borderRadius: 8,
        headerFormat: '<span style="font-size:12px;color:#bdbdbd;font-family:Open Sans">{point.key}</span><table>',
        pointFormat: '<tr><td style="font-size:12px;font-family:Open Sans;color:{series.color};padding:10">{series.name}: </td>' +
        '<td style="padding:0;text-align:right"><b style="font-size:13px;color:#bdbdbd;font-family:Open Sans">{point.y:,.2f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },

// fan chart - area range 

    tooltip: {
        shared: true,
        useHTML: true,
        formatter: function(e) {
            console.log(e)
            console.log(this)
            let str = `
            <span style="font-size:12px;color:#757575;font-family:Open Sans">${this.points[0].key}</span><table>
            <tr><td style="font-size:12px;font-family:Open Sans;color:${this.points[0].series.color};padding:10">${this.points[0].series.name}: </td>
            <td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">${this.points[0].y.toFixed(2)}</b></td></tr>
            <tr><td style="font-size:12px;font-family:Open Sans;color:${this.points[1].series.color};padding:10">${this.points[1].series.name}: </td>
            <td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">${this.points[1].y.toFixed(2)}</b></td></tr>
            `
            
            if (forecast[this.points[0].point.index][1]) {
                str += `
                    <tr><td style="font-size:12px;font-family:Open Sans;color:${this.points[0].series.color};padding:10">Диапазон с вероятностью 68%: </td>
                    <td style="padding:0;text-align:right"><b style="font-size:13px;color:#212121;font-family:Open Sans">${forecast[this.points[0].point.index][1].toFixed(2)} - ${forecast[this.points[0].point.index][2].toFixed(2)}</b></td></tr>
                    </table>
                `
            } else {
                str += `
                    </table>
                `
            }
            
            return str
        }
//
        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                let name =  this.points[0].key;
                let name_style = "font-size:12px;color:#757575;font-family:Open Sans";
                let item_style = 'font-size:12px;font-family:Open Sans;padding:10';
                let value_style = 'padding:0; text-align:right;font-weight:bold; font-size:12px;color:#212121;font-family:Open Sans';
            //   заголовок тултипа
                let str = `<span style="${name_style}">${name[1]}кв. ${name[0]}, ${name[2]}:</span><table>`;
                this.points.forEach((el, ind) => {
                let item = `<tr><td style="color:${this.points[ind].series.color}; ${item_style}">${this.points[ind].series.name}: </td>`;
                let value = this.points[ind].point.high ? 
                    `<td style = "${value_style}">${this.points[ind].point.low.toFixed(1)} - ${this.points[ind].point.high.toFixed(1)}</td></tr>`
                     :  
                    `<td style = "${value_style}">${this.points[ind].y.toFixed(1)}</td></tr>`;
                str += item + value ;
        });
            //  console.log ('test this', this);
             return str + '</table>';
            },
        },

// через атрибут title 

$(`#widget-${wDup.general.renderTo} .highcharts-series-4 span span`)
    .attr("title", "С вероятностью 68% прогнозные значения попадут в указанный диапазон (диапазон соответствует отклонению от среднего значения в размере +/- одно стандартное отклонение)");
    
