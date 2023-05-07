const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.routes')
const videoRoutes = require('./videos.routes')
const commentRoutes = require('./comments.routes')
const adminRoutes = require('./admin.routes')
const categoryRoutes = require('./categories.routes')
const profileRoutes = require('./profile.routes')
const storyRoutes = require('./stories.routes')

router.use('/auth', authRoutes)
router.use('/api', videoRoutes)
router.use('/api', commentRoutes)
router.use('/api', adminRoutes)
router.use('/api', categoryRoutes)
router.use('/api', profileRoutes)
router.use('/api', storyRoutes)

module.exports = router