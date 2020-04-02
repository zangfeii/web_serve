const courseStu = require('../models/courseStu')
const Notice = require('../models/notice')
const getNewStuGiveHaveNoticeTopices = require('../Dao/notice')

// 添加课程和学生信息
module.exports.enterCourse = (req, res, next) => {
  const courseiid = req.body.cs_courseiid
  const newStuiid = req.body.cs_stuiid
  const courseEnter = new courseStu({
    // cs_title: req.body.cs_title,
    cs_courseiid: req.body.cs_courseiid,
    cs_teacheriid: req.body.cs_teacheriid,
    // cs_teachername: req.body.cs_teachername,
    // cs_desc: req.body.cs_desc,
    cs_stuiid: req.body.cs_stuiid,
    // cs_stuname: req.body.cs_stuname
  })

  courseEnter.save((err, succ) => {
    if (err) {
      res.send({
        status: 202,
        msg: '添加课程失败'
      })
    } else {
      getNewStuGiveHaveNoticeTopices(courseiid, newStuiid)
      res.send({
        status: 200,
        msg: '添加课程成功 且获取到该课程的通知'
      })
    }
  })
}

//用户进入任意一门课程前的查询
module.exports.quertyCourseStuBeforeEnterById = (req, res, next) => {
  const queryCourseUserId = req.body.useIid
  const queryCourseId = req.body.courseId
    // courseStu.find({ cs_teacheriid: queryCourseUserId, cs_courseiid: queryCourseId }, (err, result) => {
    //   console.log('1:' + typeof result);
    //   console.log('1:' + result);
    //   if (result) {
    //     res.send({
    //       status: 209,
    //       msg: '该课程是该用户创建的,不能参加自己的课程'
    //     })
    //   } else {
  courseStu.find({ cs_stuiid: queryCourseUserId, cs_courseiid: queryCourseId }, (err, result) => {
      if (!result.length) {
        res.send({
          status: 200,
          msg: '用户未进入该课程'
        })
      } else {
        //查到该用户已经进入该课程
        res.send({
          status: 210,
          msg: '该用户已经进入该课程了'
        })

      }
    })
    // }
    // })
}


//用户进入的的课程id查询
module.exports.queryUserEnterCuesesID = (req, res, next) => {
  const userId = req.body.enterCoursesUserId
  courseStu.find({ cs_stuiid: userId }, (err, result) => {
    if (result) {
      res.send({
        status: 200,
        msg: '查询成功',
        result
      })
    } else {
      res.send({
        status: 207,
        msg: '该用户还未添加课程'
      })
    }
  })
}


module.exports.queryCurrentCourseStus = (req, res, next) => {
  const couseiid = req.body.courseiid
  const teacheriid = req.body.teacheriid
  courseStu.find({ cs_courseiid: couseiid, cs_teacheriid: teacheriid }, (err, resul) => {
    if (err) {
      res.send({
        status: 202,
        msg: '查询当前课程学生名单失败'
      })
    } else {
      var stuids = []
      for (let index = 0; index < resul.length; index++) {
        stuids.push(resul[index].cs_stuiid)
      }
      res.send({
        status: 200,
        msg: '查询当前课程学生名单成功',
        result: stuids
      })
    }
  })
}

module.exports.singOutCouseById = (req, res) => {
  const courseStuiid = req.body.courseStuiid
  const stuiid = req.body.stuiid
  courseStu.remove({ cs_stuiid: stuiid, cs_courseiid: courseStuiid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '退出课程失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '退出课程成功'
      })
    }
  })
}