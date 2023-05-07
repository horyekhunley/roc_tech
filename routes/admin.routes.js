const express = require('express')
const { find_all_admins, find_one_admin } = require('../controllers/admin.controller')
const { register } = require('../controllers/auth.controller')
const { ensureAuthenticated, ensureAuthorized } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/users', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await find_all_admins(req, res)
})
router.get('/seed', async (req, res) => {
    const admin = {
        name: 'Admin',
        email: 'mahbubbello@gmail.com',
        password: 'Password@123',
    }
    await register(admin, 'admin', res)
})
router.get('/users/:id', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await find_one_admin(req, res)
})


module.exports = router