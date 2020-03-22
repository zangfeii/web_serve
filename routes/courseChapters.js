const express = require('express')
const router = express.Router()
const CourseChapters = require('../api/courseChapters')

router.post('/addChapter', CourseChapters.createChpatr)
router.post('/quereyChapter', CourseChapters.queryCourseChapters)
router.post('/deleteBeforeCourseChapters', CourseChapters.deleteeChapters)
module.exports = router