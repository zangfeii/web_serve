const express = require('express')
const router = express.Router()
const User = require('../api/user')

router.post('/register', User.userReg)
router.post('/login', User.userLogin)
router.post('/queryUsersByids', User.queryUserListsByIds)
router.post('/queryUserInfoById', User.queryUserInfoById)
router.post('/updateUserPic', User.updateUserPic)
router.post('/updateUserPwd', User.updateUserPwd)
module.exports = router