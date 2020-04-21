const ChapterContent = require('../models/chapterContent')


module.exports.createChapterContent = (req, res) => {
  const courseiid = req.body.courseiid
  const chapteriid = req.body.chapteriid
  const content = req.body.content

  const saveChapterContent = new ChapterContent({
    courseiid: courseiid,
    chapteriid: chapteriid,
    content: content
  })

  saveChapterContent.save((err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '标题内容编写失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '标题内容编写成功'
      })
    }
  })
}

module.exports.getCurentChapterContent = (req, res) => {
  const courseiid = req.body.courseiid
  const chapteriid = req.body.chapteriid
  ChapterContent.findOne({ courseiid: courseiid, chapteriid: chapteriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询当前章节内容失败'
      })
    } else {
      if (!result) {
        res.send({
          status: 207,
          msg: '查询当前章节内容成功',
          data: ''
        })
      } else {
        res.send({
          status: 200,
          msg: '查询当前章节内容成功',
          data: result.content
        })
      }
    }
  })
}

module.exports.updateChapterContent = (req, res) => {
  const courseiid = req.body.courseiid
  const chapteriid = req.body.chapteriid
    // const chapter_id = req.body.chapter_id
  const upContent = req.body.updateContent
  ChapterContent.update({ courseiid: courseiid, chapteriid: chapteriid }, { $set: { content: upContent } }, (err, result) => {
    if (err) {
      // console.log(err);
      return res.send({
        status: 204,
        msg: '修改失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '修改成功'
      })
    }
  })
}