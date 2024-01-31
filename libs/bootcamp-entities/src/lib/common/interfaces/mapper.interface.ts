import { Observable, from, of } from 'rxjs';

export abstract class Mapper<E, T> {
  abstract mapFrom(source: E): T;

  public observable(source: E | Array<E>): Observable<T> {
    if (source instanceof Array) {
      return from(source.map(this.mapFrom));
    } else {
      return of(this.mapFrom(source));
    }
  }
}
