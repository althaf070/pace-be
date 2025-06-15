import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.url;

    // Get controller name & handler name for context
    const handler = context.getHandler().name; // method name in controller
    // const controller = context.getClass().name; // class name (e.g., AuthController)

    // Smart default message based on method
    let defaultMessage = 'OK';
    switch (method) {
      case 'GET':
        defaultMessage = 'Fetched successfully';
        break;
      case 'POST':
        defaultMessage = 'Created successfully';
        break;
      case 'PUT':
      case 'PATCH':
        defaultMessage = 'Updated successfully';
        break;
      case 'DELETE':
        defaultMessage = 'Deleted successfully';
        break;
    }

    return next.handle().pipe(
      map((response) => {
        const hasCustomMessage = response && response.message;
        const hasCustomData = response && response.data;

        return {
          success: true,
          message: hasCustomMessage ? response.message : defaultMessage,

          handler, // e.g., 'login'
          path, // e.g., '/auth/login'
          data: hasCustomData ? response.data : response,
        };
      }),
    );
  }
}
