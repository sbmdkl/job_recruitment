const { validateLogin } = require('../validators');
const { loginDTO } = require('../dtos');

module.exports = function makeUserLogin({ User, bcrypt, jwt }) {
  return async function userLogin({ httpRequest: { body } }) {
    const { errors, isValid, data } = validateLogin(body);
    if (!isValid) {
      throw { ...errors };
    }
    const user = await User.findUserByEmail({ email: data.getEmail() });
    if (!user) {
      errors.error = 'Username or password incorrect';
      throw { ...errors };
    }
    console.log(data.getPassword());
    const isMatch = await bcrypt.compare(data.getPassword(), user.password);
    if (!isMatch) {
      errors.error = 'Username or password incorrect';
      throw { ...errors };
    }
    if (user.status !== 1) {
      errors.error = 'Account has not been activated';
      throw { ...errors };
    }
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = await jwt.sign(payload, process.env.SecretOrKey, { expiresIn: '2d' });
    return loginDTO({ token });
  };
};
