const User = require('../models/users')
  // const db = db.db('onlineStuduy')
const jwt = require('jsonwebtoken')

const secret = require('../secret')


module.exports.userReg = (req, res, next) => {
  const usermobile = req.body.mobile
  const username = req.body.name
  const regUser = new User({
    name: req.body.name,
    pwd: req.body.pwd,
    mobile: req.body.mobile
  })
  User.findOne({ mobile: usermobile, name: username }, (err, result) => {
      if (result) {
        return res.send({
          status: 203,
          msg: '该手机号被注册,是否登陆?'
        })
      } else {
        regUser.save((er, succ) => {
          if (er) {
            return res.send({
              status: 202,
              msg: er || '注册失败'
            })
          } else {
            return res.send({
              status: 200,
              msg: '注册成功'
            })
          }
        })
      }
    })
    // regUser.save((err, succ) => {
    //   if (err) {
    //     return res.send({
    //       status: 202,
    //       msg: err || '注册失败'
    //     })
    //   } else {
    //     return res.send({
    //       status: 200,
    //       msg: '注册成功'
    //     })
    //   }
    // })
}

module.exports.userLogin = (req, res, next) => {
  const userName = req.body.name
  const userPwd = req.body.pwd
  User.findOne({ name: userName }, (err, result) => {
    if (result) {
      //密码解密返回一个布尔值
      const isPwd = require('bcryptjs').compareSync(userPwd, result.pwd)
        // const pwd = result.pwd || 0
        // if (result && result.pwd === userPwd) {
      if (isPwd) {
        const userData = {
          'user_id': result._id,
          'name': result.name,
          'status': result.status
        }
        const token = jwt.sign({
          id: String(result._id)
        }, secret, {
          expiresIn: 60 * 60 * 24 // 授权时效24小时
        })
        return res.send({
          status: 200,
          msg: '登陆成功',
          token,
          userInfo: userData,
        })
      } else {
        return res.send({
          status: 202,
          msg: '密码错误'
        })
      }
    } else {
      return res.send({
        status: 202,
        msg: err || '登陆失败,账号不存在'
      })
    }
  })
}