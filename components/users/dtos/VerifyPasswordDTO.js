module.exports = ({ token }) => ({
	status: 'ok',
	token,
	message: 'OTP is correct. Enter new Password.',
	systemTime: Date.now(),
});
