const express = require('express')
const router = express.Router()
const chapterContent = require('../api/chapterContent')

router.post('/createChapterContent', chapterContent.createChapterContent)
router.post('/getCurentChapterContent', chapterContent.getCurentChapterContent)
router.post('/updateChapterContent', chapterContent.updateChapterContent)
module.exports = router