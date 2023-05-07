const express = require('express')
const { ensureAuthenticated, ensureAuthorized } = require('../middleware/auth.middleware')
const { create_new_video, find_all_videos, update_a_video, find_one_video, delete_a_video } = require('../controllers/videos.controller')

const router = express.Router()

router.get('/videos', async (req, res) => {
    await find_all_videos(req, res)
})
router.post('/videos', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await create_new_video(req, res)
})
router.put('/videos/:id', ensureAuthenticated, ensureAuthorized(['admin']), async (req, res) => {
    await update_a_video(req, res)
})
router.get('/videos/:id', async (req, res) => {
    await find_one_video(req, res)
})
router.get('/videos/top', async (req, res) => {
    await find_top_videos(req, res)
})

router.delete('/videos/:id', async (req, res) => {
    await delete_a_video(req, res)
})

module.exports = router