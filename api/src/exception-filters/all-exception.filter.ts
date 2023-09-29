import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  private readonly logger = new Logger('EXCEPTION_FILTER');

  catch(exception, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      status: httpStatus,
      message: exception?.message || 'Internal server error',
    };

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      responseBody.message = res.message;
    }

    this.logger.error(exception);
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
