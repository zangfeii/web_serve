const Notice = require('../models/notice')
const Course = require('../models/courses')
const courseStu = require('../models/courseStu')
const sd = require('silly-datetime')

module.exports = function getNewStuGiveHaveNoticeTopices(ciid, stiid) {
  const tecSendNotices = []
    //查询老师在当前客课程传创建的课程
  Notice.find({ n_senderiid: ciid }, (err, result) => {
    // console.log(result);
    if (result.length >= 1) {
      if (result[0]._id) {
        for (let index = 0; index < result.length; index++) {
          if (!result[index].n_tecsendnoticeiid) {
            tecSendNotices.push(result[index])
          }
        }
        //给新进入的学生发送已经发送的通知
        for (let index = 0; index < tecSendNotices.length; index++) {
          const getNewStuNotices = new Notice({
            n_senderiid: ciid,
            n_getteriid: stiid,
            n_tecsendnoticeiid: tecSendNotices[index]._id,
            n_sendTtle: tecSendNotices[index].n_sendTtle,
            n_content: tecSendNotices[index].n_content,
            n_sendtime: tecSendNotices[index].n_sendtime
          })
          getNewStuNotices.save((err1, result1) => {})
        }
      }
    }
  })
}