module.exports = function makeAddDocument({ Client }) {
  return async function addDocument({ httpRequest: { body } }) {
    try {
      Client.index({
        index: 'recruiters',
        id: body.id,
        type: 'jobs',
        body: {
          title: body.title,
          location: body.location,
          industry: body.industry,
        },
      });

      const resp = Client.indices.create({ index: 'recruiters' });
      return resp;
    } catch (e) {
      console.log(e);
    }
  };
};
