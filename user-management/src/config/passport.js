import passport from 'passport';
import LocalStrategy from 'passport-local'

passport.use(new LocalStrategy({
    usernameField: 'email',
},
async (req, res) => {

}))