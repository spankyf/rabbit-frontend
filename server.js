const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 4000;

app.locals.moment = require("moment");

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("pages/sleep", { todayLogged: false, goal: { avg: 7.5 } });
});
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
