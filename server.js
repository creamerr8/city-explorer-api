'use strict'

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());


// app.get('/', (req, res) =>{
//   res.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/')
// })

app.get('/location', getLocation) 

app.get('/weather', getWeather)




//---------------------------- functions to get the location and weather ----------------------------

function getWeather(req, res){

  const url = 'https://api.weatherbit.io/v2.0/current';
  const queryParams = {
  key: process.env.WEATHER_API_KEY,
  lat: req.query.lattitude,
  lon: req.query.longitude
  };

  superagent.get(url)
    .query(queryParams)
    .then(resultWeather =>{
    const weatherMap = resultWeather.body.data.map(weatherJsonFile => new Weather);
    res.send(weatherMap);
  })
  .catch(error => res.send(error).status(500));
//   const results = [];
//   const json = require('./data/weather.json')
//   const weatherData = json.data;
//   for(let i = 0; i < weatherData.length; i++){
//   results.push(new Weather(weatherData[i]));
// }

  // res.send(results);
}




function getLocation (req, res){

  const reqCityQuery = req.query.city;
  const url = 'https://us1.locationiq.com/v1/search.php';

  const queryParams = {
  q: reqCityQuery,
  key: process.env.GEOCODE_API_KEY,
  format: 'json'
  };

  superagent.get(url)
    .query(queryParams)
    .then(resultLocation => {
    const newLocation = new Location(resultLocation.body, reqCityQuery);
    res.send(newLocation);
    console.log(newLocation);
  });
};

// -----------------------Objects----------------------------------

function Location(locationJsonFile, reqCityQuery){
  this.search_query = reqCityQuery; // TODO: better search query
  this.formatted_query = locationJsonFile[0].display_name;
  this.latitude = locationJsonFile[0].lat;
  this.longitude = locationJsonFile[0].lon;
}


function Weather(weatherJsonFile){
  this.forecast = weatherJsonFile.weather.description;
  this.time = new Date(Date.parse(weatherJsonFile.datetime)).toDateString();
}









app.listen(PORT, () =>{
  console.log(`listening on ${PORT}` )
});