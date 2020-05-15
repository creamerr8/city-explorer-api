'use strict'

// // const pg = require('pg');
// const superagent = require('superagent');
// // const express = require('express');
// // const cors = require('cors');

// // const app = express();
// // app.use(cors());

// // const client = new pg.Client(process.env.DATABASE_URL);
// const searchQuery = requst.body.search_query

// function getMovies (req, res){
//   const url = 'https://api.themoviedb.org/3/search/movie'
//   const queryParams = {
//     api_key: process.env.MOVIES_API_KEY, 
//     query: searchQuery
//   }

//   superagent.get(url)
//     .then(moviesResult => {
//       // console.log(moviesResult)
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