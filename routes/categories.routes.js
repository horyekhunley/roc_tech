const express = require('express')
const { create_new_category, find_all_categories, update_a_category, find_one_category, delete_a_category } = require('../controllers/categories.controller')
const { ensureAuthenticated, ensureAuthorized } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/categories', async (req, res) => {
    await find_all_categories(req, res)
})
router.post('/categories', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await create_new_category(req, res)
})
router.put('/categories/:id', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await update_a_category(req, res)
})
router.get('/categories/:id', async (req, res) => {
    await find_one_category(req, res)
})
router.delete('/categories/:id', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await delete_a_category(req, res)
})


module.exports = router