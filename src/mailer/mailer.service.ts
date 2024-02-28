import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private confirmationTemplate: handlebars.TemplateDelegate;
  private emailConfirmation: handlebars.TemplateDelegate;
  private myCardDetails: handlebars.TemplateDelegate;
  private myCredentials: handlebars.TemplateDelegate;
  private sendCouponCode: handlebars.TemplateDelegate;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: process.env.MAILER_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      {
        from: {
          name: 'No-reply',
          address: process.env.MAIL_FROM,
        },
      },
    );

    // // Load Handlebars templates
    this.confirmationTemplate = this.loadTemplate('confirmation.hbs');
    this.emailConfirmation = this.loadTemplate('confirmation.hbs');
    this.myCardDetails = this.loadTemplate('CardDetailsVerification.hbs');
    this.myCredentials = this.loadTemplate('credentials.hbs');
    this.sendCouponCode = this.loadTemplate('sendCouponCode.hbs');
  }

  private loadTemplate(templateName: string): handlebars.TemplateDelegate {
    const templatesFolderPath = path.join(__dirname, './templates');

    const templatePath = path.resolve(templatesFolderPath, templateName);

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    return handlebars.compile(templateSource);
  }
  // async sendUserConfirmation() {
  //   const url = `hiii`;
  //   const html = this.confirmationTemplate({ name: 'Mohan', url });
  //   try {
  //     await this.transporter.sendMail({
  //       to: 'mohansharma916@gmail.com',
  //       subject: 'Welcome user! Confirm your Email',
  //       text: 'Hello From Text',
  //       // html: html,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async sendEmailConfirmation(user, token) {
    console.log('inside this');
    const url = `${process.env.BASE_URL}/my-card/verifyEmail/${token}`;
    const html = this.emailConfirmation({ name: user.name, url });
    try {
      await this.transporter.sendMail({
        to: user.email,
        subject: 'Verify Email Address',
        html: html,
      });
      console.log('done this');
    } catch (err) {
      console.log(err);
    }
  }
  async sendPassword(userData, password) {
    const html = this.myCredentials({ userData, password });
    try {
      await this.transporter.sendMail({
        to: userData.email,
        subject: 'Credentials of MyCard',
        html: html,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async sendCoupounCode(User, CoupounCode, Amount) {
    const html = this.sendCouponCode({ User, CoupounCode, Amount });
    await this.transporter.sendMail({
      to: User.email,
      subject: 'My Mart : Discount Code',
      html: html,
    });
  }
}
