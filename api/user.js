const User = require('../models/users')
const courseStu = require('../models/courseStu')
const Notice = require('../models/notice')
const jwt = require('jsonwebtoken')

const getNewStuGiveHaveNoticeTopices = require('../Dao/notice')

const secret = require('../secret')
const bcrypt = require('bcryptjs')
const sd = require('silly-datetime')

module.exports.userReg = (req, res, next) => {
  const usermobile = req.body.mobile
  const username = req.body.name
  const regUser = new User({
    name: req.body.name,
    pwd: req.body.pwd,
    mobile: req.body.mobile
  })
  User.findOne({ mobile: usermobile }, (err, result) => {
      if (result) {
        return res.send({
          status: 203,
          msg: '该账号已经被注册'
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
          'hpic': result.headPic,
          'status': result.status,
          'role': result.role
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
          status: 204,
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

module.exports.queryUserListsByIds = (req, res, next) => {
  const ids = req.body.ids
  User.find({ _id: { $in: ids } }, (err, resul) => {
    if (err) {
      res.send({
        status: 204,
        msg: '根据id集合查询用户信息失败'
      })
    } else {
      var result = []
      var result1 = {}
      for (let index = 0; index < resul.length; index++) {
        result1.headPic = resul[index].headPic
        result1._id = resul[index]._id
        result1.name = resul[index].name
        result.push(result1)
        result1 = {}
      }
      res.send({
        status: 200,
        msg: '根据id集合查询用户信息成功',
        result
      })
    }
  })
}

//根据id查询用户信息
module.exports.queryUserInfoById = (req, res, next) => {
  const useriid = req.body.useriid
  User.findOne({ _id: useriid }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '查询用户信息失败'
      })
    } else {
      const userinfo = {
        hpci: result.headPic,
        createTime: result.createTime,
        userName: result.name,
        userMobile: result.mobile
      }
      res.send({
        status: 200,
        msg: '查询用户信息成功',
        userinfo,
      })
    }
  })
}

//根据id更改用户头像
module.exports.updateUserPic = (req, res, next) => {
  const usriid = req.body.useriid
  const picPath = req.body.path
  User.update({ _id: usriid }, { $set: { headPic: picPath } }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '修改头像失败'
      })
    } else {
      const hpic = {
        hpic: result.headPic
      }
      res.send({
        status: 200,
        msg: '修改头像成功',
        result,
        hpic
      })
    }
  })
}

//修改密码
module.exports.updateUserPwd = (req, res) => {
  const useriid = req.body.useriid
  const oldpwd = req.body.oldPwd
  const newpwd = req.body.newPwd
    // const newpwd = require('bcryptjs').hashSync(pwd, 10)
  User.findOne({ _id: useriid }, (err, result) => {
    if (err) {
      res.send({
        status: 210,
        msg: '意外错误'
      })
    } else {
      const isPwd = require('bcryptjs').compareSync(oldpwd, result.pwd)
      if (isPwd) {
        User.update({ _id: useriid }, { $set: { pwd: newpwd } }, (err, result) => {
          if (err) {
            res.send({
              status: 204,
              msg: '修改密码失败'
            })
          } else {
            res.send({
              status: 200,
              msg: '修改密码成功'
            })
          }
        })
      } else {
        res.send({
          status: 210,
          msg: '原密码错误'
        })
      }
    }
  })
}

//老师添加学生,根据账号名和手机号查询该用户的id
module.exports.queryUserIdByNameMobileAdd = (req, res) => {
  const stuName = req.body.stuName
  const courseiid = req.body.courseiid
  const teciid = req.body.teciid
  const mobile = req.body.mobile
  const coursename = req.body.coursename
  User.findOne({ mobile: mobile, name: stuName }, (err, result) => {
    if (err) {
      res.send({
        status: 204,
        msg: '添加失败'
      })
    } else {
      const stuiid = result._id
      courseStu.findOne({ cs_courseiid: courseiid, cs_stuiid: stuiid }, (err1, result1) => {
        if (err1) {
          res.send({
            status: 204,
            msg: '添加失败'
          })
        } else {
          if (result1) {
            return res.send({
              status: 207,
              msg: '该学生已经在该课程中了'
            })
          }
          const tecAddCourseStu = new courseStu({
            cs_courseiid: courseiid,
            cs_teacheriid: teciid,
            cs_stuiid: stuiid
          })
          tecAddCourseStu.save((err2, succ) => {
            if (err1) {
              res.send({
                status: 204,
                msg: '添加失败'
              })
            } else {
              getNewStuGiveHaveNoticeTopices(courseiid, stuiid)
              const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
              const createNotices = new Notice({
                n_senderiid: courseiid,
                n_getteriid: stuiid,
                n_sendTtle: '学习通知',
                n_content: '您已经被老师添加到' + coursename + '课程中了,赶快去学习吧',
                n_sendtime: time
              })
              createNotices.save((err3, reult3) => {
                if (err3) {
                  console.log('创建通知失败');
                }
                res.send({
                  status: 200,
                  msg: '添加成功',
                })
              })
            }
          })
        }
      })
    }
  })
}