const courseTopic = require('../models/courseTopics')
const User = require('../models/users')

const sd = require('silly-datetime')

module.exports.createCourseTopic = (req, res, next) => {
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  const createTopic = new courseTopic({
    tp_courseiid: req.body.params.courseiid,
    tp_courseTeacheriid: req.body.params.teacheriid,
    tp_topicCreateName: req.body.params.CreateName,
    tp_topicCreateriid: req.body.params.createiid,
    tp_createTime: time,
    tp_courseTopic: req.body.params.topicData
  })

  createTopic.save((err, succ) => {
    if (err) {
      res.send({
        status: 202,
        msg: '创建话题失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '创建话题成功',
        succ
      })
    }
  })
}

//查询用户创建的话题
module.exports.queryCurrentCourseTopic = (req, res, next) => {
  const teacheriid = req.body.teacheriid
  const courseiid = req.body.courseiid
  courseTopic.find({ tp_courseTeacheriid: teacheriid, tp_courseiid: courseiid }, (err, resul) => {
    // console.log('话题查询', ress)
    if (err) {
      res.send({
        status: 202,
        msg: '查询当前课程话题失败'
      })
    } else {
      //查询用户的头像
      var useriids = []
      for (let index = 0; index < resul.length; index++) {
        useriids.push(resul[index].tp_topicCreateriid)
      }
      User.find({ _id: { $in: useriids } }, (err1, result1) => {
        if (err1) {
          console.log('查询用户信息失败');
        } else {
          for (let i = 0; i < result1.length; i++) {
            for (let index = 0; index < resul.length; index++) {
              if (result1[i]._id == resul[index].tp_topicCreateriid) {
                resul[index].tp_topicCreaterPic = result1[i].headPic
              }
            }
          }
        }
        //置顶
        var topNum = 0
        for (let index = 0; index < resul.length; index++) {
          if (resul[index].tp_isTop) {
            topNum = index
          }
        }
        if (!topNum) {
          const result = resul
          res.send({
            status: 200,
            msg: '查询课程话题成功1',
            result
          })
        } else {
          const top = resul.splice(topNum, 1)
          for (let index = 0; index < resul.length; index++) {
            top.push(resul[index])
          }
          const result = top
          res.send({
            status: 200,
            msg: '查询课程话题成功',
            result
          })
        }
      })
    }
  })
}

//删除当前话题
module.exports.deleteOneTopicById = (req, res, next) => {
  const topicid = req.body.topicid
  const courseid = req.body.courseid
  const teacherid = req.body.teacherid
  courseTopic.find({ tp_courseiid: courseid, tp_courseTeacheriid: teacherid })
  courseTopic.remove({ _id: topicid, tp_courseiid: courseid, tp_courseTeacheriid: teacherid }, (err, succ) => {
    if (err) {
      console.log(err)
      res.send({
        status: 203,
        msg: '删除当前课程话题失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '删除当前课程成功'
      })
    }
  })
}

//修改话题,置顶
module.exports.updateTopicToUp = (req, res, next) => {
  const topicid = req.body.topicid
  const courseid = req.body.courseid
  const teacherid = req.body.teacherid
  var topNum = 0
  courseTopic.find({ tp_courseiid: courseid, tp_courseTeacheriid: teacherid }, (err, re) => {
    for (let index = 0; index < re.length; index++) {
      if (re[index].tp_isTop) {
        topNum = topNum + 1
      }
    }
    if (!topNum) {
      courseTopic.update({ _id: topicid, tp_courseiid: courseid, tp_courseTeacheriid: teacherid }, { $set: { tp_isTop: true } }, (err, succ) => {
        if (err) {
          res.send({
            status: 209,
            msg: '修改置顶状态失败'
          })
        } else {
          res.send({
            status: 200,
            msg: '修改置顶状态成功'
          })
        }
      })
    } else {
      res.send({
        status: 210,
        msg: '一次只能置顶一个'
      })
    }
  })

}

//修改话题,取消置顶
module.exports.updateTopicToDown = (req, res, next) => {
  const topicid = req.body.topicid
  const courseid = req.body.courseid
  const teacherid = req.body.teacherid
  courseTopic.update({ _id: topicid, tp_courseiid: courseid, tp_courseTeacheriid: teacherid }, { $set: { tp_isTop: false } }, (err, succ) => {
    if (err) {
      res.send({
        status: 209,
        msg: '修改置顶状态失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '修改置顶状态成功'
      })
    }
  })
}