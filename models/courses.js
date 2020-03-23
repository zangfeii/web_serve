const mongoose = require('./connectDB')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  cteacher: {
    type: String,
  },
  cteacheriid: {
    type: String
  },
  cpic: {
    type: String,
    default: 'http://127.0.0.1:3000/public/img/course/20200302165404_14295.jpg'
  },
  ctitle: {
    type: String,
  },
  cdesc: {
    type: String,
  },
  cstatus: {
    type: Boolean,
    default: true
  },
  cincode: {
    type: String
  }
}, { collection: 'courses' })

module.exports = mongoose.model('courses', CourseSchema)