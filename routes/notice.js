const express = require('express')
const router = express.Router()
const Notice = require('../api/notice')

router.post('/queryCurrentUserNotices', Notice.queryGetNotice)
router.post('/setCurrentNoticeIsread', Notice.setNoticeRead)

module.exports = router