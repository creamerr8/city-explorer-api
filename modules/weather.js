'use strict'

const pg = require('pg');
const superagent = require('superagent');

const client = new pg.Client(process.env.DATABASE_URL);


function getWeather(req, res){

  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
  key: process.env.WEATHER_API_KEY,
  lat: req.query.latitude,
  lon: req.query.longitude
  };

  superagent.get(url)
    .query(queryParams)
    .then(resultWeather =>{
    const weatherMap = resultWeather.body.data.map(weatherJsonFile => new Weather(weatherJsonFile));
    res.send(weatherMap);
  })
  .catch(error => {
  res.send(error).status(500);
  console.log(error)
  });

}


function Weather(weatherJsonFile){
  this.forecast = weatherJsonFile.weather.description;
  this.time = new Date(weatherJsonFile.ts * 1000).toDateString();
}

module.exports = getWeather;