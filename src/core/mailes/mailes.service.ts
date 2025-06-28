import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailesService {
    constructor(private mailService: MailerService) { }
    async sendEmail(to: string, subject: string, code: number) {
        try {
            await this.mailService.sendMail({
                to,
                subject,
                template: 'index',
                context: {
                    code
                }
            })
        } catch (error) {
            console.log("email yuborishda xatolik", error);
            throw error

        }
    }
}
