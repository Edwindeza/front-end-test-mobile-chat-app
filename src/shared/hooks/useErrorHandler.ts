import { useState } from 'react';
import { ErrorHandler } from '../errors/ErrorHandler';
import { AppError } from '../errors/AppError';

export function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error: unknown, context?: string) => {
    const appError = ErrorHandler.handle(error, context);
    setError(appError);
    setIsLoading(false);
    return appError;
  };

  const clearError = () => {
    setError(null);
  };

  const executeWithErrorHandling = async <T>(
    operation: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      setIsLoading(true);
      clearError();
      const result = await operation();
      setIsLoading(false);
      return result;
    } catch (error) {
      handleError(error, context);
      return null;
    }
  };

  const getUserFriendlyMessage = (error: AppError) => {
    return ErrorHandler.getUserFriendlyMessage(error);
  };

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeWithErrorHandling,
    getUserFriendlyMessage,
  };
}
