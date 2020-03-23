const mongoose = require('./connectDB')
const Schema = mongoose.Schema

const CourseStudentSchema = new Schema({
  // cs_title: {
  //   type: String,
  // },
  cs_courseiid: {
    type: String
  },
  cs_teacheriid: {
    type: String
  },
  // cs_teachername: {
  //   type: String
  // },
  // cs_desc: {
  //   type: String
  // },
  cs_status: {
    type: Number,
    default: 1
  },
  cs_stuiid: {
    type: String
  },
  // cs_stuname: {
  //   type: String
  // }
}, { collection: 'courseStu' })

module.exports = mongoose.model('courseStu', CourseStudentSchema)