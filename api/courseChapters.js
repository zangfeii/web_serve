const courseChapters = require('../models/courseChapters')


//课程创建新的单元
module.exports.createChpatr = (req, res, next) => {
  const courseChapter = new courseChapters({
    cc_courseiid: req.body.currentcourseiid,
    cc_coursename: req.body.currentcoursename,
    cc_teacheriid: req.body.currentteacheriid,
    cc_teachername: req.body.currentteachername,
    cc_chapters: req.body.data,
    cc_ids: req.body.ids
  })

  courseChapter.save((err, succ) => {
    if (err) {
      res.send({
        status: 202,
        msg: '添加单元失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '添加单元成功'
      })
    }
  })
}


//删除单元信息
module.exports.deleteeChapters = (req, res, next) => {
  const courseiid = req.body.currentcourseiid
  const teacheriid = req.body.currentteacheriid
  courseChapters.remove({ cc_courseiid: courseiid, cc_courseiid: teacheriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '删除失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '删除成功'
      })
    }
  })
}

//插入新的章节
module.exports.insertNewChapter = (req, res, next) => {
  const courseid = req.body.currentcourseiid
  const teciid = req.body.currentteacheriid
  const newChapter = req.body.inputChapter
  console.log('1111' + newChapter.label);
  courseChapters.findOneAndUpdate({ cc_courseiid: courseid, cc_teacheriid: teciid }, { $push: { cc_chapters: newChapter } }, (err, succ) => {
    if (err) {
      res.send({
        status: 202,
        msg: '添加新的单元失败',
      })
    } else {
      res.send({
        status: 200,
        msg: '添加新的单元成功'
      })
    }
  })
}

//查询课程的章节信息
module.exports.queryCourseChapters = (req, res, next) => {
  const courseid = req.body.currentcourseiid
  const teacherid = req.body.currentteacheriid
  courseChapters.find({ cc_courseiid: courseid, cc_teacheriid: teacherid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询当前课程章节失败'
      })
    } else {
      // const courseTitle = {
      //   children: result[0].cc_chapters
      // }
      console.log(result)
      let sendData = []
      if (!result.length) {
        rsendData = []
      } else {
        sendData = result[result.length - 1]
      }
      res.send({
        status: 200,
        msg: '查询当前课程章节成功',
        data: sendData,
        // courseTitle
      })
    }
  })
}