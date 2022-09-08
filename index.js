const express = require('express')
const createApp = require('./app.js')
const cors = require('cors')
const {quotesService, imageService} = require('./services/services.js')

const port = process.env.PORT || 3000

const app = createApp(quotesService, imageService);
// allow cors 
app.use(cors());

app.listen(port, () => {
  if(port === 3000){
    console.log('App running at: http://localhost:3000');
  }
})