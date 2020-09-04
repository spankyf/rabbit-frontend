const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const data = [
  {
    modelName: "Sleep",
    targetColumn: "duration",
    number: 7.5,
    goalMetric: "sleepDuration",
    operator: ">=",
    format: "time",
    frequency: "day",
    today: false,
    href: "/sleep",
    dbQuery: { goalResult: 7.716757955138238 },
  },
  {
    modelName: "Exercise",
    targetColumn: "exercise",
    number: 15.0,
    goalMetric: "avg",
    operator: ">=",
    format: "time",
    frequency: "day",
    today: false,
    href: "/exercise",
    dbQuery: { goalResult: "11.1737089201877934" },
  },
  {
    modelName: "Exercise",
    targetColumn: "stretching",
    number: 0.9,
    goalMetric: "avg",
    operator: ">=",
    format: "percentage",
    frequency: "day",
    today: false,
    href: "/exercise",
    dbQuery: { goalResult: "0.95266272189349112426" },
  },
  {
    modelName: "Drink",
    targetColumn: "n_drinks",
    number: 0.3,
    goalMetric: "avg",
    operator: "<=",
    format: "units",
    frequency: "day",
    today: false,
    href: "/drink",
    dbQuery: { goalResult: 0.4671361502347418 },
  },
];

var operators = {
  "<=": function (a, b) {
    return a <= b;
  },
  ">=": function (a, b) {
    return a >= b;
  },
};

function convertNumToTime(number) {
  // Separate the int from the decimal part
  var hour = Math.floor(number);
  var decpart = number - hour;

  var min = 1 / 60;
  // Round to nearest minute
  decpart = min * Math.round(decpart / min);

  var minute = Math.floor(decpart * 60) + "";

  // Add padding if need
  if (minute.length < 2) {
    minute = "0" + minute;
  }

  // Concate hours and minutes
  time = hour + ":" + minute;

  return time;
}
data.forEach((el) => {
  el.passing = operators[el.operator](el.dbQuery.goalResult, el.number);

  if (el.format == "time") {
    el.number = convertNumToTime(el.number);
    el.current = convertNumToTime(el.dbQuery.goalResult);
  } else if (el.format == "percentage") {
    el.number = (el.number * 100).toFixed(2) + "%";
    el.current = (el.dbQuery.goalResult * 100).toFixed(2) + "%";
  } else {
    el.current = (el.dbQuery.goalResult * 100).toFixed(2);
  }
});

const port = process.env.PORT || 4000;

app.locals.moment = require("moment");

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("pages/overview", { todayLogged: false, data });
});
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
