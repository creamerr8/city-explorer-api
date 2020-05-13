'use strict'

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

const client = new pg.Client(process.env.DATABASE_URL);
// app.get('/', (req, res) =>{
//   res.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/')
// })

app.get('/location', getLocation); 

app.get('/weather', getWeather);

app.get('/trails', getTrails);






//---------------------------- functions to get the location and weather ----------------------------
function getLocation (req, res){

  const reqCityQuery = req.query.city;
  const url = 'https://us1.locationiq.com/v1/search.php';

  const queryParams = {
  q: reqCityQuery,
  key: process.env.GEOCODE_API_KEY,
  format: 'json'
  };


  const sqlQuery = 'SELECT * FROM location WHERE search_query=$1';
  const sqlVal = [reqCityQuery];
  client.query(sqlQuery, sqlVal)
    .then(resultSql => {


      if(resultSql.rowCount > 0){
        res.send(resultSql.rows[0]);
      }else{
        superagent.get(url)
          .query(queryParams)
          .then(resultLocation => {
            const newLocation = new Location(resultLocation.body, reqCityQuery);
            const sqlQuery = 'INSERT INTO locations (latitude, search_query, longitude, formatted_query) VALUES ($1, $2, $3, $4)';
            const valueArray = [newLocation.latitude, newLocation.search_query, newLocation.longitude, newLocation.formatted_query];
            client.query(sqlQuery, valueArray);
            res.send(newLocation)
          })
      }
    })
  };

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





function getTrails (req, res){
  const url = 'https://www.hikingproject.com/data/get-trails'
  const queryParams = {
  key: process.env.TRAILS_API_KEY,
  lat: req.query.latitude,
  lon: req.query.longitude
  }

  superagent.get(url)
    .query(queryParams)
    .then(trailResult => {
      const trailMap = trailResult.body.trails.map(trailsFile => new Trail(trailsFile));
      res.send(trailMap);
      // console.log(trailMap);
  })
  .catch(error => {
  res.send(error).status(500);
  console.log(error)
  });
}


// function getSql(req, res){
//   const sqlQuery = 'SELECT * FROM location'
//   client.query(sqlQuery)
//     .then(resultSql => {
//       res.send(resultSql.rows);
//     })
//     .catch(console.error);
//   }
// -----------------------Constuctors----------------------------------

function Location(locationJsonFile, reqCityQuery){
  this.search_query = reqCityQuery; // TODO: better search query
  this.formatted_query = locationJsonFile[0].display_name;
  this.latitude = locationJsonFile[0].lat;
  this.longitude = locationJsonFile[0].lon;
}


function Weather(weatherJsonFile){
  this.forecast = weatherJsonFile.weather.description;
  this.time = new Date(weatherJsonFile.ts * 1000).toDateString();
}

function Trail(trailsFile){
  console.log(trailsFile);
  this.name = trailsFile.name;
  this.location = trailsFile.location;
  this.length = trailsFile.length;
  this.stars = trailsFile.stars;
  this.star_votes = trailsFile.starVotes;
  this.summary = trailsFile.summary;
  this.trail_url = trailsFile.url;
  this.conditions = trailsFile.conditionStatus;
  this.condition_date = trailsFile.conditionDate.split(' ')[0];
  this.condition_time = trailsFile.conditionDate.split(' ')[1];

}








app.listen(PORT, () =>{
  console.log(`listening on ${PORT}` )
});