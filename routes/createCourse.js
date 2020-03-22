const express = require('express')
const router = express.Router()
const Course = require('../api/createCourse')

router.post('/createCourse', Course.createCourse)
router.post('/deleteCourse', Course.deleteCoursesById)
router.post('/updateCourseCoverImg', Course.updateCourseCoverImg)

module.exports = router