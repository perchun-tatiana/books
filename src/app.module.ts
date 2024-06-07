import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsModule } from './requests/requests.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guards';

@Module({
  imports: [
    RequestsModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
