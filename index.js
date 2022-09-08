const express = require('express')
const createApp = require('./app.js')
const {quotesService, imageService} = require('./services/services.js')

const port = process.env.PORT || 3000

const app = createApp(quotesService, imageService);

// allow cors 
app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  next();
}) 

app.listen(port, () => {
  if(port === 3000){
    console.log('App running at: http://localhost:3000');
  }
})