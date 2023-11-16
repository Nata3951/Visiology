To make the chart scrollable, you can use the maxHeight property in chart options. Highcharts will then add a scrollbar if the height of the chart exceeds the maxHeight.

Here is an example:

<!DOCTYPE html>
<html>
<head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
</head>
<body>
<div id="container" style="width:100%; height:400px;"></div>

<script>
    Highcharts.chart('container', {
        chart: {
            type: 'bar',
            height: '100%',
            scrollablePlotArea: {
                minHeight: 800
            }
        },
        title: {
            text: 'Scrollable Bar Chart'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges', 'Pears', 'Grapes', 'Plums', 'Peaches', 'Pineapples', 'Strawberries', 'Raspberries']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'John',
            data: [5, 7, 3, 2, 1, 4, 6, 5, 9, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 1, 3, 4, 6, 5, 8, 7, 6]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5, 7, 8, 6, 9, 3]
        }]
    });
</script>

</body>
</html>


In this example, if the chart's height exceeds 800px, a scrollbar will appear. You can adjust the minHeight value according to your needs.
