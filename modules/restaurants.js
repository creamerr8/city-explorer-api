'use strict'


// const pg = require('pg');
const superagent = require('superagent');
require('dotenv').config();

// const client = new pg.Client(process.env.DATABASE_URL);



function getRestaurnats(req, res){
console.log('rest');
  const url = 'https://api.yelp.com/v3/businesses/search'
  const queryParams = {

    location: req.query.location,
    latitude: req.query.latitude,
    longitude: req.query.longitude
  }

  superagent.get(url)
    .set('user-key', process.env.YELP_API_KEY)
    .query(queryParams)
    .then(restResult => {
      console.log(restResult);
      const restMap = restResult.body.businesses.map(restaurantFile => new Restaurant
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