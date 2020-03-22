const mongoose = require('./connectDB')
const Schema = mongoose.Schema

const courseChaptresSchema = new Schema({
  cc_courseiid: {
    type: String
  },
  cc_coursename: {
    type: String
  },
  cc_teacheriid: {
    type: String
  },
  cc_teachername: {
    type: String
  },
  cc_chapters: {
    type: Array,
  },
  cc_ids: {
    type: Number,
  }
}, { collation: 'chapters' })

module.exports = mongoose.model('chapters', courseChaptresSchema)