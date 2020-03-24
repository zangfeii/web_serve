const Notice = require('../models/notice')
const Course = require('../models/courses')
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
    }
  })
}

function setNoticeisreaded(noticeiid) {
  Notice.update({ _id: noticeiid }, { $set: { n_isreaded: true } }, (err3, result3) => {})
}