const mongoose = require('./connectDB')
const Schema = mongoose.Schema

const courseTopicSchema = new Schema({
  tp_courseiid: {
    type: String
  },
  tp_courseTeacheriid: {
    type: String
  },
  tp_topicCreateriid: {
    type: String
  },
  tp_topicCreateName: {
    type: String
  },
  tp_topicCreaterPic: {
    type: String
  },
  tp_createTime: {
    type: String
  },
  tp_courseTopic: {
    type: Object
  },
  tp_isTop: {
    type: Boolean,
    default: false
  }
}, { collection: 'courseTopics' })

module.exports = mongoose.model('courseTopics', courseTopicSchema)