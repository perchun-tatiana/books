import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, id: number, comment: string) {
  console.log('email',email)

   return await this.mailerService.sendMail({
      to: email,
      subject: 'Answer',
      template: './request.pug',
      context: {
        id,
        comment,
      },
    });
  }
}
