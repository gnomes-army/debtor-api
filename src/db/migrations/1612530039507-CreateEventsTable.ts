import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEventsTable1612530039507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table public.events (
        id uuid not null default uuid_generate_v4(),

        name varchar(128) not null,

        user_id uuid not null,

        created_at timestamp without time zone NOT NULL DEFAULT now(),

        start_date date,
        end_date date,

        primary key(id),

        constraint fk_user foreign key(user_id)
          references users(id) on delete cascade
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table public.events;
    `);
  }
}
