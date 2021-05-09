module.exports = ({ recommendations }) => {
  return recommendations.map(({ _id, job }) => {
    return { id: _id, job };
  });
};
