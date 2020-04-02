const mongoose = require('./connectDB')
const Schema = mongoose.Schema


const stutyDataSchema = new Schema({
  courseiid: {
    type: String
  },
  teciid: {
    type: String
  },
  upTime: {
    type: String
  },
  datas: {
    type: Array
  },
  Downnums: {
    type: Number,
    default: 0
  }
}, { collection: 'studyData' })

module.exports = mongoose.model('studyData', stutyDataSchema)