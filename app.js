const userRouter = require('./routes/user')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jsonParser = require('jsonparser')
const cors = require('cors')

const app = express()
  // app.use(cors())
  // app.use(logger('dev'))
app.use(express.json())
  // app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
  //设置跨域请求
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(202);
  } else {
    next();
  }
});

// app.use(cors({
//   origin: ['http://localhost:8080'],
//   methods: ['GET', 'POST'],
//   alloweHeaders: ['Conten-Type', 'Authorization']
// }));

app.use('/user', userRouter)
app.get('/ii', (req, res) => {
  res.send('sasass')
})

app.get('/user', )
app.listen(3000, () => {
  console.log('runing at localhost:3000');
})