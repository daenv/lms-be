import { Account, IRepository } from '@app/bootcamp-entities';
import { AccountEntity } from './model/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
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
      .findOne({ where: { id } })
      .then((e) => new AccountsDataEntityMapper().mapFrom(e));
  }
  public async getByQuery(query: object): Promise<Account> {
    return await this._repository
      .findOne(query)
      .then((e) => (e ? new AccountsDataEntityMapper().mapFrom(e) : null));
  }
  public async save(entity: Account): Promise<Account> {
    return await this._repository.save(entity);
  }
  public async delete(id: string): Promise<boolean> {
    return await this._repository
      .delete(id)
      .then((deleteResult) => deleteResult.affected > 0);
  }
  public async getByVerification(verification: string): Promise<Account> {
    const entity = await this._repository.findOne({
      where: {
        verification,
        verificationExpires: MoreThanOrEqual(new Date()),
        verified: false,
      },
    });
    return entity ? new AccountsDataEntityMapper().mapFrom(entity) : null;
  }
}
