import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { RedisService } from 'nestjs-redis';
import { generate } from 'rand-token';
import { v4 as uuid } from 'uuid';
import { EnvironmentVariables } from '~core/types';
import { UserEntity } from '~modules/users/user.entity';
import { UserRepository } from '~modules/users/user.repository';
import { AuthenticationResponseDto } from './dto/authentication-response.dto';
import { RefreshDto } from './dto/refresh.dto';

export type AuthenticationUser = Pick<UserEntity, 'email' | 'firstName' | 'lastName' | 'avatar'>;

interface JwtPayload {
  sub: string;
  jti: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  public async signIn(authUser: AuthenticationUser): Promise<AuthenticationResponseDto> {
    let user = await this.userRepository.findOne({ email: authUser.email });

    if (!user) {
      user = this.userRepository.create(authUser);
    }

    user = await this.userRepository.save(user);

    return this.issueTokens(user.id);
  }

  public async refresh(refreshDto: RefreshDto): Promise<AuthenticationResponseDto> {
    const decoded = this.jwtService.decode(refreshDto.accessToken) as JwtPayload;

    if (!decoded) {
      throw new UnauthorizedException();
    }

    const refreshTokenKey = `refresh:${decoded.sub}:${decoded.jti}`;
    const redisClient = this.redisService.getClient();
    const refreshToken = await redisClient.get(refreshTokenKey);

    if (!refreshToken || refreshToken !== refreshDto.refreshToken) {
      throw new UnauthorizedException();
    }

    await redisClient.del(refreshTokenKey);
    return this.issueTokens(decoded.sub);
  }

  private async issueTokens(userId: string): Promise<AuthenticationResponseDto> {
    const jwtid = uuid();
    const refreshToken = generate(32);
    const refreshTokenKey = `refresh:${userId}:${jwtid}`;
    const ttl = this.configService.get<string>(EnvironmentVariables.JWT_REFRESH_TTL);

    await this.redisService.getClient().set(refreshTokenKey, refreshToken, 'EX', ttl);

    return plainToClass(AuthenticationResponseDto, {
      accessToken: this.jwtService.sign({ sub: userId }, { jwtid }),
      refreshToken,
    });
  }
}
