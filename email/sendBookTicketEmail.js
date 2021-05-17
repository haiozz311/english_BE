const nodemailer = require("nodemailer");
const hogan = require("hogan.js");
const fs = require("fs"); // built-in backage
const config = require("../config/index");
const template = fs.readFileSync(`${__dirname}/sendBookTicket.hjs`, "utf-8");
const compiledTemplate = hogan.compile(template); // dang hogan
module.exports.sendBookTicketEmail = () => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: config.USER,
      pass: config.PASS,
    },
  };

  console.log(`${__dirname}\\sendBookTicket.hjs`);

  const transporter = nodemailer.createTransport(transport);
  const mailOptions = {
    from: "haiozz3111999@gmail.com",
    to: "haiozz311@gmail.com",
    subject: "Reset PassWord",
    html: compiledTemplate.render({
      email: "haioz311@gmail.com",
    }),
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) return console.log(err);

  });
};
