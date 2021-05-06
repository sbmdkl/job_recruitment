module.exports = ({
	profile: {
		_id,
		user: { name, email, phone, country, address, photo, title, about, role },
		education,
		experience,
		skills,
	},
}) => {
	if (role === 'user') {
		return {
			id: _id,
			user: { name, email, phone, country, address, photo, title, about },
			education,
			experience,
			skills,
		};
	} else {
		return {
			id: _id,
			user: { name, email, phone, country, address, photo, title, about },
		};
	}
};
