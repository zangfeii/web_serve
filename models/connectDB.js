const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/onlineStuduy'

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log('数据库链接失败');
  } else {
    console.log('数据库链接成功');
  }
})

module.exports = mongoose