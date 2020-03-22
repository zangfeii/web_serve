const express = require('express')
const router = express.Router()
const CourseStu = require('../api/courseStu')

router.post('/enterCourse', CourseStu.enterCourse)
router.post('/beforeEnterQuery', CourseStu.quertyCourseStuBeforeEnterById)
router.post('/queryEnterCourseIds', CourseStu.queryUserEnterCuesesID)
router.post('/queryCourrentCourseStusList', CourseStu.queryCurrentCourseStus)
router.post('/singOutCourseById', CourseStu.singOutCouseById)
module.exports = router