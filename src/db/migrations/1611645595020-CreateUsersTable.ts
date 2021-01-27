import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1611645595020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table public.users (
        id uuid not null default uuid_generate_v4(),

        email varchar(255) unique not null,

        first_name varchar(128),
        last_name varchar(128),

        avatar varchar,

        created_at timestamp without time zone NOT NULL DEFAULT now(),
        updated_at timestamp without time zone NOT NULL DEFAULT now(),

        primary key(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table public.users;
    `);
  }
}
