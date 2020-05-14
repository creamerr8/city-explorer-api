'use strict'


const pg = require('pg');
const superagent = require('superagent');

const client = new pg.Client(process.env.DATABASE_URL);



function getRestaurnats(req, res){
  const url = 'https://api.yelp.com/v3/businesses/search'
  const queryParams = {
    location: req.query.location,
    lat: req.query.latitude,
    lon: req.query.longitude
  }

  superagent.get(url)
    .query(queryParams)
    .then(restResult => {
      const restMap = restResult.businesses.map(restaurantFile => new Restaurant
      (restaurantFile));
      res.send(restMap);
  })
  .catch(error => {
  res.send(error).status(500);
  console.log(error)
  });
}


function Restaurant(restaurantFile){
  this.name = restaurantFile.name;
  this.image_url = restaurantFile.image_url;
  this.price = restaurantFile.price;
  this.rating = restaurantFile.rating;
  this.url = restaurantFile.url;
}


module.exports = getRestaurnats;