const mongoose = require('./connectDB')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String
  },
  pwd: {
    type: String,
    //密码加密
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  },
  headPic: {
    type: String,
    default: 'http://127.0.0.1:3000/public/img/user/20200227215047_15915.jpg'
  },
  mobile: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  role: {
    // 默认1代表用户初角色未学生,2代表升级为老师,但还保留学生角色的功能
    type: Number,
    default: 1
  }

}, { collection: 'users' })

module.exports = mongoose.model('users', UserSchema)