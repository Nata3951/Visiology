colors 
red #FFEF3272
purple #FF8F58FF
green #FF52BCA6

##gradient purple-green

series[1].color = {
    "linearGradient": {
        "x1": 0,
        "y1": 1,
        "x2": 0,
        "y2": 0
    },
    "stops": [
        [
            0,
            "rgba(143,88,255,1)"
        ],
        [
            1,
            "rgba(239,50,114,1)"
        ]
    ]
}


gradientPurpleRed = {
    "linearGradient": {
        "x1": 0,
        "y1": 1,
        "x2": 0,
        "y2": 0
    },
    "stops": [
        [
            0,
            "rgba(143,88,255,1)"
        ],
        [
            1,
            "rgba(239,50,114,1)"
        ]
    ]
};


.. 
  // Determine the color of Series 1 based on Series 2 values
  for (var i = 0; i < data[0].data.length; i++) {
    if (data[0].data[i] < data[1].data[i]) {
      data[0].color = 'red';
    } else {
      data[0].color = 'green';
    }
  }
  
  series[0].data
  
  w.series[factIndex].data[0].color = gradientPurpleRed;
