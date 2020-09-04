const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const data = [
  {
    modelName: "Sleep",
    targetColumn: "duration",
    number: "7:30",
    goalMetric: "sleepDuration",
    operator: ">=",
    format: "hours",
    frequency: "day",
    today: false,
    href: "/sleep",
    dbQuery: { goalResult: 7.716757955138238 },
  },
  {
    modelName: "Exercise",
    targetColumn: "exercise",
    number: "15:00",
    goalMetric: "avg",
    operator: ">=",
    format: "minutes",
    frequency: "day",
    today: false,
    href: "/exercise",
    dbQuery: { goalResult: "11.1737089201877934" },
  },
  {
    modelName: "Exercise",
    targetColumn: "stretching",
    number: "90%",
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
    number: "0.3",
    goalMetric: "avg",
    operator: "<=",
    format: "units",
    frequency: "day",
    today: false,
    href: "/drink",
    dbQuery: { goalResult: 0.4671361502347418 },
  },
];

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
