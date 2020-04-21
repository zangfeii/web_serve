const mongoose = require('./connectDB')
const Schema = mongoose.Schema

const chapterContent = new Schema({
  courseiid: {
    type: String
  },
  chapteriid: {
    type: String
  },
  content: {
    type: String
  }
}, { collection: 'chapterContnet' })

module.exports = mongoose.model('chapterContnet', chapterContent)