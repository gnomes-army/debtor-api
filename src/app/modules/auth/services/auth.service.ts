import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '~modules/users/entities/user.entity';
import { UserEntitiesService } from '~modules/users/services/user-entities.service';

export type AuthUser = Pick<UserEntity, 'email' | 'firstName' | 'lastName' | 'avatar'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userEntitiesService: UserEntitiesService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(authUser: AuthUser): Promise<string> {
    let user = await this.userEntitiesService.findOne({ email: authUser.email });

    if (!user) {
      user = this.userEntitiesService.create(authUser);
    }

    user = await this.userEntitiesService.save(user);

    return this.jwtService.sign({ sub: user.id });
  }
}
