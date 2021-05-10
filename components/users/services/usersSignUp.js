const { validateSignUp } = require('../validators');
const { signupDTO } = require('../dtos');

module.exports = function makeUserSignUp({
  CreateProfileService,
  User,
  bcrypt,
  jwt,
  ElasticAddUser,
}) {
  return async function userSignUp({ httpRequest }) {
    try {
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
        phone: data.getphone(),
        country: data.getcountry(),
        address: data.getaddress(),
        title: data.gettitle(),
        about: data.getabout(),
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
      // create new profile
      CreateProfileService({ httpRequest: { body: {}, user: { id: createdUser.id } } });
      ElasticAddUser({
        httpRequest: {
          body: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            phone: createdUser.phone,
            country: createdUser.country,
            address: createdUser.address,
            title: createdUser.title,
          },
        },
      });
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
    } catch (e) {
      console.log(e);
    }
  };
};
