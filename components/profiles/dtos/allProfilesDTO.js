module.exports = ({ profiles }) => {
	return profiles
		.filter((profile) => profile.user)
		.map(
			({
				_id,
				user: { _id: id, name, email, phone, country, address, photo, title, about, role },
				education,
				experience,
				skills,
			}) => {
				if (role === 'user') {
					return {
						id: _id,
						user: { id, name, email, phone, country, address, photo, title, about },
						education,
						experience,
						skills,
					};
				} else {
					return {
						id: _id,
						user: { id, name, email, phone, country, address, photo, title, about },
					};
				}
			}
		);
};
