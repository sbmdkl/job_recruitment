const { allUsersDTO } = require('../dtos');
module.exports = function makeFindAllUsers({ User }) {
	return async function findAllUsers({ httpRequest: { query } }) {
		let users = await User.findAll({ query });
		return allUsersDTO({ users });
	};
};
