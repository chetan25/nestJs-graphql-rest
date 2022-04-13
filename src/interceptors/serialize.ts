import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ClassConstructor {
  new (...args: any[]): {};
}

export class SerializeInterceptor implements NestInterceptor {
  // since we want to make it dynamic
  constructor(private dto: ClassConstructor) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // this runs before the handler is executed
    console.log('Before Handler');

    return next.handle().pipe(
      map((data: any) => {
        // this runs after the handler has executed
        // data is anything that the handler returns
        console.log('After hanlder');

        // now we will sanitize the result with the DTO passed

        return plainToInstance(this.dto, data, {
          // makes sure only the expose property is included
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
