import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserEntitiesService } from './services/user-entities.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserEntitiesService],
  exports: [UserEntitiesService, TypeOrmModule],
})
export class UsersModule {}
