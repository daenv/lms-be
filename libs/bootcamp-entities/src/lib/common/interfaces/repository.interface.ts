export interface IRepository<TIdType, TType> {
  create(entity: Partial<TType>): Promise<TType>;
  getAll(): Promise<TIdType[]>;
  get(id: TIdType): Promise<TType>;
  getByQuery(query: object);
  save(entity: TType): Promise<TType>;
  delete(id: TIdType): Promise<boolean>;
}
