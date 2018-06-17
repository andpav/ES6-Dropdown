const express = require('express')
const cors = require('cors')
const utils = require('./utils')
const data = require('./data')

const app = express()
const port = 3000

app.use(cors())

app.get('/', (request, response) => {
  response.send('It\'s alive!')
});

app.get('/data', (request, response) => {
  const text = request.query.text ? request.query.text : null;

  if (!text || typeof text !== 'string') {
    response.send('Invalid text!')
  }

  response.send(utils.findMatch(data, text));
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});
