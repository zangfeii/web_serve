const express = require('express')
const router = express.Router()
const Mesage = require('../api/message')

router.post('/sendFirstMeassage', Mesage.createAmessage)
router.post('/queryCurrenTecStuMessage', Mesage.queryCurrentTecStuMessage)
router.post('/replaySelf', Mesage.replayMessageMyself)
router.post('/stuAtTecReplay', Mesage.stuAtTecReplay)
router.post('/tecReplayAt', Mesage.TecAtStuReplay)
router.post('/getStuLeaveTecMsgs', Mesage.queryCurrentCourseStuLeaveTecMgs)
router.post('/getUserSnedMsgs', Mesage.queryUserSnedsMsgs)
router.post('/getUserGetMsgs', Mesage.queryUserGetsMsgs)
module.exports = router