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
  mobile: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, { collection: 'users' })

module.exports = mongoose.model('users', UserSchema)