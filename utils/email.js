const nodemailer = require('nodemailer');
// const pug = require('pug');
// const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Mrinal Rai <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject,
    // });
    // console.log(html);
    // 2) Define email options
    let message;
    if (template == 'passwordReset') {
      message = `Hi ${this.firstName},

      Forgot your password?
      Do not worry. Please click link below to reset your password: 
      ${this.url}
      If you didn't forget your password, please ignore this email!
      
      - Team WordWallet`;
    } else if (template == 'welcome') {
      message = `Hi ${this.firstName},

      Welcome to WordWallet, we're glad to have you.
      
      Please feel free to explore the app and provide your feedback.
      If you need any help, please don't hesitate to contact me!\n
      
      - Mrinal Rai, Developer`;
    }
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      // html,
      text: message,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to WordWallet!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
