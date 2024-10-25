import passport from 'passport';
import User from '../models/userModel';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { googleClientId, googleSecret } from '.';
passport.serializeUser = (user , done) => {
    done(null, user.id)
}
passport.deserializeUser = (user , done) => {
    User.findByPk(id).then(user => {
        done(null, user)
    }).catch((err )=> {
         done(err)
    })
}

passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleSecret,
    callbackURL: ''
},
async (accessToken, refresToken, profile, done) => {
try {
    const [user, created] = await User.findOrCreate({
        where: {
            email: profile.emails[0].value
        },
        defaults: {
            name: profile.displayName,
            provider: 'gGoogle'
        }
    })
    done(null, user)
} catch (error) {
    done (error)
}
}))

export default passport;