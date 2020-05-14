'use strict'

// const pg = require('pg');
// const superagent = require('superagent');

// const client = new pg.Client(process.env.DATABASE_URL);


// function getMovies (req, res){
//   const url = 'https://api.themoviedb.org/3/movie/550'
//   const queryParams = {
//     key: process.env.MOVIES_API_KEY, 

//   }

//   superagent.get(url)
//     .then(moviesResult => {
//       const movieMap = moviesResult.body
//     })
// }


// function Movie(moviesFile){
//   this.title = moviesFile.title;
//   this.overveiw = moviesFile.overveiw;
//   this.average_votes = moviesFile.average_votes;
//   this.image_url = moviesFile.image_url;
//   this.popularity = moviesFile.popularity;
//   this.released_on = moviesFile.released_on;
// }