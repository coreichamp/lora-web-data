// const server_api = "http://127.0.0.1:3000";

$(document).ready(function() {
  var table;

  $("#train").on("mousedown", "td .fa.fa-minus-square", function(e) {
    var $row = $(this)
      .closest("tr")
      .off("mousedown");
    var $tds = $row
      .find("td")
      // .not(":first")
      .not(":last");

    table
      .row($(this).closest("tr"))
      .remove()
      .draw();

    let data = [];
    $.each($tds, function(i, el) {
      data.push(el.innerHTML);
    });

    // console.log($tds);
    console.log(data);
    console.log("delete");

    axios.delete(server_api + "/trains/" + data[0], {
      id: data[0],
      cardID: data[1]
    });
  });

  $("#train").on("mousedown.edit", "i.fa.fa-pencil-square", function(e) {
    $(this)
      .removeClass()
      .addClass("fa fa-envelope-o");
    var $row = $(this)
      .closest("tr")
      .off("mousedown");
    var $tds = $row
      .find("td")
      // .not(":first")
      .not(":last");

    $.each($tds, function(i, el) {
      var txt = $(this).text();
      $(this)
        .html("")
        .append("<input type='text' value=\"" + txt + '">');
    });
  });

  $("#train").on("mousedown", "input", function(e) {
    e.stopPropagation();
  });

  $("#train").on("mousedown.save", "i.fa.fa-envelope-o", function(e) {
    $(this)
      .removeClass()
      .addClass("fa fa-pencil-square");
    var $row = $(this).closest("tr");
    var $tds = $row
      .find("td")
      // .not(":first")
      .not(":last");

    let data = [];
    $.each($tds, function(i, el) {
      var txt = $(this)
        .find("input")
        .val();
      $(this).html(txt);
      // console.log(i);
      // console.log(el);
      if (i === 0) {
        data.push(el.innerHTML);
      } else {
        data.push(txt);
      }
    });
    console.log("saved");

    console.log($tds);
    console.log(data);

    if (data[0] === "") {
      data[0] = null;
    }
    // console.log(data[0]);
    axios.put(server_api + "/trains", {
      id: data[0],
      cardID: data[1]
    });
  });

  $("#train").on("mousedown", "#selectbasic", function(e) {
    e.stopPropagation();
  });

  // var url = "http://www.json-generator.com/api/json/get/ccTtqmPbkO?indent=2";
  var url = server_api + "/trains/list";
  table = $("#train").DataTable({
    ajax: url,
    rowReorder: {
      dataSrc: "id",
      selector: "tr"
    },
    columns: [
      {
        data: "id"
      },
      {
        data: "cardID"
      },
      {
        data: "delete"
      }
    ]
  });

  $("#train").css("border-bottom", "none");
  $(
    '<div class="addRow"><button id="trainaddRow">Add New Train</button></div>'
  ).insertAfter("#train");

  // add row
  $("#trainaddRow").click(function() {
    //t.row.add( [1,2,3] ).draw();
    var rowHtml = $("#trainnewRow").find("tr")[0].outerHTML;
    console.log(rowHtml);
    table.row.add($(rowHtml)).draw();
  });
});
