const Note = require('../models/notes')
const sd = require('silly-datetime')

module.exports.createNewNote = (req, res) => {
  const useriid = req.body.useriid
  const noteContent = req.body.noteContent
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  const saveNote = new Note({
    nt_userid: useriid,
    nt_createtime: time,
    nt_noteContnet: noteContent
  })

  saveNote.save((err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '创建笔记失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '创建笔记成功'
      })
    }
  })
}

module.exports.getCurrentUserNote = (req, res) => {
  const useriid = req.body.useriid
  Note.find({ nt_userid: useriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '获取用户创建的笔记失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '获取用户创建的笔记成功',
        result
      })
    }
  })
}

module.exports.updateNote = (req, res) => {
  const useriid = req.body.useriid
  const noteid = req.body.noteid
  const updateData = req.body.updateData
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  Note.update({ nt_userid: useriid, _id: noteid }, { $set: { nt_noteContnet: updateData, nt_createtime: time } }, (err, result) => {
    if (err) {
      console.log(err);
      return res.send({
        status: 204,
        msg: '修改笔记失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '修改笔记成功'
      })
    }
  })
}

module.exports.deleteNote = (req, res) => {
  const useriid = req.body.useriid
  const noteiid = req.body.noteiid
  Note.remove({ nt_userid: useriid, _id: noteiid }, (err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '删除笔记失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '删除笔记成功'
      })
    }
  })
}