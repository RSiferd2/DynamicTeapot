const secrets = require('../config/secrets');
const LocalStrategy = require('passport-local').Strategy;
const CoinbaseStrategy = require('passport-coinbase').Strategy;
const SquareStrategy = require('passport-square').Strategy;
// const VenmoStrategy = require('passport-venmo').Strategy;

const configure = (passport) => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    (username, password, done) => {
      return done(null, username);
    })
  );

  // scope options: https://developers.coinbase.com/docs/wallet/permissions
  passport.use(new CoinbaseStrategy({
    clientID: secrets.coinbaseClient,
    clientSecret: secrets.coinbaseSecret,
    callbackURL: 'http://localhost:9009/auth/login/coinbase/callback',
    scope: ['user', 'wallet:accounts:read', 'wallet:orders:refund', 'wallet:checkouts:create']
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken, refreshToken });
    })
  );
  passport.use(new SquareStrategy({
    clientID: secrets.squareClientSandbox,
    clientSecret: secrets.squareSecretSandbox,
    callbackURL: 'https://localhost:9009/auth/login/square/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken, refreshToken });
    })
  );
  // passport.use(new VenmoStrategy({
  //   clientID:
  //   clientSecret:
  //   callbackURL:
  //   },
  //   (accessToken, refreshToken, profile, done) => {
  //     return done(null, { profile, accessToken, refreshToken });
  //   })
  // );
};

module.exports = configure;
