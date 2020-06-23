const dom_temp = document.getElementById("chart_temp").getContext("2d");
// const dom_air_pressure = document
//   .getElementById("chart_air_pressure")
//   .getContext("2d");
const dom_humidity = document.getElementById("chart_humidity").getContext("2d");

let chart_temp = new Chart(dom_temp, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: [],
    // labels: ['11:22:33', '11:22:34', '11:22:35', '11:22:36', '11:22:37', '11:22:38', '11:22:39'],
    datasets: [
      {
        label: "Temperature ( C )",
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: []
        // data: [24.3, 25, 25.1, 25.2, 24.8, 24.9, 24.7]
      }
    ]
  },

  // Configuration options go here
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            min: -100,
            max: 80,
            stepSize: 20
          }
        }
      ]
    }
  }
});

// let chart_air = new Chart(dom_air_pressure, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: [],
//         // labels: ['11:22:33', '11:22:34', '11:22:35', '11:22:36', '11:22:37', '11:22:38', '11:22:39'],
//         datasets: [{
//             label: 'Air Pressure ( hPa )',
//             fill: false,
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: []
//             // data: [1000, 998, 997, 1002, 1001, 995, 1000]
//         }]
//     },

//     // Configuration options go here
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     min: 1,
//                     max: 1200
//                 }
//             }]
//         }
//     }
// })

let chart_humidity = new Chart(dom_humidity, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: [],
    // labels: ['11:22:33', '11:22:34', '11:22:35', '11:22:36', '11:22:37', '11:22:38', '11:22:39'],
    datasets: [
      {
        label: "Humidity ( % )",
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: []
        // data: [45, 43, 40, 48, 49, 46, 44],
      }
    ]
  },

  // Configuration options go here
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 100
          }
        }
      ]
    }
  }
});
