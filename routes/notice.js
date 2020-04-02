const express = require('express')
const router = express.Router()
const Notice = require('../api/notice')

router.post('/queryCurrentUserNotices', Notice.queryGetNotice)
router.post('/setCurrentNoticeIsread', Notice.setNoticeRead)
router.post('/setCourseNoticeSend', Notice.setNoticeToStu)
router.post('/getCurrentCourseNotices', Notice.getCurrentCreateNotices)
router.post('/deleteTecSToStuNotice', Notice.deleteSendedNotices)
router.post('/deleteStuGetOneNotice', Notice.deleteStuGetOneNotice)
router.post('/getCurrentCourseGetNotcies', Notice.stuGetCurrentCourseNotices)
module.exports = router