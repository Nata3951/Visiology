// Annotations demo
// https://95.216.65.215/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/annotations/label-presentation/?__cpo=aHR0cHM6Ly9qc2ZpZGRsZS5uZXQ

Highcharts.chart('container', {

    title: {
        text: 'Highcharts Annotations'
    },

    subtitle: {
        text: 'Annotation label presentation options'
    },

    series: [{
        keys: ['y', 'id'],
        data: [[29.9, '0'], [71.5, '1'], [106.4, '2'], [129.2, '3'], [144.0, '4'], [176.0, '5']]
    }],

    tooltip: {
        enabled: false
    },

    annotations: [{
        labels: [{
            point: '0',
            shadow: true
        }, {
            point: '1',
            shadow: {
                color: 'red',
                offsetX: -1,
                opacity: 0.3
            }
        }, {
            point: '2',
            padding: 10
        }, {
            point: '3',
            style: {
                fontSize: '8px'
            }
        }, {
            point: '4',
            borderWidth: 3
        }, {
            point: '5'
        }],
        labelOptions: {
            borderRadius: 5,
            backgroundColor: 'rgba(252, 255, 197, 0.7)',
            borderWidth: 1,
            borderColor: '#AAA'
        }
    }]
});



// chatGPT

// Define your chart options
const options = {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Example Line Chart'
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  },
  yAxis: {
    title: {
      text: 'Number of Sales'
    }
  },
  series: [{
    name: 'Sales',
    data: [10, 5, 15, 8, 12, 7, 20]
  }],
  // Use Highcharts' chart events to modify the labels' background color after the chart is rendered
  chartEvents: {
    render: function() {
      const labels = this.xAxis[0].labelGroup.element.children;
      for (let i = 0; i < labels.length; i++) {
        labels[i].style.backgroundColor = 'red';
      }
    }
  }
};

// Render the chart using the options
Highcharts.chart('container', options);
