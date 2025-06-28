import { Module } from '@nestjs/common';
import { MailesService } from './mailes.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as  path from 'path';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      service: 'gmail',
      auth: {
        user: "omadbek1223erubdnx@gmail.com",
        pass: "tytuwpsplbfzrtwh"
      }
    },
    template: {
      dir: path.join(process.cwd(), "src", "common", "utils", "templates"),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true
      }

    }
  })],
  providers: [MailesService],
  exports: [MailesService]
})
export class MailesModule { }
