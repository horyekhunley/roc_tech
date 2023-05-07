const express = require('express')
const { register } = require('../controllers/auth.controller')
const { ensureAuthenticated } = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/login', async (req, res) => {
    await login(req.body, res)
})
router.post('/register', async (req, res) => {
    await register(req.body, 'user', res)
})
router.post('/verify', async (req, res) => {
    await verify(req.body, res)
})
router.post('/forgotPassword', async (req, res) => {
    await forgotPassword(req.body, 'user', res)
})
router.post('/resetPassword', async (req, res) => {
    await resetPassword(req.body, res)
})
router.post('/changePassword', ensureAuthenticated, async (req, res) => {
    await changePassword(req.body, 'user', res)
})

module.exports = router