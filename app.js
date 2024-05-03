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
  // let url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=5ChYAeDhhMUMoVudNjFxL5euJ8RjS8Ew&q=${city}`;
  // http.get(url, (response) => {
  //     response.on("data", (data) => {
  //       if (response.statusCode === 200) {
  //         const key = JSON.parse(data)[0].Key;
  //         console.log(key);
  //       }
  //     });
  //   });
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbe7d4cf002908df2b1cf82e3d4a947e&units=metric`;
  http.get(url, (response) => {
    response.on("data", (data) => {
      if (response.statusCode === 200) {
        const weatherData = JSON.parse(data);
        res.render("responce", {
          temp: Math.trunc(weatherData.main.temp),
          feelsLike: weatherData.main.feels_like,
          tempMin: weatherData.main.temp_min,
          tempMax: weatherData.main.temp_max,
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          wind: weatherData.wind.speed,
          description: weatherData.weather[0].description, 
          imgURL: "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png", 
          city: weatherData.name, 
          country: weatherData.sys.country,
        });
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

app.listen(process.env.PORT || 3000 , () => {
  console.log("Listening on port 3000");
});

//5ChYAeDhhMUMoVudNjFxL5euJ8RjS8Ew
//0.Key
