const Course = require('../models/courses')
  // 根据用户ID查询开的课程
module.exports.queryCoursesById = (req, res, next) => {
    // const queryIid = req.body.queryUserIid
    const queryIid = req.body.userIid
    Course.find({ cteacheriid: queryIid }, (err, result) => {
      if (err) {
        res.send({
          status: 207,
          msg: '没有创建的课程'
        })
      } else {
        res.send({
          status: 200,
          msg: '查询创建课程成功',
          courses: result
        })

      }
    })
  }
  //根据邀请码查询课程
module.exports.queryCoursesByInviteCode = (req, res, next) => {
  const invitedIid = req.body.invitedCode
  Course.find({ cincode: invitedIid }, (err, result) => {
    if (err) {
      res.send({
        status: 207,
        msg: '没有该的课程'
      })
    } else {
      res.send({
        status: 200,
        msg: '查询课程成功',
        courses: result
      })
    }
  })
}

//查询用户添加学习的课程
module.exports.queryUserEnterCoursesByIds = (req, res, next) => {
  const queryParams = req.body.sendParams
  Course.find({ _id: { $in: queryParams } }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询失败'
      })
    } else {
      res.send({
        status: 200,
        data: result
      })
    }
  })
}