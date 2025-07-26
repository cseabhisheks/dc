const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message || 'Invalid credentials' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Login successful', username: user.username });
    });
  })(req, res, next);
});

router.get('/whoami', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user, session: req.session });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

module.exports = router;
