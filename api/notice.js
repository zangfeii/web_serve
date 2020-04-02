const Notice = require('../models/notice')
const Course = require('../models/courses')
const courseStu = require('../models/courseStu')
const sd = require('silly-datetime')

//创建通知
module.exports.queryGetNotice = (req, res) => {
  const useriid = req.body.useriid
  Notice.find({ n_getteriid: useriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询通知失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '查询通知成功',
        notices: result
      })
    }
  })
}


//点击老师邀请添加学生的通知 设置通知为已读
module.exports.setNoticeRead = (req, res) => {
  const noticeiid = req.body.noticeiid
  setNoticeisreaded(noticeiid)
  Notice.findOne({ _id: noticeiid }, (err1, result1) => {
    if (err1) {
      return res.send({
        status: 204,
        msg: '读取错误'
      })
    } else {
      if (result1 && result1.n_senderiid) {
        const courseiid = result1.n_senderiid
        Course.findOne({ _id: courseiid }, (err2, result2) => {
          if (err2) {
            return res({
              status: 204,
              msg: '查询失败'
            })
          } else {
            return res.send({
              status: 200,
              msg: '查询设置成功',
              data: result2.ctitle
            })
          }
        })
      } else {
        return res.send({
          status: 206,
          msg: '该通知已经被老师删除了'
        })
      }
    }
  })
}

function setNoticeisreaded(noticeiid) {
  Notice.update({ _id: noticeiid }, { $set: { n_isreaded: true } }, (err3, result3) => {})
}


//老师创建通知给课程中的每一个学生
module.exports.setNoticeToStu = (req, res) => {
  const courseiid = req.body.curseiid
  const noticeTitle = req.body.noticeTitle
  const noticeConent = req.body.noticeConent
  courseStu.find({ cs_courseiid: courseiid }, (err1, result1) => {
    if (err1) {
      return res.send({
        status: 204,
        smg: '创建通知失败'
      })
    } else {
      if (!result1.length) {
        return res.send({
          status: 207,
          msg: '该课程没有学生, 暂时不能发送通知'
        })
      } else {
        var stuiids = []
        result1.forEach(element => {
          stuiids.push(element.cs_stuiid)
        })
        const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
        const createNoticess = new Notice({
          n_senderiid: courseiid,
          n_sendTtle: noticeTitle,
          n_content: noticeConent,
          n_istecsend: courseiid,
          n_isreaded: true,
          n_sendtime: time,
        })
        var currentNoticeiid = ''
        createNoticess.save((err3, reult3) => {
          if (err3) {
            return res.send({
              status: 204,
              msg: '创建话题失败'
            })
          }
          currentNoticeiid = reult3._id
          for (let index = 0; index < stuiids.length; index++) {
            const createNotices = new Notice({
              n_senderiid: courseiid,
              n_getteriid: stuiids[index],
              n_tecsendnoticeiid: currentNoticeiid,
              n_sendTtle: noticeTitle,
              n_content: noticeConent,
              n_sendtime: time
            })
            createNotices.save((err4, reult4) => {})
          }
        })
      }
      res.send({
        status: 200,
        msg: '创建通知成功'
      })
    }
  })
}

//获取当前课程的通知
module.exports.getCurrentCreateNotices = (req, res) => {
  const courseiid = req.body.courseiid
  Notice.find({ n_istecsend: courseiid }, (err, result) => {
    if (err) {
      res.send({
        status: 200,
        msg: '暂无创建的通知',
        data: []
      })
    } else {
      res.send({
        status: 200,
        msg: '查询当前课程话题成功',
        data: result
      })
    }
  })
}

//老师删除已经发出的通知
module.exports.deleteSendedNotices = (req, res) => {
  const snedNoticeiid = req.body.noticeiid
  Notice.remove({ _id: snedNoticeiid }, (err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '删除通知失败'
      })
    } else {
      Notice.remove({ n_tecsendnoticeiid: snedNoticeiid }, (err1, result1) => {
        if (err1) {
          res.send({
            status: 205,
            msg: '未完全删除该通知, 未删除已经发送到学生的通知 或所有学生已经自己删除该通知'
          })
        } else {
          res.send({
            status: 200,
            msg: '已完全删除该通知'
          })
        }
      })
    }
  })
}

// 课程中的学生删除获得的课程通知
module.exports.deleteStuGetOneNotice = (req, res) => {
  const noticeiid = req.body.noticeiid
  Notice.remove({ _id: noticeiid }, (err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '删除失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '删除通知成功'
      })
    }
  })
}

//学生获取当前课程老师创建的通知
module.exports.stuGetCurrentCourseNotices = (req, res) => {
  const sendiid = req.body.sendiid
  const getiid = req.body.getiid
  Notice.find({ n_senderiid: sendiid, n_getteriid: getiid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '获取当前课程接收到的通知'
      })
    } else {
      res.send({
        status: 200,
        msg: '获取当前课程收到的通知成功',
        result
      })
    }
  })
}