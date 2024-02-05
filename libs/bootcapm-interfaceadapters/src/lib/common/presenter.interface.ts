import { IResponseMessage } from '@app/bootcamp-businesslogic';
import { IViewModel } from './view-model.interface';

export interface IPresenter {
  handle(response: IResponseMessage): IViewModel;
}
