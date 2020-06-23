//settings BEGIN
// const MQTTbroker = "161.246.38.104";
// const MQTTport = 1884;
// const MQTTsubTopic = "lora"; //works with wildcard # and + topics dynamically now
// const MQTTsubTopic = "gateway/nanomac/1/data";
//settings END

// user config server
let MQTTbroker = "";
let MQTTport = "";
let MQTTsubTopic = "";

let chart = []; // global variuable for chart
var dataTopics = new Array();

let rawData = {};
let showData = [];

const showModal = () => {
  $("#addwidget-name").val("");
  $("#addwidget-data").val($("#addwidget-data option:eq(0)").val());
  $("#addwidget-type").val("text");
  $(".ui.modal.apply-modal").modal("show");
};

const closeModal = () => {
  $(".ui.modal.apply-modal").modal("hide");
};

const setDropdownOption = (jsondata) => {
  const lastSelect = $("#addwidget-data option:selected").val();
  $("#addwidget-data").html("");
  Object.keys(jsondata).forEach((data) => {
    let newOption;
    if (data === lastSelect) {
      newOption = new Option(data, data, false, true);
    } else {
      newOption = new Option(data, data, false, false);
    }
    $("#addwidget-data").append(newOption).trigger("change");
  });
};

const okWidget = () => {
  showData.push({
    name: $("#addwidget-data").val(),
    type: $("#addwidget-type").val(),
  });
  console.log("add to id " + (showData.length - 1).toString());
  // $("#widget-display").append('<div class="widget-display" id="wdisplay-123"></div>')
  $("#widget-display").append(
    '<div class="widget-display" id="wdisplay-' +
      (showData.length - 1).toString() +
      '"></div>'
  );
  showWidget(
    $("#addwidget-name").val(),
    $("#addwidget-data").val(),
    $("#addwidget-type").val(),
    "wdisplay-" + (showData.length - 1).toString()
  );
  closeModal();
};

const showWidget = (name, datakey, type, componentId) => {
  if (type === "graph") {
    chart.push(
      new Highcharts.Chart({
        chart: {
          renderTo: componentId,
          defaultSeriesType: "spline",
        },
        title: {
          text: name,
        },
        // subtitle: {
        //   text:
        //     "broker: " +
        //     MQTTbroker +
        //     " | port: " +
        //     MQTTport +
        //     " | topic : " +
        //     MQTTsubTopic
        // },
        xAxis: {
          type: "datetime",
          tickPixelInterval: 150,
          maxZoom: 20 * 1000,
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          // title: {
          //   text: "Value",
          //   margin: 80
          // }
        },
        series: [],
      })
    );
  } else if (type === "text") {
    chart.push({});
    $("#" + componentId).css("background-color", "white");
    $("#" + componentId).css("padding", "0.5rem 0.5rem 0.5rem 1.5rem");
    // $("#" + componentId).css("background-color", "white");
    $("#" + componentId).html(
      `<div class="highcharts-title" style="text-align: center;font-size: 18px;display: inline-block;">${name}:</div><div style="display: inline-block;width: 1rem;"></div><div style="display: inline-block;" id="${componentId}-data"></div>`
    );
  }
};

//check if a real number
const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//function that is called once the document has loaded
const init = () => {
  //i find i have to set this to false if i have trouble with timezones.
  Highcharts.setOptions({
    global: {
      useUTC: false,
    },
  });

  //mqtt broker
  var client = new Paho.MQTT.Client(
    MQTTbroker,
    MQTTport,
    "lorawan_display_cli_" + parseInt(Math.random() * 100, 10)
  );

  //mqtt connecton options including the mqtt broker subscriptions
  const options = {
    timeout: 3,
    onSuccess: function () {
      console.log("mqtt connected");
      // Connection succeeded; subscribe to our topics
      client.subscribe(MQTTsubTopic, { qos: 1 });
    },
    onFailure: function (message) {
      console.log("Connection failed, ERROR: " + message.errorMessage);
      //window.setTimeout(location.reload(),20000); //wait 20seconds before trying to connect again.
    },
  };

  //can be used to reconnect on connection lost
  const onConnectionLost = (responseObject) => {
    console.log("connection lost: " + responseObject.errorMessage);
    //window.setTimeout(location.reload(),20000); //wait 20seconds before trying to connect again.
  };

  //what is done when a message arrives from the broker
  const onMessageArrived = (message) => {
    // console.log(message.payloadString);
    try {
      rawData = JSON.parse(message.payloadString);
      // rawData = JSON.parse(rawData.objectJSON).data;
      rawData = rawData.object.data;
    } catch {
      console.log("parse JSON error");
      return null;
    }
    if (rawData !== {}) {
      // console.log("twat");
      $("#modal-action-ok").removeClass("disabled");
    }
    setDropdownOption(rawData);
    // const textedJson = JSON.stringify(rawData, undefined, 4);
    const textedJson = PR.prettyPrintOne(JSON.stringify(rawData, null, 4));
    $("#json-data").html(textedJson);
    // console.log(rawData);
    // console.log(message.destinationName, "", message.payloadString);

    showData.forEach((showkey, i) => {
      // console.log(showkey, i);
      if (Object.keys(rawData).includes(showkey.name)) {
        if (showkey.type === "graph") {
          // if (dataTopics.indexOf(message.destinationName) < 0) {
          // console.log(chart[i]);
          // console.log(chart[i].series);
          // console.log(chart[i].series.length);
          if (chart[i].series.length === 0) {
            //check if it is a new topic, if not add it to the array
            dataTopics.push(message.destinationName); //add new topic to array
            var y = dataTopics.indexOf(message.destinationName); //get the index no

            //create new data series for the chart
            var newseries = {
              id: y,
              name: message.destinationName,
              data: [],
            };

            chart[i].addSeries(newseries); //add the series
          }

          var y = dataTopics.indexOf(message.destinationName); //get the index no of the topic from the array
          // y = rawData[showkey.name];
          // console.log(y);
          var myEpoch = new Date().getTime(); //get current epoch time
          var thenum = message.payloadString.replace(/^\D+/g, ""); //remove any text spaces from the message
          thenum = rawData[showkey.name];
          var plotMqtt = [myEpoch, Number(thenum)]; //create the array
          if (isNumber(thenum)) {
            //check if it is a real number and not text
            console.log("is a propper number, will send to chart.");
            plot(i, plotMqtt, y); //send it to the plot function
          }
        } else if (showkey.type === "text") {
          $(`#wdisplay-${i}-data`).text(rawData[showkey.name]);
        }
      }
    });
  };
  client.onMessageArrived = onMessageArrived;
  client.onConnectionLost = onConnectionLost;

  // Connect to MQTT broker
  client.connect(options);
};

//this adds the plots to the chart
const plot = (chartId, point, chartno) => {
  // console.log(point);

  let series = chart[chartId].series[0];
  let shift = series.data.length > 20; // shift if the series is
  // let shift = true;
  // longer than 20
  // add the point
  chart[chartId].series[chartno].addPoint(point, true, shift);
};
//connect to broker is at the bottom of the init() function !!!!

const getConfigDisplay = async () => {
  const res_getconfigDisplay = await axios.get(HOST + "users/data", {
    headers: {
      authorization: `Bearer: ${localStorage.getItem("token")}`,
    },
  });
  if (res_getconfigDisplay.status === 200) {
    // console.log(res_getconfigDisplay.data.data);
    MQTTbroker = res_getconfigDisplay.data.data.ip;
    MQTTport = res_getconfigDisplay.data.data.port;
    MQTTsubTopic = `application/${res_getconfigDisplay.data.data.appId}/device/${res_getconfigDisplay.data.data.devId}/rx`;
    // console.log(MQTTbroker, MQTTport, MQTTsubTopic);
    init();
  }
};

$(window).on("load", function () {
  getConfigDisplay();
});
