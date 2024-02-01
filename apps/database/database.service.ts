import { Controller } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

@Controller()
export class DatabaseSerivce {
  constructor(private readonly entityManager: EntityManager) {}
  async getRepository<T>(entity): Promise<Repository<T>> {
    return this.entityManager.getRepository(entity);
  }
}
