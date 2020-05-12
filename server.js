'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());



app.get('/location', (req, res) => {
  const dataFromlocation = req('./data/location.json');
  const formattedLocation = new Location(dataFromlocation);
  res.send(dataFromlocation);
});

function Location(locationJsonFile){
  this.search_query = locationJsonFile[0].display_name; // TODO: better search query
  this.formatted_query = locationJsonFile[0].display_name;
  this.lattitude = locationJsonFile[0].lat;
  this.longitude = locationJsonFile[0].lon;
}


app.get('/', (req, res) =>{
  res.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/')
})


app.get('/weather', handleWather)

function handleWather(req, res){
  const results = [];
  const json = req('./data/weather.json')
  const weatherData = json.data;
  for(let i = 0; i < weatherData.length; i++){
  results.push(new Weather(weatherData[i]));
}

  res.send(results);
}

function Weather(weatherJsonFile){
  this.forcast = weatherJsonFile.weather.description;
  this.time = new Date(Date.parse(weatherJsonFile.datetime)).toDateString();
}









app.listen(PORT, () =>{
  console.log(`listening on ${PORT}` )
});