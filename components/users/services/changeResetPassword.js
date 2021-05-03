const { passwordChangeDTO } = require('../dtos');
module.exports = function makeResetPasswordChangeService({ User, bcrypt }) {
	return async function resetPasswordChangeService({ httpRequest: { body, AuthUser } }) {
		const user = await User.findOne({ _id: AuthUser.id });
		if (!user) {
			errors.error = 'Unauthorized';
			throw { ...errors };
		}
		if (!body.newPassword) {
			throw { error: 'newPassword is required' };
		}
		try {
			let salt = await bcrypt.genSalt(10);
			let hash = await bcrypt.hash(body.newPassword, salt);
			let updatedUser = await User.findByIdAndUpdate({
				id: AuthUser.id,
				updateUser: { password: hash },
			});
			return passwordChangeDTO({ user: updatedUser });
		} catch (e) {
			throw e;
		}
	};
};
