const Course = require('../models/courses')

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