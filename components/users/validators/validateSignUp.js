module.exports = function makeValidateSignUp({ Validator, isEmpty }) {
  return function validateSignUp({ name, email, password, role = 'user', date = Date.now() }) {
    let errors = {};

    name = !isEmpty(name) ? name + '' : '';
    email = !isEmpty(email) ? email + '' : '';
    password = !isEmpty(password) ? password + '' : '';

    if (Validator.isEmpty(name)) {
      errors.name = 'Name field is required';
    }

    if (!Validator.isEmail(email)) {
      errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(email)) {
      errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(password)) {
      errors.password = 'Password field is required';
    }

    if (role !== 'user' || role !== 'admin' || role !== 'company') {
      role = 'user';
    }
    return {
      errors,
      isValid: isEmpty(errors),
      data: Object.freeze({
        getName: () => name,
        getEmail: () => email,
        getPassword: () => password,
        getRole: () => role,
        getDate: () => date,
      }),
    };
  };
};
