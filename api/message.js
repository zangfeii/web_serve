const Message = require('../models/message')
const sd = require('silly-datetime')

//首次创建一条消息
module.exports.createAmessage = (req, res) => {
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  const courseiid = req.body.courseiid
  const geteriid = req.body.geteriid
  const aMessage = {
    sendiid: req.body.senderiid,
    message: req.body.Message,
    time: time
  }

  const fMessage = new Message({
    m_courseiid: courseiid,
    m_geteriid: geteriid,
    m_snederiid: req.body.senderiid,
    m_message: aMessage
  })

  fMessage.save((err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '发送消息失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '发送消息失败'
      })
    }
  })
}

//查询当前课程老师和其中一个学生的消息
module.exports.queryCurrentTecStuMessage = (req, res) => {
  const courseiid = req.body.couseiid
  const stuiid = req.body.stuiid
  Message.find({ m_courseiid: courseiid, m_geteriid: stuiid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询消息失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '查询消息成功',
        result
      })
    }
  })
}

//查询当前用户的发送的留言消息
module.exports.queryUserSnedsMsgs = (req, res) => {
  const useriid = req.body.useriid
  Message.find({ m_snederiid: useriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询当前用户发出的信息失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '查询当前用户发送的信息成功',
        result
      })
    }
  })
}

//查询当前用户的接受到的留言信息
module.exports.queryUserGetsMsgs = (req, res) => {
  const useriid = req.body.useriid
  Message.find({ m_geteriid: useriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询当前用户收到的信息失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '查询当前用户收到的信息成功',
        result
      })
    }
  })
}

//查询该学生该老师的留言
module.exports.queryCurrentCourseStuLeaveTecMgs = (req, res) => {
  const courseiid = req.body.couseiid
  const stuiid = req.body.stuiid
  Message.find({ m_courseiid: courseiid, m_snederiid: stuiid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询消息失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '查询消息成功',
        result
      })
    }
  })
}



//自己回复自己的留言不带@
module.exports.replayMessageMyself = (req, res) => {
  const messageiid = req.body.messageiid
  const replayiid = req.body.replayiid
  const replayMessage = req.body.replaymessage
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  Message.update({ _id: messageiid }, {
    $push: {
      m_message: {
        replaySelfIid: replayiid,
        replaySelfMessage: replayMessage,
        time: time
      }
    }
  }, (err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '回复失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '回复成功'
      })
    }
  })
}

//老师回复留言带@
module.exports.TecAtStuReplay = (req, res) => {
  const messageiid = req.body.messageiid
  const replayiid = req.body.replayiid
  const replayMessageAtStuMsg = req.body.replayMessage
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  Message.update({ _id: messageiid }, {
    $push: {
      m_message: {
        relpayiid: replayiid,
        replayAtStuMsg: replayMessageAtStuMsg,
        time: time
      }
    }
  }, (err, result) => {
    if (err) {
      return res.send({
        status: 204,
        msg: '回复失败'
      })
    } else {
      return res.send({
        status: 200,
        msg: '回复成功'
      })
    }
  })
}

//学生回复老师的留言带@
module.exports.stuAtTecReplay = (req, res) => {
  const messageiid = req.body.messageiid
  const stuiid = req.body.stuiid
  const replayMessage = req.body.replayMessage
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  Message.update({ _id: messageiid }, {
    $push: {
      m_message: {
        replayStuiid: stuiid,
        replayTecMessage: replayMessage,
        time: time
      }
    }
  }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '回复老师失败'
      })
    } else {
      res.send({
        status: 200,
        msg: '回复老师成功'
      })
    }
  })
}