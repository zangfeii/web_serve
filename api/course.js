const Course = require('../models/courses')
const Notice = require('../models/notice')
const courseStu = require('../models/courseStu')
const sd = require('silly-datetime')

// 根据用户ID查询开的课程
module.exports.queryCoursesById = (req, res, next) => {
  const queryIid = req.body.userIid
    // const page = req.body.page
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

module.exports.getAllCourses = (req, res) => {
    const page = req.body.page
    Course.find((err1, result1) => {
      if (err1) {
        res.send({
          status: 204,
          status: '查询失败'
        })
      } else {
        Course.aggregate([{ "$skip": (page - 1) * 6 }, { "$limit": 6 }], (err, result) => {
          if (err) {
            res.send({
              status: 204,
              msg: '查询当前平台课程失败'
            })
          } else {
            res.send({
              status: 200,
              msg: '查询当前平台课程成功',
              result,
              total: result1.length
            })
          }
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

//查询当前用户老师的课程信息
module.exports.queryTecCurrentCourseInfo = (req, res) => {
  const teacheriid = req.body.teacheriid
  const courseiid = req.body.courseiid
  Course.findOne({ _id: courseiid, cteacheriid: teacheriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询当前课程信息失败',
      })
    } else {
      res.send({
        status: 200,
        msg: '查询当前课程信息成功',
        result
      })
    }
  })
}



//根据接受的课程id 和用户id 判断 是否有该课程
module.exports.decideIsHaveCourse = (req, res) => {
  // const userid = req.body.useriid
  const courseid = req.body.courseid
    // Course.find({ cteacheriid: userid, _id: courseid }, (err, result) => {
  Course.find({ _id: courseid }, (err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '查询失败'
      })
    } else {
      if (result.length) {
        res.send({
          status: 200,
          msg: '查询成功',
          data: true
        })
      } else {
        return res.send({
          status: 200,
          msg: '查询成功',
          data: false
        })
      }
    }
  })
}

module.exports.prohibteCourse = (req, res) => {
  const coueseid = req.body.courseiid
  const sendid = req.body.sendid
  const tecid = req.body.id
  const courseName = req.body.courseName
  Course.remove({ _id: coueseid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '删除该课程失败'
      })
    } else {
      const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
      const notice = new Notice({
        n_senderiid: sendid,
        n_sendTtle: '警告!',
        n_content: '尊敬的用户您好,您的' + courseName + ',该课程存在问题已经被删除',
        n_getteriid: tecid,
        n_sendtime: time
      })
      notice.save((err1, result1) => {
        if (err1) {
          res.send({
            status: 204,
            msg: '发送警告失败'
          })
        } else {
          courseStu.remove({ cs_courseiid: coueseid }, (err2, result2) => {
            if (err2) {
              res.send({
                status: 204,
                msg: '删除该课程失败'
              })
            } else {
              res.send({
                status: 200,
                msg: '发送警告成功'
              })
            }
          })
        }
      })
    }
  })
}

module.exports.queryCourseByp = (req, res) => {
  const searchp = req.body.searchContent
  const pageNum = req.body.page
  const page = (req.body.page - 1) * 5
  Course.find({ ctitle: { $regex: searchp, $options: 'i' } }, (err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '查询失败'
      })
    } else {
      console.log(searchp);
      if (result.length < 5) {
        return res.send({
          status: 200,
          msg: '查询成功',
          result,
          total: result.length
        })
      } else {
        var searchResult = []
        if (pageNum * 5 > result.length) {
          for (let index = page; index < result.length; index++) {
            searchResult.push(result[index])
          }
        } else {
          for (let index = page; index < pageNum * 5; index++) {
            searchResult.push(result[index])
          }
        }

        return res.send({
          status: 200,
          msg: '查询成功!',
          result: searchResult,
          total: result.length
        })
      }
    }
  })
}