import { Account, IRepository, QueryOptions } from '@app/bootcamp-entities';
import { AccountsDataEntityMapper } from './account.data-entity.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './model';
import { MoreThanOrEqual, Repository } from 'typeorm';

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
    return await this._repository
      .findOne({ where: { id } })
      .then((e) => mapper.mapFrom(e));
  }
  public async getByQuery(query: object) {
    return await this._repository
      .find(query)
      .then((e) => e.map((e) => mapper.mapFrom(e)));
  }
  public async save(entity: Account): Promise<Account> {
    return await this._repository.save(entity);
  }
  public async delete(id: string): Promise<boolean> {
    const result = await this._repository.delete({ id });
    return result.affected == 1;
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
  public async getByVerification(verification: string): Promise<Account> {
    return await this._repository
      .findOne({
        where: {
          verification,
          verified: false,
          verificationExpires: MoreThanOrEqual(new Date()),
        },
      })
      .then((e) => (e ? mapper.mapFrom(e) : null));
  }
}
