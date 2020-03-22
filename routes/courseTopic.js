const express = require('express')
const router = express.Router()
const topic = require('../api/courseTopic')

router.post('/createTopic', topic.createCourseTopic)
router.post('/queryCurrentCourseTopic', topic.queryCurrentCourseTopic)
router.post('/deleteCurrentCourseTopic', topic.deleteOneTopicById)
router.post('/updateTopicToUp', topic.updateTopicToUp)
router.post('/updateTopicToDown', topic.updateTopicToDown)

module.exports = router