export type ErrorType = 'network' | 'permission' | 'validation' | 'database' | 'unknown';

export type ErrorInfo = {
  type: ErrorType;
  message: string;
  code?: string;
  details?: any;
  timestamp: number;
};

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly code?: string;
  public readonly details?: any;
  public readonly timestamp: number;

  constructor(
    message: string,
    type: ErrorType = 'unknown',
    code?: string,
    details?: any
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();
  }

  toErrorInfo(): ErrorInfo {
    return {
      type: this.type,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
    };
  }
}
