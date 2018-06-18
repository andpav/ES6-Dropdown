const express = require('express')
const cors = require('cors')
const utils = require('./utils')
const data = require('./data')
const path = require('path');

const app = express()
const port = 8082

// так как фронт отдается с вебпак дев сервера, нужно разрещить кросс-доменные запросы
app.use(cors())

// TODO: нужно бы разнести все по каталогам

app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', (request, response) => {
  response.send('It\'s alive!')
});

app.get('/data', (request, response) => {
  const text = request.query.text ? request.query.text : null;

  if (typeof text !== 'string') {
    response.send([]);

    // TODO: не помешает нормальная обработка разных входных данных

    return;
  }

  response.send(utils.findMatch(data, text));
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});
