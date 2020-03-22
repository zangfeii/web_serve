const Course = require('../models/courses')

const courseChapters = require('../models/courseChapters')
const courseStu = require('../models/courseStu')
const courseTopics = require('../models/courseTopics')

module.exports.createCourse = (req, res, next) => {
  const courseCreate = new Course({
    cteacher: req.body.teacherName,
    cteacheriid: req.body.teacheriid,
    ctitle: req.body.classTitle,
    cdesc: req.body.classDesc,
    cincode: req.body.cincode
  })
  courseCreate.save((err, result) => {
    if (err) {
      return res.send({
        status: 202,
        msg: err || '创建课程失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '创建课程成功',
        result
      })
    }
  })
}


module.exports.deleteCoursesById = (req, res) => {
  const teacheriid = req.body.teacheriid
  const courseiid = req.body.courseiid
  Course.remove({ _id: courseiid, cteacheriid: teacheriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '删除失败'
      })
    } else {
      courseChapters.remove({ cc_courseiid: courseiid, cc_teacheriid: teacheriid }, (err1, result1) => {
        courseStu.remove({ cs_courseiid: courseiid, cs_teacheriid: teacheriid }, (err1, result1) => {
          courseTopics.remove({ tp_courseiid: courseiid, tp_courseTeacheriid: teacheriid }, (err1, result1) => {
            res.send({
              status: 200,
              msg: '删除课程成功'
            })
          })
        })
      })
    }
  })
}

//修改课程封面
module.exports.updateCourseCoverImg = (req, res) => {
  const courseiid = req.body.courseiid
  const teacheriid = req.body.teacheriid
  const coverImg = req.body.coverImg
  Course.update({ _id: courseiid, cteacheriid: teacheriid }, { $set: { cpic: coverImg } }, (err, result) => {
    if (err) {
      res.send({
        status: 200,
        msg: '修改课程封面失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '修改封面成功'
      })
    }
  })
}