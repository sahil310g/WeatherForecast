const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "bc7622bcaf6aa0b61becdf256f61ea60"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const img = weatherData.weather[0].icon;
      const img_url = "http://openweathermap.org/img/wn/" + img + "@2x.png"
      res.write("<p>The weather in "+ query+ " is " + description + "<\p>");
      res.write("<h1>The temperature is " + temp + " degree Celcius<\h1>");
      res.write("<img src=" + img_url + ">")
      res.send();
    })
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("App is running at port 3000.");
})
