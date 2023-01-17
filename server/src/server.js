import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import database from './config_mongo/database'
import apis from './routes/router'
const cors = require('cors')
const app = express()

// Allow cors and allow origin access
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  //Auth Each API Request created by user.
  next();
});

// Use body-parser and cookie parser for use post data
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// import API for use
apis(app);


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

const port = process.env.PORT || 8000 // set our port

// Run server on given port
const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port
  // eslint-disable-next-line no-console
  console.log('😀 🙌 app listening at http://%s:%s 🙌 😀', host, port)
})