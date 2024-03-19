const nodeMailer = require("nodemailer");
const { SMTP_EMAIL, SMTP_PASSWORD } = require("../auth/Secrets");

// Send Mail
module.exports = (subject, email, body) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"MyFav List"<' + SMTP_EMAIL + ">",
    replyTo: email,
    to: email,
    subject,
    html: body,
  };

  return transporter
    .sendMail(mailOptions)
    .then((r) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};
