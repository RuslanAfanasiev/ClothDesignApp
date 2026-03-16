import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor<T> implements NestInterceptor<T, {
    data: T;
}> {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<{
        data: T;
    }>;
}
