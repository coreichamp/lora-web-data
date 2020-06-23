var textedJson = JSON.stringify(
  {
    aaaa: [1, 2, 3],
    b: 123213321312,
    c123: {
      1: 3,
      "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    },
    c1232: {
      1: 3,
      "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    },
    c123122: {
      1: 3,
      "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    }
    // c1231221: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c1231222: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c1231223: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c1231224: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c1231225: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c1231226: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c1231227: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c1231228: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c1231229: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c12312210: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // },
    // c12312211: {
    //   1: 3,
    //   "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
    // }
  },
  undefined,
  4
);
const aa = () => {
  // $("#json-data").html(textedJson);
  //   $("#json-data").html(PR.prettyPrintOne({ test: 123 }));
  //   $("#json-data").html(library.json.prettyPrint({ account: 1231 }));
  $("#json-data").html(
    library.json.prettyPrint({
      aaaa: [1, 2, 3],
      b: 123213321312,
      c123: {
        1: 3,
        "4123412fff": "femdsahgdkfsfuykfgsdhjfgbsdamwio"
      }
    })
  );
};
