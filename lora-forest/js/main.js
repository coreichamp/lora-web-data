const motion_val = 300;

const login = () => {
  //   console.log($("#username").val());
  //   console.log($("#password").val());
  if ($("#username").val() === "admin" && $("#password").val() === "admin") {
    window.location.replace("overview.html");
  } else {
    alert("Username หรือ password ผิดพลาด");
  }
};

const onConnect = () => {
  console.log("onConnect");
  client.subscribe("data/node/+");
  //   message = new Paho.MQTT.Message("Hello MQTT"); //สำหรับ publish
  //   message.destinationName = "TEST/MQTT"; //สำหรับ publish
  //   client.send(message); //สำหรับ publish
};

const onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
};

const onMessageArrivedOver = (message) => {
  console.log(
    "onMessageArrived:" + message.destinationName + message.payloadString
  );
  //   {"humidity":43.16,"celsTemp":32.78385,"pir":1,"ultra":409.5,"vibration":537,"distance":30,"strength":82}
  let data;
  try {
    data = JSON.parse(message.payloadString)
  } catch(err) {
    console.log("err")
    return
  }
  const nodeId = Number(message.destinationName.split("/")[2]);

  //   console.log(data);

  // temp
  document.querySelector(
    "body > section > div > div:nth-child(" +
      (nodeId + 1) +
      ") > div.card-content > nav > div:nth-child(1) > div > p.title"
  ).innerHTML = data.celsTemp.toFixed(2) + "C";

  // hum
  document.querySelector(
    "body > section > div > div:nth-child(" +
      (nodeId + 1) +
      ") > div.card-content > nav > div:nth-child(2) > div > p.title"
  ).innerHTML = data.humidity.toFixed(0) + "%";

  // lidar
  document.querySelector(
    "body > section > div > div:nth-child(" +
      (nodeId + 1) +
      ") > div.card-content > nav > div:nth-child(3) > div > p.title"
  ).innerHTML = (data.distance / 100).toFixed(2) + "m";

  // ultra
  document.querySelector(
    "body > section > div > div:nth-child(" +
      (nodeId + 1) +
      ") > div.card-content > nav > div:nth-child(4) > div > p.title"
  ).innerHTML = (data.ultra / 100).toFixed(2) + "m";

  // motion
  if (data.vibration > motion_val) {
    document.querySelector(
      "body > section > div > div:nth-child(" +
        (nodeId + 1) +
        ") > div.card-content > nav > div:nth-child(5) > div > p.title"
    ).innerHTML = "ON";
  } else {
    document.querySelector(
      "body > section > div > div:nth-child(" +
        (nodeId + 1) +
        ") > div.card-content > nav > div:nth-child(5) > div > p.title"
    ).innerHTML = "OFF";
  }

  // pir
  if (data.pir === 1) {
    document.querySelector(
      "body > section > div > div:nth-child(" +
        (nodeId + 1) +
        ") > div.card-content > nav > div:nth-child(6) > div > p.title"
    ).innerHTML = "ON";
  } else {
    document.querySelector(
      "body > section > div > div:nth-child(" +
        (nodeId + 1) +
        ") > div.card-content > nav > div:nth-child(6) > div > p.title"
    ).innerHTML = "OFF";
  }
};

const onMessageArrivedSingle = (message) => {
  console.log(
    "onMessageArrived:" + message.destinationName + message.payloadString
  );
  //   {"humidity":43.16,"celsTemp":32.78385,"pir":1,"ultra":409.5,"vibration":537,"distance":30,"strength":82}
  const data = JSON.parse(message.payloadString);
  const nodeId = Number(message.destinationName.split("/")[2]);
  if (nodeId !== Number(window.location.search.substr(6))) {
    return;
  }

  //   console.log(data);

  // temp
  document.querySelector(
    "body > section > div > div.card > div > nav > div:nth-child(1) > div > p.title"
  ).innerHTML = data.celsTemp.toFixed(2) + "C";

  // hum
  document.querySelector(
    "body > section > div > div.card > div > nav > div:nth-child(2) > div > p.title"
  ).innerHTML = data.humidity.toFixed(0) + "%";

  // lidar
  document.querySelector(
    "body > section > div > div.card > div > nav > div:nth-child(3) > div > p.title"
  ).innerHTML = (data.distance / 100).toFixed(2) + "m";

  // ultra
  document.querySelector(
    "body > section > div > div.card > div > nav > div:nth-child(4) > div > p.title"
  ).innerHTML = (data.ultra / 100).toFixed(2) + "m";

  // motion
  if (data.vibration > motion_val) {
    document.querySelector(
      "body > section > div > div.card > div > nav > div:nth-child(5) > div > p.title"
    ).innerHTML = "ON";
  } else {
    document.querySelector(
      "body > section > div > div.card > div > nav > div:nth-child(5) > div > p.title"
    ).innerHTML = "OFF";
  }

  // pir
  if (data.pir === 1) {
    document.querySelector(
      "body > section > div > div.card > div > nav > div:nth-child(6) > div > p.title"
    ).innerHTML = "ON";
  } else {
    document.querySelector(
      "body > section > div > div.card > div > nav > div:nth-child(6) > div > p.title"
    ).innerHTML = "OFF";
  }
};

client = new Paho.MQTT.Client(
  "161.246.38.104",
  Number(1884),
  "clientId324789237490823web"
);
client.onConnectionLost = onConnectionLost;

const over = () => {
  for (let i = 0; i < 10; i++) {
    document.querySelector(
      "body > section > div"
    ).innerHTML += `<div class="card node-card">
        <div
          class="card-header"
          onclick="window.location.replace('node-single.html?node=${i + 1}')"
        >
          <div class="card-header-title">Node ${i + 1}</div>
        </div>
        <div class="card-content">
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Temperature</p>
                <p class="title">0C</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Moisture</p>
                <p class="title">0%</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Lidar</p>
                <p class="title">0m</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Ultrasonic</p>
                <p class="title">0m</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Vibration</p>
                <p class="title">OFF</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">PIR</p>
                <p class="title">OFF</p>
              </div>
            </div>
          </nav>
        </div>
      </div>`;
  }
  client.onMessageArrived = onMessageArrivedOver;
  client.connect({ onSuccess: onConnect });
};

const sing = () => {
  document.querySelector("body > section > div > h1").innerText =
    "Node " + window.location.search.substr(6);
  client.onMessageArrived = onMessageArrivedSingle;
  client.connect({ onSuccess: onConnect });
};

const capimg = () => {
  message = new Paho.MQTT.Message("take");
  message.destinationName = "node/" + window.location.search.substr(6);
  client.send(message);

  setTimeout(() => {
    document.querySelector(
      "body > section > div > div.camera-preview > figure > img"
    ).src =
      "http://161.246.38.104:8500/node/images/" +
      window.location.search.substr(6) +
      ".jpeg?time=" +
      new Date().getTime();
  }, 5000);
};
