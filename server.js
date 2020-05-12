'use strict'

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());



app.get('/location', getLocation) 

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
    .then(resultLocationIQ => {
    const newLocation = new Location(resultLocationIQ.body, reqCityQuery);
console.log(newLocation);
    res.send(newLocation);
  });

  // const dataFromlocation = req('./data/location.json');
  // const formattedLocation = new Location(dataFromlocation);
  // res.send(dataFromlocation);

};


function Location(locationJsonFile, reqCityQuery){
  this.search_query = reqCityQuery; // TODO: better search query
  this.formatted_query = locationJsonFile[0].display_name;
  this.lattitude = locationJsonFile[0].lat;
  this.longitude = locationJsonFile[0].lon;
}


app.get('/', (req, res) =>{
  res.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/')
})


app.get('/weather', handleWeather)

function handleWeather(req, res){
  const results = [];
  const json = require('./data/weather.json')
  const weatherData = json.data;
  for(let i = 0; i < weatherData.length; i++){
  results.push(new Weather(weatherData[i]));
}

  res.send(results);
}

function Weather(weatherJsonFile){
  this.forecast = weatherJsonFile.weather.description;
  this.time = new Date(Date.parse(weatherJsonFile.datetime)).toDateString();
}









app.listen(PORT, () =>{
  console.log(`listening on ${PORT}` )
});