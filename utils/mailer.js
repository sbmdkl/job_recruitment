const Mailer = require('nodemailer');
const transport = Mailer.createTransport({
  host: process.env.MailerHost,
  port: process.env.MailerPort,
  auth: {
    user: process.env.MailerUser, //generated by Mailtrap
    pass: process.env.MailerPassword, //generated by Mailtrap
  },
});

const Mail = ({ from = 'sbmdkl@gmail.com', to, subject, text }) => {
  let mailOptions = {
    from,
    to,
    subject,
    text,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = { Mail };
