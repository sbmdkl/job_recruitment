const { validateSignUp } = require('../validators');
const { signupDTO } = require('../dtos');

module.exports = function makeUserSignUp({ User, bcrypt, jwt }) {
	return async function userSignUp({ httpRequest }) {
		const { errors, isValid, data } = validateSignUp(httpRequest.body);
		if (!isValid) {
			throw { ...errors };
		}
		const user = await User.findUserByEmail({ email: data.getEmail() });
		if (user) {
			//user found throw an error
			errors.email = 'User already exists';
			throw { ...errors };
		}
		const newUser = {
			name: data.getName(),
			email: data.getEmail(),
			role: data.getRole(),
			password: data.getPassword(),
			date: data.getDate(),
		};

		let createdUser;
		try {
			let salt = await bcrypt.genSalt(10);
			let hash = await bcrypt.hash(newUser.password, salt);
			newUser.password = hash;
			createdUser = await User.create(newUser);
		} catch (e) {
			throw new Error('Error occurred during signup. Please try again later');
		}

		let payload = {
			id: createdUser.id,
			name: createdUser.name,
			email: createdUser.email,
			role: createdUser.role,
		};
		let token = await jwt.sign(payload, process.env.SecretOrKey, { expiresIn: '2d' });
		return signupDTO({
			user: { id: createdUser.id, name: createdUser.name, email: createdUser.email },
			token: 'Bearer ' + token,
		});
	};
};
