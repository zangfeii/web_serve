const express = require('express')
const router = express.Router()
const User = require('../api/user')

router.post('/register', User.userReg)
router.post('/login', User.userLogin)
module.exports = router