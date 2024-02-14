// https://jsfiddle.net/BlackLabel/nLqgdtw2/

let chart = Highcharts.chart('container', {
  series: [{
    data: [2, 5, 1, 6, 7, 8, 5]
  }],
});

document.getElementById("button").addEventListener("click", function() {
  let data = [];
  for (let i = 0; i < 6; i++) {
    data.push(Math.ceil(Math.random() * 10));
  }
  chart.addSeries({
    data: data
  })
})
