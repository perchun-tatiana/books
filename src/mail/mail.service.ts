import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string) {

   return await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm email',
      template: './request.pug',
      context: {
      },
    });
  }
}
