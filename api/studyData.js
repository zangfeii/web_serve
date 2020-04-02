const studyData = require('../models/studyData')
const courseStu = require('../models/courseStu')
const sd = require('silly-datetime')

module.exports.upStudyData = (req, res) => {
  const courseid = req.body.courseid
  const tecid = req.body.tecid
  const updata = req.body.updata


  studyData.find({ courseiid: courseid, teciid: tecid }, (err1, result1) => {
    if (err1) {
      return res.send({
        status: 204,
        msg: '上传失败'
      })
    } else {
      const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
      const savaFirstData = studyData({
        courseiid: courseid,
        teciid: tecid,
        datas: updata,
        upTime: time
      })
      savaFirstData.save((err2, result2) => {
        if (err2) {
          return res.send({
            status: 204,
            msg: '上传失败'
          })
        } else {
          return res.send({
            status: 200,
            msg: '上传成功'
          })
        }
      })
    }
  })
}

module.exports.getCourseDatas = (req, res) => {
  const curseiid = req.body.courseiid
  studyData.find({ courseiid: curseiid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询资料信息失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '查询资料信息成功',
        data: result
      })
    }
  })
}


module.exports.addDownDataNums = (req, res) => {
  const dataid = req.body.dataid
  const useriid = req.body.useriid
  const courseiid = req.body.courseiid
  studyData.findOne({ _id: dataid }, (err1, result1) => {
    if (err1) {
      return res.send({
        status: 200,
        msg: '下载失败'
      })
    } else {
      courseStu.find({ cs_courseiid: courseiid, cs_stuiid: useriid }, (err2, result2) => {
        if (err2) {
          return res.send({
            status: 204,
            msg: '下载失败'
          })
        } else {
          if (result2.length) {
            let nums = result1.Downnums
            const addNums = nums + 1
            studyData.update({ _id: dataid }, { $set: { Downnums: addNums } }, (err, result) => {
              if (err) {
                return res.send({
                  status: 204,
                  msg: '展示不能下载'
                })
              } else {
                return res.send({
                  status: 200,
                  msg: '下载成功'
                })
              }
            })
          } else {
            courseStu.find({ cs_courseiid: courseiid, cs_teacheriid: useriid }, (err3, result3) => {
              if (err3) {
                return res.send({
                  status: 204,
                  msg: '查找老师在该课程的信息失败'
                })
              } else {
                if (result3.length) {
                  return res.send({
                    status: 200,
                    msg: '该用户是该课程的老师'
                  })
                } else {
                  return res.send({
                    status: 204,
                    msg: '该用户不是该课程的老师或者用户不能下载'
                  })
                }
              }
            })
          }
        }
      })
    }
  })
}