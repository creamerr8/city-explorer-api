'use strict'

const pg = require('pg');
const superagent = require('superagent');

const client = new pg.Client(process.env.DATABASE_URL);


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
  })
  .catch(error => {
  res.send(error).status(500);
  console.log(error)
  });
}


function Trail(trailsFile){
  // console.log(trailsFile);
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

module.exports = getTrails;