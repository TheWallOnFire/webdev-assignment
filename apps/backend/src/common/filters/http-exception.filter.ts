import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status = 
      exception instanceof HttpException 
        ? exception.getStatus() 
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = 
      exception instanceof HttpException 
        ? exception.getResponse() 
        : { message: 'Internal server error' };

    const message = 
      typeof errorResponse === 'string' 
        ? errorResponse 
        : (typeof errorResponse === 'object' && errorResponse !== null && 'message' in errorResponse)
          ? (errorResponse as Record<string, unknown>).message || 'Internal server error'
          : 'Internal server error';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`[${request.method}] ${request.url} - ${exception instanceof Error ? exception.message : String(exception)}`, exception instanceof Error ? exception.stack : '');
    } else {
      this.logger.warn(`[${request.method}] ${request.url} - Status: ${status} - Message: ${JSON.stringify(message)}`);
    }

    response.status(status).json({
      status: 'error',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: Array.isArray(message) ? message[0] : message,
    });
  }
}
