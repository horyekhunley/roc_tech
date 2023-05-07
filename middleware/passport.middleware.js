const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user.models')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

module.exports = (passport) => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            await User.findById(payload.id)
                .then(user => {
                    if (user) {
                        return done(null, {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        })
                    }
                    return done(null, false)
                }).catch(err => console.log(err))
        })
    )
}