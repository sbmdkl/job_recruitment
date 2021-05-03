const generatePrefix = () => {
	let today = new Date();
	let yy = today.getFullYear().toString().substr(2, 2);
	let mm = ('0' + (today.getMonth() + 1)).slice(-2);
	let dd = ('0' + today.getDate()).slice(-2);
	let ss = today.getSeconds();
	let prefix = Math.ceil(Math.random() * 1000) + 1000 + '_' + ss + '_' + dd + '_' + mm + '_' + yy;
	return prefix;
};

function generateOTP() {
	const otpLength = 6;
	const digits = '0123456789';
	let OTP = '';
	for (let i = 0; i < otpLength; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}

module.exports = { generatePrefix, generateOTP };
