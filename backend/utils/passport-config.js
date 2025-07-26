const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const admin = require('../model/admin');

passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const user = await admin.findOne({ username });
      if (!user) return done(null, false, { message: 'Invalid credentials' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Invalid credentials' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await admin.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
