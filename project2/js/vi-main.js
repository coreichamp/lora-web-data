const axiosScript = document.createElement("script");
axiosScript.setAttribute("src", "js/axios.min.js");
document.head.appendChild(axiosScript);

const topperScript = document.createElement("script");
topperScript.setAttribute("src", "js/topper.js");
document.head.appendChild(topperScript);

const HOST = "http://161.246.38.104:8301/";

console.log(localStorage.getItem("token"));
const login = async () => {
  if ($("#username").val() === "" || $("#password").val() === "") {
    return;
  }
  const res_login = await axios
    .post(HOST + "users/login", {
      username: $("#username").val(),
      password: $("#password").val(),
    })
    .catch((err) => {
      Topper({
        title: "Alert",
        text: "Username or password is incorrect",
        style: "danger",
        type: "top",
        autoclose: true,
        autocloseAfter: 1500,
      });
      $("#password").val("");
      return;
    });

  localStorage.setItem("token", res_login.data.data.token);
  location.replace("display.html");
};

const signup = async () => {
  if ($("#username").val() === "") {
    Topper({
      title: "Alert",
      text: "Please fill username",
      style: "danger",
      type: "top",
      autoclose: true,
      autocloseAfter: 1500,
    });
  } else if ($("#password").val() === "") {
    Topper({
      title: "Alert",
      text: "Please fill password",
      style: "danger",
      type: "top",
      autoclose: true,
      autocloseAfter: 1500,
    });
  } else if ($("#re-password").val() === "") {
    Topper({
      title: "Alert",
      text: "Please fill re-password",
      style: "danger",
      type: "top",
      autoclose: true,
      autocloseAfter: 1500,
    });
  } else if ($("#re-password").val() !== $("#password").val()) {
    Topper({
      title: "Alert",
      text: "Password and Re-password not match",
      style: "danger",
      type: "top",
      autoclose: true,
      autocloseAfter: 1500,
    });
  } else {
    const res_signup = await axios
      .post(HOST + "users/signup", {
        username: $("#username").val(),
        password: $("#password").val(),
      })
      .catch((err) => {
        Topper({
          title: "Alert",
          text: "Username is exist",
          style: "danger",
          type: "top",
          autoclose: true,
          autocloseAfter: 1500,
        });
        $("#username").val("");
        $("#password").val("");
        $("#re-password").val("");
      });
    // console.log(res_signup.status); // 201
    if (res_signup.status === 201) {
      location.replace("index.html");
    }
  }
};

const setNewPassword = async () => {
  if ($("#newPassword").val() !== $("#re-newPassword").val()) {
    Topper({
      title: "Alert",
      text: "New password and re-new password is not match",
      style: "warning",
      type: "top",
      autoclose: true,
      autocloseAfter: 1500,
    });
    $("#oldPassword").val("");
    $("#newPassword").val("");
    $("#re-newPassword").val("");
  } else {
    const res_password = await axios
      .put(
        HOST + "users",
        {
          oldPassword: $("#oldPassword").val(),
          newPassword: $("#newPassword").val(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => {
        Topper({
          title: "Alert",
          text: "Old password is incorrect",
          style: "danger",
          type: "top",
          autoclose: true,
          autocloseAfter: 1500,
        });
      });
    if (res_password.status === 200) {
      Topper({
        title: "Alert",
        text: "Change password success",
        style: "success",
        type: "top",
        autoclose: true,
        autocloseAfter: 1500,
      });
    }
  }
};

const setConfig = async () => {
  const res_setconfig = await axios
    .put(
      HOST + "users/data",
      {
        ip: $("#ip").val(),
        port: Number($("#port").val()),
        appId: $("#appId").val(),
        devId: $("#devId").val(),
      },
      {
        headers: {
          authorization: `Bearer: ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => {
      Topper({
        title: "Alert",
        text: "Something is wrong",
        style: "danger",
        type: "top",
        autoclose: true,
        autocloseAfter: 1500,
      });
    });
  if (res_setconfig.status === 200) {
    Topper({
      title: "Alert",
      text: "Change config success",
      style: "success",
      type: "top",
      autoclose: true,
      autocloseAfter: 1500,
    });
  }
};

const getConfig = async () => {
  const res_getconfig = await axios.get(HOST + "users/data", {
    headers: {
      authorization: `Bearer: ${localStorage.getItem("token")}`,
    },
  });
  if (res_getconfig.status === 200) {
    // console.log(res_getconfig.data.data);
    $("#ip").val(res_getconfig.data.data.ip);
    $("#port").val(res_getconfig.data.data.port);
    $("#appId").val(res_getconfig.data.data.appId);
    $("#devId").val(res_getconfig.data.data.devId);
  }
};

const logout = async () => {
  localStorage.setItem("token", null);
};
