'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());



app.get('/data/location', (req, res) => {
  const dataFromlocation = require('./data/location.json');

  Response.send({
    'search_query': 'lynnwood',
    'formatted_querr': 'Snohomish County, Washington, USA',
    'lattitude': '47.802219',
    'longitude': '-122.34211'

  });
});