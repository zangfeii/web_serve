const mongoose = require('./connectDB')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  m_courseiid: {
    type: String
  },
  m_geteriid: {
    type: String
  },
  m_snederiid: {
    type: String
  },
  m_sendtime: {
    type: String
  },
  m_icon: {
    type: String,
    default: 'http://127.0.0.1:3000/public/img/message.jpg'
  },
  m_message: {
    type: Array
  }
}, { collection: 'message' })

module.exports = mongoose.model('message', MessageSchema)