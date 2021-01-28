import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUUIDOSSPExtension1611645595019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create extension if not exists "uuid-ossp";
    `);
  }

  public async down(): Promise<void> {}
}
