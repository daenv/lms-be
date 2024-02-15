import { Account, IRepository, QueryOptions } from '@app/bootcamp-entities';
import { AccountsDataEntityMapper } from './account.data-entity.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './model';
import { FindOptions, Repository } from 'typeorm';

const mapper = new AccountsDataEntityMapper();

export class AccountRepository implements IRepository<string, Account> {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly _repository: Repository<AccountEntity>,
  ) {}
  public async getAll(options?: QueryOptions): Promise<Account[]> {
    const { page, pageSize, sortBy, sortOrder, filter } = options || {};
    return await this._repository
      .find({
        order: { [sortBy]: sortOrder },
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: filter,
      })
      .then((item) => item.map((e) => mapper.mapFrom(e)));
  }

  public async get(id: string): Promise<Account> {
    throw new Error('Method not implemented.');
  }
  public async getByQuery(query: object) {
    throw new Error('Method not implemented.');
  }
  public async save(entity: Account): Promise<Account> {
    throw new Error('Method not implemented.');
  }
  public async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public async create(entity: Partial<AccountEntity>): Promise<Account> {
    try {
      const result = await this._repository.save(
        this._repository.create(entity),
      );
      return result;
    } catch (err) {
      throw new Error(`Error occurred while creating account: ${err.message}`);
    }
  }
}
