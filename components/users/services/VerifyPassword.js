const { VerifyPasswordDTO } = require('../dtos');

module.exports = function makeVerifyPassword({ User, generateOTP, jwt }) {
  return async function VerifyPassword({ httpRequest: { body } }) {
    // check for user
    if (!body.email) {
      throw { error: 'email is required' };
    }
    if (!body.otp) {
      throw { error: 'otp is required' };
    }
    const user = await User.findOne({ email: body.email, token: body.otp });
    if (!user) {
      throw {
        error: 'Wrong OTP',
      };
    }
    // make a reset password service
    const otp = generateOTP();
    User.findByIdAndUpdate({ id: user.id, updateUser: { token: otp } });

    let payload = { id: user.id, name: user.name, email: user.email, role: user.role };

    const token = await jwt.sign(payload, process.env.SecretOrKey, { expiresIn: '2d' });
    return VerifyPasswordDTO({ token });
  };
};
