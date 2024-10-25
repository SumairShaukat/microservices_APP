import passport from 'passport';
import User from '../models/userModel.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';

import { googleClientId, googleSecret } from '../config/index.js'
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

// passport.use(new GoogleStrategy({
//     clientID: googleClientId,
//     clientSecret: googleSecret,
//     callbackURL: ''
// },
// async (accessToken, refresToken, profile, done) => {
// try {
//     const [user, created] = await User.findOrCreate({
//         where: {
//             email: profile.emails[0].value
//         },
//         defaults: {
//             name: profile.displayName,
//             provider: 'gGoogle'
//         }
//     })
//     done(null, user)
// } catch (error) {
//     done (error)
// }
// }))
passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Change to 'username' if using usernames
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
  
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
export default passport;