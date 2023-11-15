w.xAxis.labels.formatter = function(){
    console.log('test', this.value);
    if (this.value.includes('усто')) return 'Не определено из 1С';
    return this.value
}



