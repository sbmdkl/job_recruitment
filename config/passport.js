const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../components/users/usersDAL');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SecretOrKey;

passport.use(
	'user',
	new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({ id: jwt_payload.id })
			.then((user) => {
				if (user) {
					return done(null, jwt_payload);
				}
				return done(null, false);
			})
			.catch((err) => console.log(err));
	})
);

passport.use(
	'company',
	new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({ id: jwt_payload.id })
			.then((user) => {
				if (user.role === 'company') {
					return done(null, jwt_payload);
				}
				return done(null, false);
			})
			.catch((err) => console.log(err));
	})
);

passport.use(
	'both',
	new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({ id: jwt_payload.id })
			.then((user) => {
				if (user.role === 'company' || user.role === 'user') {
					return done(null, jwt_payload);
				}
				return done(null, false);
			})
			.catch((err) => console.log(err));
	})
);

passport.use(
	'admin',
	new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({ id: jwt_payload.id })
			.then((user) => {
				if (user.role === 'admin') {
					return done(null, jwt_payload);
				}
				return done(null, false);
			})
			.catch((err) => console.log(err));
	})
);
