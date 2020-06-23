const client = mqtt.connect("mqtt://161.246.38.104:1884");

client.subscribe("device/1/data");

client.on("message", function(topic, payload) {
  const data = JSON.parse(payload);
  console.log(data);
  update_data_humidity(data.humidity);
  // update_data_air(data.hPa + Number(document.getElementById('calibrate_air').value))
  update_data_temp(data.celsTemp);
  // update_gps(data.gps)
});

// let real_dataset_air = [];

// document.getElementById("calibrate_air").addEventListener("change", () => {
//   let temp = [];
//   real_dataset_air.forEach(element => {
//     temp.push(element + Number(document.getElementById("calibrate_air").value));
//   });
//   chart_air.data.datasets[0].data = temp;
//   chart_air.update();
// });

// const update_data_air = data => {
//   if (chart_air.data.datasets[0].data.length > 10) {
//     chart_air.data.datasets[0].data.shift();
//     chart_air.data.datasets[0].data.push(data);
//     chart_air.data.labels.shift();
//     chart_air.data.labels.push(getTime());
//   } else {
//     chart_air.data.datasets[0].data.push(data);
//     chart_air.data.labels.push(getTime());
//   }
//   real_dataset_air = chart_air.data.datasets[0].data;
//   chart_air.update();
// };

const update_data_temp = data => {
  if (chart_temp.data.datasets[0].data.length > 10) {
    chart_temp.data.datasets[0].data.shift();
    chart_temp.data.datasets[0].data.push(data);
    chart_temp.data.labels.shift();
    chart_temp.data.labels.push(getTime());
  } else {
    chart_temp.data.datasets[0].data.push(data);
    chart_temp.data.labels.push(getTime());
  }
  chart_temp.update();
};

const update_data_humidity = data => {
  if (chart_humidity.data.datasets[0].data.length > 10) {
    chart_humidity.data.datasets[0].data.shift();
    chart_humidity.data.datasets[0].data.push(data);
    chart_humidity.data.labels.shift();
    chart_humidity.data.labels.push(getTime());
  } else {
    chart_humidity.data.datasets[0].data.push(data);
    chart_humidity.data.labels.push(getTime());
  }
  chart_humidity.update();
};

// const update_gps = data => {
//   const gps_data = parse(data);
//   $("#gps_text").text(
//     `GPS: ${gps_data.loc.dmm.latitude} ${gps_data.loc.dmm.longitude}`
//   );
// };

const checkTime = i => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

const getTime = () => {
  const today = new Date();
  const h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  return `${h}:${m}:${s}`;
};
