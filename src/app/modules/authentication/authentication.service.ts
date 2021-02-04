import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '~modules/users/user.entity';
import { UserRepository } from '~modules/users/user.repository';
import { AuthenticationResponseDto } from './dto/authentication-response.dto';

export type AuthenticationUser = Pick<UserEntity, 'email' | 'firstName' | 'lastName' | 'avatar'>;

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(authUser: AuthenticationUser): Promise<AuthenticationResponseDto> {
    let user = await this.userRepository.findOne({ email: authUser.email });

    if (!user) {
      user = this.userRepository.create(authUser);
    }

    user = await this.userRepository.save(user);

    return plainToClass(AuthenticationResponseDto, {
      accessToken: this.jwtService.sign({ sub: user.id }),
      refreshToken: 'coming soon',
      kek: 'lol',
    });
  }
}
