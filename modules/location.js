'use strict'

const pg = require('pg');
const superagent = require('superagent');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());



require('dotenv').config();
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));
client.connect();



function getLocation (req, res){

  const reqCityQuery = req.query.city;
  const url = 'https://us1.locationiq.com/v1/search.php';

  const queryParams = {
  q: reqCityQuery,
  key: process.env.GEOCODE_API_KEY,
  format: 'json'
  };

console.log('test')
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
            // console.log(resultLocation);
            const newLocation = new Location(resultLocation.body, reqCityQuery);
            const sqlQuery = 'INSERT INTO location (latitude, search_query, longitude, formatted_query) VALUES ($1, $2, $3, $4)';
            const valueArray = [newLocation.latitude, newLocation.search_query, newLocation.longitude, newLocation.formatted_query];
            client.query(sqlQuery, valueArray);
            res.send(newLocation)
          })
      }
    })
  };


function Location(locationJsonFile, reqCityQuery){
  this.search_query = reqCityQuery; // TODO: better search query
  this.formatted_query = locationJsonFile[0].display_name;
  this.latitude = locationJsonFile[0].lat;
  this.longitude = locationJsonFile[0].lon;
}

module.exports = getLocation;