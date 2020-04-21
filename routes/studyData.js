const express = require('express')
const router = express.Router()
const StudyData = require('../api/studyData')

router.post('/upStudyData', StudyData.upStudyData)
router.post('/getCourseDatas', StudyData.getCourseDatas)
router.post('/addDownNums', StudyData.addDownDataNums)
router.post('/deleteRourse', StudyData.deleteRourse)
module.exports = router