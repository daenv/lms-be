import {
  BadGatewayException,
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
const ERROR_MSG_DUPLICATE_EMAIL =
  'type: validation; property: email; reson: duplicate';
@Injectable()
export class AccountsErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.name === 'QueryFailedError') {
          if (err.name === 'QueryFailedError') {
            if (
              /^duplicate key value violates unique constraint/.test(
                err.message,
              )
            ) {
              return throwError(
                new BadRequestException(ERROR_MSG_DUPLICATE_EMAIL),
              );
            } else if (/violates foreign key constraint/.test(err.message)) {
              return throwError(new BadRequestException(err.message));
            } else {
              return throwError(new BadGatewayException(err));
            }
          } else {
            return throwError(new BadGatewayException(err));
          }
        }
      }),
    );
  }
}
