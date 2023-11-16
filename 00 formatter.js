w.xAxis.labels.formatter = function(){
    console.log('test', this.value);
    if (this.value.includes('усто')) return 'Не определено из 1С';
    return this.value
}


// ## Tooltip formatting

w.tooltip.formatter = function () {
    var s = '<b>' + this.x + '</b>';

    $.each(this.points, function () {
        var symbol = '●';
        if (this.series.name != "area")
        s += '<br/>' + '<span style="color:' + this.series.color + '">' + symbol + '</span>' + ' ' + this.series.name + ': ' + this.y;
    });

    return s;
};


// using formatter

w.plotOptions.series.dataLabels.formatter = function() {
    return this.y + '%';
};

w.plotOptions.series.dataLabels.formatter = function() {
    console.log('test this', this);
    return this.y + '%';
};

// formatter
dataLabels: {

                formatter: function () {
                                if (this.point.value !== 0) {
                                return this.point.value;
                                }
                            return null;
