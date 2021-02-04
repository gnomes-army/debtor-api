import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '~core/config';
import { UsersModule } from '~modules/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { GoogleOAuth2Strategy } from './google-oauth2.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthenticationController],
  providers: [GoogleOAuth2Strategy, AuthenticationService],
})
export class AuthenticationModule {}
