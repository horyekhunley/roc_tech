const express = require('express')
const { ensureAuthenticated, ensureAuthorized } = require('../middleware/auth.middleware')
const { create_new_story, find_all_stories, find_one_Story, update_a_Story, delete_a_Story, find_top_stories, find_story_by_slug } = require('../controllers/stories.controller')

const router = express.Router()

router.get('/stories', async (req, res) => {
    await find_all_stories(req, res)
})
router.post('/stories', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await create_new_story(req, res)
})
router.put('/stories/:id', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await update_a_Story(req, res)
})
router.get('/stories/:id', async (req, res) => {
    await find_one_story(req, res)
})
router.delete('/stories/:id', async (req, res) => {
    await delete_a_Story(req, res)
})
router.get('/stories/top', async (req, res) => {
    await find_top_stories(req, res)
})
router.get('/stories/slug/:slugId', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await find_story_by_slug(req, res)
})


module.exports = router