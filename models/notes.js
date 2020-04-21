const mongoose = require('./connectDB')
const Schema = mongoose.Schema


const NoteSchema = new Schema({
  nt_userid: {
    type: String
  },
  nt_createtime: {
    type: String
  },
  nt_noteCoverTitle: {
    type: String
  },
  nt_noteContnet: {
    type: String
  }
}, { collection: 'notes' })

module.exports = mongoose.model('notes', NoteSchema)