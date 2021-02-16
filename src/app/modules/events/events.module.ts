import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository])],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [TypeOrmModule],
})
export class EventsModule {}
