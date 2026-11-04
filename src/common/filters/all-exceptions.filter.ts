
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { STATUS_CODES } from 'node:http';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
    ) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const isHttpException = exception instanceof HttpException;

        const statusCode = isHttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const reason =
            STATUS_CODES[statusCode] ?? 'Unknown Error';

        let message: string | string[] = reason;

        if (isHttpException && statusCode < 500) {
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (
                exceptionResponse !== null &&
                typeof exceptionResponse === 'object' &&
                'message' in exceptionResponse
            ) {
                const value = exceptionResponse.message;

                if (
                    typeof value === 'string' ||
                    (Array.isArray(value) &&
                        value.every((item) => typeof item === 'string'))
                ) {
                    message = value;
                }
            }
        }

        if (statusCode >= 500) {
            message = 'Internal server error';

            this.logger.error(
                'An internal server error occurred',
                exception instanceof Error
                    ? exception.stack
                    : String(exception),
            );
        }

        const path = httpAdapter.getRequestUrl(request);

        const responseBody = {
            success: false,
            statusCode,
            message,
            error: reason,
            path,
            timestamp: new Date().toISOString(),
        };

        httpAdapter.reply(response, responseBody, statusCode);
    }
}
