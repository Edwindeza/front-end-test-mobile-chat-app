import { AppError, ErrorType, ErrorInfo } from './AppError';

export class ErrorHandler {
  private static errorLog: ErrorInfo[] = [];
  private static maxLogSize = 100;

  static handle(error: unknown, context?: string): AppError {
    let appError: AppError;

    if (error instanceof AppError) {
      appError = error;
    } else if (error instanceof Error) {
      appError = this.createAppErrorFromError(error);
    } else {
      appError = new AppError(
        'An unknown error occurred',
        'unknown',
        'UNKNOWN_ERROR',
        error
      );
    }

    this.logError(appError, context);
    return appError;
  }

  private static createAppErrorFromError(error: Error): AppError {
    const message = error.message.toLowerCase();

    if (message.includes('network') || message.includes('fetch')) {
      return new AppError(error.message, 'network', 'NETWORK_ERROR');
    }

    if (message.includes('permission') || message.includes('denied')) {
      return new AppError(error.message, 'permission', 'PERMISSION_ERROR');
    }

    if (message.includes('validation') || message.includes('invalid')) {
      return new AppError(error.message, 'validation', 'VALIDATION_ERROR');
    }

    if (message.includes('database') || message.includes('sql')) {
      return new AppError(error.message, 'database', 'DATABASE_ERROR');
    }

    return new AppError(error.message, 'unknown', 'UNKNOWN_ERROR');
  }

  private static logError(error: AppError, context?: string): void {
    const errorInfo = error.toErrorInfo();

    this.errorLog.push({
      ...errorInfo,
      details: {
        ...errorInfo.details,
        context,
        stack: error.stack,
      },
    });

    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }

    console.error(`[${context || 'App'}] ${error.message}`, error);
  }

  static getErrorLog(): ErrorInfo[] {
    return [...this.errorLog];
  }

  static clearErrorLog(): void {
    this.errorLog = [];
  }

  static getUserFriendlyMessage(error: AppError): string {
    switch (error.type) {
      case 'network':
        return 'Connection problem. Please check your internet connection.';
      case 'permission':
        return 'Permission required. Please allow access in settings.';
      case 'validation':
        return 'Invalid data. Please check your input.';
      case 'database':
        return 'Data error. Please try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
