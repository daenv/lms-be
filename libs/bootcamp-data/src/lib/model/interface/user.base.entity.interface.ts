import { IIdEntity } from './id.interface';

export interface IUserBaseEntity extends IIdEntity {
  userId: string;
}
