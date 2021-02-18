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
import { CurrentUserDto } from './dto/current-user.dto';
import { TokensPairDto } from './dto/tokens-pair.dto';

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

  public async signIn(authUser: AuthenticationUser): Promise<TokensPairDto> {
    let user = await this.userRepository.findOne({ email: authUser.email });

    if (!user) {
      user = this.userRepository.create(authUser);
    }

    user = await this.userRepository.save(user);

    return this.issueTokens(user.id);
  }

  public async refresh(accessToken: string, refreshToken: string): Promise<TokensPairDto> {
    const decoded = this.jwtService.decode(accessToken) as JwtPayload;

    if (!decoded) {
      throw new UnauthorizedException();
    }

    const refreshTokenKey = `refresh:${decoded.sub}:${decoded.jti}`;
    const redisClient = this.redisService.getClient();
    const storedRefreshToken = await redisClient.get(refreshTokenKey);

    if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    await redisClient.del(refreshTokenKey);
    return this.issueTokens(decoded.sub);
  }

  public async currentUser(id: string): Promise<CurrentUserDto> {
    const user = await this.userRepository.findOne({ id });
    return plainToClass(CurrentUserDto, { id: user.id, email: user.email, avatar: user.avatar });
  }

  private async issueTokens(userId: string): Promise<TokensPairDto> {
    const jwtid = uuid();
    const refreshToken = generate(32);
    const refreshTokenKey = `refresh:${userId}:${jwtid}`;
    const ttl = this.configService.get<string>(EnvironmentVariables.JWT_REFRESH_TTL);

    await this.redisService.getClient().set(refreshTokenKey, refreshToken, 'EX', ttl);

    return plainToClass(TokensPairDto, {
      accessToken: this.jwtService.sign({ sub: userId }, { jwtid }),
      refreshToken,
    });
  }
}
