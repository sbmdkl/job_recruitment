const { Mail } = require('../../../utils/mailer');
const { ResetPasswordDTO } = require('../dtos');

module.exports = function makeResetPassword({ User, generateOTP }) {
  return async function ResetPassword({ httpRequest: { body } }) {
    // check for user
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw {
        error: 'User not found',
      };
    }
    // make a reset password service
    const otp = generateOTP();
    User.findByIdAndUpdate({ id: user.id, updateUser: { token: otp } });
    // Mail({
    //   to: body.email,
    //   subject: 'One Time Password',
    //   text: 'Your One Time Password to reset your password is ' + otp,
    // });
    return ResetPasswordDTO();
  };
};
