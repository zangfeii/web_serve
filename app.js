const userRouter = require('./routes/user')
const courseRouter = require('./routes/course')
const createCourseRouter = require('./routes/createCourse')
const courseStuRouter = require('./routes/courseStu')
const courseChaptersRouter = require('./routes/courseChapters')
const courseTopicRouter = require('./routes/courseTopic')
const upload = require('./routes/uploadPic')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jsonParser = require('jsonparser')
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')
const secret = require('./secret')
const contact = require('./connect')

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

// // token请求验证
// app.use((req, res, next) => {
//   const picUrl = ''
//   if (req.url !== '/api/user/register' && req.url !== '/api/user/login' && req.url !== '/api/contact' && req.url !== '/api/img/upload' && req.url !== '/public') {
//     // const token = req.headers.token || req.query.token || req.body.token 
//     const token = req.headers.authorization
//     if (token) {
//       jwt.verify(token, secret, (err, decoded) => {
//         if (err) {
//           res.send({
//             status: 205,
//             msg: 'token验证失败'
//           })
//         } else {
//           console.log("token验证成功");
//           next()
//         }
//       })
//     } else {
//       res.send({
//         status: 206,
//         msg: '没有找到token'
//       })
//     }
//   } else {
//     next()
//   }
// })


//用户路由
app.use('/api/user', userRouter)
app.use('/api/upload', upload)

//课程路由
//添加删除课程
app.use('/api/course', createCourseRouter)
  //查询课程
app.use('/api/queryCourse', courseRouter)
  //用户进入课程

app.use('/api/courseStu', courseStuRouter)

//课程章节
app.use('/api/chapters', courseChaptersRouter)

//课程话题
app.use('/api/Topic', courseTopicRouter)

//其他路由
app.get('/api/contact', (req, res) => {
  res.send(contact)
})
app.use('/public', express.static('public'))


app.listen(3000, () => {
  console.log('runing at localhost:3000');
})