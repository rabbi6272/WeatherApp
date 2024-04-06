const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("node:https");
const ejs = require('ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {
  const city = req.body.cityName;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbe7d4cf002908df2b1cf82e3d4a947e&units=metric`;
  http.get(url, (response) => {
    response.on("data", (data) => {
      if (response.statusCode === 200) {
        const weatherData = JSON.parse(data);
        var temp = weatherData.main.temp;
        var description = weatherData.weather[0].description;
        var icon = weatherData.weather[0].icon;
        var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.render("responce", {temp: temp, city: city, description: description, imgURL: imgURL});
      } else {
        res.render("failure");
      }
    });
  });
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});
app.post("/again", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.port || 3000, () => {
  console.log("Listening on port 3000");
});
