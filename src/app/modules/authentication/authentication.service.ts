import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Connection } from 'typeorm';
// import { v4 } from 'uuid';

import { UserEntity } from '~modules/users/entities/user.entity';
import { UserEntitiesService } from '~modules/users/services/user-entities.service';
import { GoogleOAuth2User } from './authentication.strategy';

@Injectable()
export class AuthenticationService {
  constructor(public readonly userEntitiesService: UserEntitiesService) {}

  public async processAuthorizationRequest(googleUser: GoogleOAuth2User): Promise<UserEntity> {
    const { email, firstName, lastName, picture } = googleUser;
    let user = await this.userEntitiesService.findOne({ email: googleUser.email });

    if (!user) {
      user = this.userEntitiesService.create({
        email,
        firstName,
        lastName,
        avatar: picture,
      });
    }

    return this.userEntitiesService.save(user);
  }
}
