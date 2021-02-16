import { FindManyOptions, Repository } from 'typeorm';
import { BaseEntity } from '~core/database/base.entity';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  /**
   * Finds entities that match given conditions.
   * Also applies the pagination parameters using the skip and take attributes.
   */
  public async findWithPagination(
    options: FindManyOptions<T>,
    page: number,
    limit: number,
  ): Promise<T[]> {
    return this.find({
      skip: (page - 1) * limit,
      take: limit,
      ...options,
    });
  }
}
