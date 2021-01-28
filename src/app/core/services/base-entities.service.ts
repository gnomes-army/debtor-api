import { DeepPartial, FindConditions, FindOneOptions, Repository, SaveOptions } from 'typeorm';

export class BaseEntitiesService<Entity> {
  protected repository: Repository<Entity>;

  constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  /**
   * Creates a new entity instance and copies all entity properties from this object into a new
   * entity.
   * Note that it copies only properties that present in entity schema.
   */
  public create(entityLike: DeepPartial<Entity> = {}): Entity {
    return this.repository.create(entityLike);
  }

  /**
   * Finds first entity that matches given conditions.
   */
  public async findOne(
    condition: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    return this.repository.findOne(condition, options);
  }

  /**
   * Saves a given entity in the database.
   * If entity does not exist in the database then inserts, otherwise updates.
   */
  public async save(entity: Entity, options: SaveOptions = {}): Promise<Entity> {
    return this.repository.save(entity, options);
  }
}
