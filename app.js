const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const cityName = req.body.cityName;
  const apiKey = process.env.WEATHER_API;
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
  const units = "metric";

  const url = `${baseUrl}q=${cityName}&appid=${apiKey}&units=${units}`;
  console.log(url);
  https.get(url, function(response){
    response.on('data', function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
      console.log(iconUrl);
      res.write("<p>THe weather is currently " + description + "</p>");
      res.write(`<h1>The temperature in ${cityName} is ${temp} degrees Celcius.</h1>`);
      res.write(`<img src="${iconUrl}" />`)
      res.send()
    })
  });

})




app.listen(3000, () => {
  console.log("SERVER - 3000");
})
