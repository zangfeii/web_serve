const express = require('express')
const router = express.Router()
const Course = require('../api/createCourse')

router.post('/createCourse', Course.createCourse)

module.exports = router