import { AppException } from '../types/passfort.app_exception.types';
import { ErrorResponse, IntegrationError } from '../types/passfort.error_response.types';

export const handleAppException = (exception: AppException): {statusCode: number, errorResponse: ErrorResponse} => {
    const errors: IntegrationError[] = [{
      type: exception.passfortErrorCode,
      message: exception.message,
    }];
    const warnings = [];
  
    return {
      statusCode: exception.statusCode,
      errorResponse: new ErrorResponse(errors, warnings),
    };
  }