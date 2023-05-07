const passport = require('passport')
const jwt = require('jsonwebtoken')
exports.ensureAuthenticated = passport.authenticate('jwt', { session: false })

exports.ensureAuthorized = (roles) =>  (req, res, next) => {
    if (roles.includes(req.user.roles)) {
        return next()
    }
    return res.status(401).json({ message: 'Unauthorized' })
}