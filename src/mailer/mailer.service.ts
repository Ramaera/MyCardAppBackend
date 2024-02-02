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
    // this.confirmationTemplate = this.loadTemplate('confirmation.hbs');
    // this.emailConfirmation = this.loadTemplate('confirmation.hbs');
    // this.myCardDetails = this.loadTemplate('CardDetailsVerification.hbs');
  }

  //   private loadTemplate(templateName: string): handlebars.TemplateDelegate {
  //     const templatesFolderPath = path.join(__dirname, './templates');
  //     const templatePath = path.join(templatesFolderPath, templateName);

  //     const templateSource = fs.readFileSync(templatePath, 'utf8');
  //     return handlebars.compile(templateSource);
  //   }
  async sendUserConfirmation() {
    const url = `hiii`;
    const html = this.confirmationTemplate({ name: 'Mohan', url });
    try {
      await this.transporter.sendMail({
        to: 'mohansharma916@gmail.com',
        subject: 'Welcome user! Confirm your Email',
        text: 'Hello From Text',
        // html: html,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async sendEmailConfirmation(user, token) {
    console.log('inside  mail serice');
    const url = `${process.env.BASE_URL}/my-card/verifyEmail/${token}`;
    const html = this.emailConfirmation({ name: 'MOhan', url });
    try {
      await this.transporter.sendMail({
        to: 'mohansharma916@gmail.com',
        subject: 'Verify Email Address',
        html: html,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async sendPassword(userLoginID, password) {
    const html = this.myCardDetails({ userLoginID, password });
    try {
      await this.transporter.sendMail({
        to: 'mohansharma916@gmail.com',
        subject: 'My Card Details',
        html: html,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async sendCoupounCode(User, CoupounCode) {
    console.log('inside mail');
    const url = `hiii`;
    const html = this.confirmationTemplate({ name: 'Mohan', url });

    await this.transporter.sendMail({
      to: 'mohansharma916@gmail.com',
      subject: 'Welcome user! Confirm your Email',
      text: 'Hello From Text',
      // html: html,
    });
    console.log('after mail');
  }
}
