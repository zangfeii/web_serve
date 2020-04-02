const mongoose = require('./connectDB')
const Schema = mongoose.Schema

const NoticeSchema = new Schema({
  n_senderiid: {
    type: String,
  },
  n_sendTtle: {
    type: String,
  },
  n_getteriid: {
    type: String
  },
  n_sendtime: {
    type: String
  },
  n_pic: {
    type: String,
    default: 'http://127.0.0.1:3000/public/img/20200324150813_14344.jpg'
  },
  n_content: {
    type: String
  },
  n_isreaded: {
    type: Boolean,
    default: false
  },
  n_istecsend: {
    type: String,
  },
  n_tecsendnoticeiid: {
    type: String
  }
}, { collection: 'notice' })

module.exports = mongoose.model('notice', NoticeSchema)