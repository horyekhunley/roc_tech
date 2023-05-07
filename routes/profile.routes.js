const express = require('express')
const { ensureAuthenticated } = require('../middleware/auth.middleware')
const { find_one_profile, update_a_user } = require('../controllers/profile.controller')

const router = express.Router()

router.get('/profile', ensureAuthenticated, async (req, res) => {
    await find_one_profile(req, res)
})

router.put('/profile', ensureAuthenticated, async (req, res) => {
    await update_a_user(req, res)
})


module.exports = router