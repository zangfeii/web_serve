const userRouter = require('./routes/user')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jsonParser = require('jsonparser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const secret = require('./secret')

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

// token请求验证
app.use((req, res, next) => {
  if (req.url !== '/user/register' && req.url !== '/user/login') {
    // const token = req.headers.token || req.query.token || req.body.token
    const token = req.headers.Authorization
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res.send({
            status: 205,
            msg: '没有找到token'
          })
        } else {
          req.decoded = decoded
          console.log("token验证成功");
          next()
        }
      })
    } else {
      res.send({
        status: 206,
        msg: '没有找到token'
      })
    }
  } else {
    next()
  }
})



app.use('/user', userRouter)

app.get('/ii', (req, res) => {
  res.send("wqwqwqwq")
})
app.listen(3000, () => {
  console.log('runing at localhost:3000');
})