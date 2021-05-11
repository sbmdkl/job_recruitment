module.exports = function makeElasticelasticDestory({ Client }) {
  return async function destroy({ httpRequest: { body } }) {
    try {
      Client.indices
        .delete({ index: 'recruiters' })
        .then((resp, status) => {
          console.log('delete', resp);
        })
        .catch((err) => {
          console.log(err);
        });

      return 'processing...';
    } catch (e) {
      console.log(e);
    }
  };
};
