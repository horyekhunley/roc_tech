const express = require('express')
const { ensureAuthenticated, ensureAuthorized } = require('../middleware/auth.middleware')
const { create_new_comment, delete_a_comment } = require('../controllers/comments.controller')

const router = express.Router()

router.get('/comments', ensureAuthenticated, async (req, res) => {
    await create_new_comment(req, res)
})

router.delete('/comments/:id', ensureAuthenticated, async (req, res) => {
    await delete_a_comment(req, res)
})


module.exports = router