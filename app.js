const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("node:https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", (req, res) => {
  const city = req.body.cityName;
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbe7d4cf002908df2b1cf82e3d4a947e&units=metric`;
  http.get(url, (response) => {
    response.on("data", (data) => {
      if (response.statusCode === 200) {
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        var temp = weatherData.main.temp;
        var description = weatherData.weather[0].description;
        var icon = weatherData.weather[0].icon;
        var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<h1>It is currently " + temp + "&#8451 in" + city + "</h1>");
        res.write("<h2>The weather is " + description + "</h2>");
        res.write("<img src=" + imgURL + ">");
        res.send();
      } else {
        res.sendFile(__dirname + "/public/failure.html");
      }
    });
  });
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.port || 3000, () => {
  console.log("Listening on port 3000");
});
