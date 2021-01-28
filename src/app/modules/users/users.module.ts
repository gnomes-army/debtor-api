import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserEntitiesService } from './services/user-entities.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UserEntitiesService],
  exports: [UserEntitiesService, TypeOrmModule],
})
export class UsersModule {}
