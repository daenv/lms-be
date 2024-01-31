import { Account, IRepository } from '@app/bootcamp-entities';
import { AccountEntity } from './model/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsDataEntityMapper } from './account.data-entity.mapper';

export class AccountRepository implements IRepository<string, Account> {
  constructor(
    @InjectRepository(AccountEntity)
    private _repository: Repository<AccountEntity>,
  ) {}
  public async create(entity: Partial<Account>): Promise<Account> {
    return await this._repository.create(entity);
  }
  public async getAll(): Promise<Account[]> {
    return await this._repository
      .find()
      .then((items) =>
        items.map((e) => new AccountsDataEntityMapper().mapFrom(e)),
      );
  }
  public async get(id: string): Promise<Account> {
    return await this._repository
      .findOne(id)
      .then((e) => new AccountsDataEntityMapper().mapFrom(e));
  }
  public async getByQuery(query: object): Promise<Account> {
    return await this._repository
      .findOne(query)
      .then((e) => (e ? new AccountsDataEntityMapper().mapFrom(e) : null));
  }
  save(entity: Account): Promise<Account> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
