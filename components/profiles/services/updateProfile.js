const { validateProfile } = require('../validators');
const { updateProfileDTO } = require('../dtos');

module.exports = function makeUpdateProfile({ Profile }) {
  return async function updateProfile({
    httpRequest: {
      params: { id },
      body,
      user,
    },
  }) {
    const profile = await Profile.findOne({ user: user.id });
    console.log(profile);
    if (!profile) throw { error: 'No such profile exists' };
    const { errors, isValid, data } = validateProfile({ ...profile, ...body });
    if (!isValid) {
      throw { ...errors };
    }
    const updateProfile = {
      education: data.geteducation(),
      experience: data.getexperience(),
      skills: data.getskills(),
    };
    console.log(updateProfile);
    let updatedProfile = await Profile.findByIdAndUpdate({ id, updateProfile });
    if (!updateProfile) throw { error: 'Error while updating Profile' };
    console.log(updatedProfile);
    return updateProfileDTO({ profile: { ...profile, ...updatedProfile } });
  };
};
