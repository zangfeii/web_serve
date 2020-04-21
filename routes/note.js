const express = require('express')
const router = express.Router()
const Note = require('../api/note')

router.post('/createNewNote', Note.createNewNote)
router.post('/getUerNotes', Note.getCurrentUserNote)
router.post('/updateNote', Note.updateNote)
router.post('/deleteNote', Note.deleteNote)
module.exports = router