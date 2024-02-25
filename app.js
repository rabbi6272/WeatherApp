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
        // res.write(
          //   `<h3>Weather in ${city} is ${weatherData.weather[0].description}</h3>`
          // );
          // res.write("<h1>Temperature in " + city + " is " + weatherData.main.temp + "</h1>");
        //   res.write(
        //       `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"/>`
        // );
        res.send(`<h1> Weather in ${city} is ${weatherData.weather[0].description} <br><br>
         Temperature in ${city} is ${weatherData.main.temp} degree celsius <br><br>
         <span><img src="https://openweathermap.org/img/wn/${ weatherData.weather[0].icon }"@2x.png"/></span> </h1>`);
      } else {
        // res.send("<h1>City not found. Please enter a valid city name.</h1>");
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
