const mongoose = require('mongoose');
module.exports = async () => {
  mongoose
    .connect('mongodb://localhost:27017/recruiter', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('mongodb connected');
    });
};
