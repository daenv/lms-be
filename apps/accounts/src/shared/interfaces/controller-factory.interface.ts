import { IRequestMessage } from '@app/bootcamp-businesslogic';
import { Response } from 'express';
import { DataSource } from 'typeorm';

export abstract class IControllerFactory<T extends IRequestMessage> {
  protected _data: DataSource;
  protected _res: Response;

  constructor(dataSource: DataSource, res: Response) {
    this._data = dataSource;
    this._res = res;
  }
  public abstract create(): T;
}
