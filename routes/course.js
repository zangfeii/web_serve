const express = require('express')
const router = express.Router()
const Course = require('../api/course')


router.post('/queryCourseById', Course.queryCoursesById)
router.post('/queryCourseByinCode', Course.queryCoursesByInviteCode)
router.post('/queryEnterCourses', Course.queryUserEnterCoursesByIds)
router.post('/queryCurrentTecCourseInfo', Course.queryTecCurrentCourseInfo)
router.post('/queryCurseName', Course.queryCoursesNameById)
module.exports = router