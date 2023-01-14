const nodemailer = require('nodemailer');
// const pug = require('pug');
// const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Team WordWallet <${process.env.EMAIL_FROM}>`;
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
    let message, html;
    if (template == 'passwordReset') {
      message = `Forgot you password?
 
      We have received your password change request. Please click link below to reset your password: 
      ${this.url}

      Please note your password reset token is valid for only 10 minutes.
      If you didn't forget your password, please ignore this email!
      
      - Team WordWallet`;
      html = `
      <b>Forgot you password?</b>
      <p>We have received your password change request. Please click link below to reset your password: </p>
      <a href="${this.url}" />
      ${this.url}
      </a>
      <br>
      <p>Please note your password reset token is valid for only 10 minutes.<p>
      <p>If you didn't forget your password, please ignore this email.<p>
      <br>
      <p>Team WordWallet.</p>
      `;
    } else if (template == 'welcome') {
      message = `Hi ${this.firstName},

      Welcome to WordWallet, we're glad to have you with us.
      Please feel free to explore the app and provide your feedback.
      
      If you need any support, please send your queries to this email address: mywordwallet@gmail.com
      
      - Team WordWallet`;
      html = `
      <p>Hi ${this.firstName},</p>
      <p>Welcome to <b>WordWallet</b>, we're glad to have you with us.</p>
      <p>Please feel free to explore the app and provide your feedback.</p>
      <p>If you need any support, please send your queries to this email address:
      <a href = "mailto:  mywordwallet@gmail.com"> mywordwallet@gmail.com</a>
      </p>
      <br>
      <p>Team WordWallet.</p>
      `;
    }
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: message,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to WordWallet!');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Reset Your Password');
  }
};
