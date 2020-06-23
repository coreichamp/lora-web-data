// const server_api = "http://127.0.0.1:3000";
const server_api = "http://161.246.38.104:8300";

$(document).ready(function() {
  var table;

  $("#employee").on("mousedown", "td .fa.fa-minus-square", function(e) {
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

    axios.delete(server_api + "/employee/" + data[0], {
      id: data[0],
      firstName: data[1],
      lastName: data[2],
      cardID: data[3]
    });
  });

  $("#employee").on("mousedown.edit", "i.fa.fa-pencil-square", function(e) {
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

  $("#employee").on("mousedown", "input", function(e) {
    e.stopPropagation();
  });

  $("#employee").on("mousedown.save", "i.fa.fa-envelope-o", function(e) {
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

    // console.log($tds);
    // console.log(data);
    if (data[0] === "") {
      data[0] = null;
    }
    // console.log(data[0]);
    axios.put(server_api + "/employee", {
      id: data[0],
      firstName: data[1],
      lastName: data[2],
      cardID: data[3]
    });
  });

  $("#employee").on("mousedown", "#selectbasic", function(e) {
    e.stopPropagation();
  });

  // var url = "http://www.json-generator.com/api/json/get/ccTtqmPbkO?indent=2";
  var url = server_api + "/employee/list";
  table = $("#employee").DataTable({
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
        data: "firstName"
      },
      {
        data: "lastName"
      },
      {
        data: "cardID"
      },
      {
        data: "delete"
      }
    ]
  });

  $("#employee").css("border-bottom", "none");
  $(
    '<div class="addRow"><button id="employeeaddRow">Add New Employee</button></div>'
  ).insertAfter("#employee");

  // add row
  $("#employeeaddRow").click(function() {
    //t.row.add( [1,2,3] ).draw();
    var rowHtml = $("#employeenewRow").find("tr")[0].outerHTML;
    console.log(rowHtml);
    table.row.add($(rowHtml)).draw();
  });
});
