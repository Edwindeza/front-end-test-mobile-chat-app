import React, { Component, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/shared/components/ThemedText';
import { ThemedView } from '@/shared/components/ThemedView';
import { IconSymbol } from '@/shared/components/IconSymbol';
import { useThemeColor } from '@/shared/hooks/useThemeColor';
import { AppError, ErrorHandler } from '@/shared/errors';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: AppError;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const appError = ErrorHandler.handle(error, 'ErrorBoundary');
    return {
      hasError: true,
      error: appError,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    ErrorHandler.handle(error, 'ErrorBoundary', {
      ...errorInfo,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error }: { error?: AppError }) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const dangerColor = useThemeColor({}, 'danger');

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.iconContainer, { borderColor }]}>
        <IconSymbol name="exclamationmark.triangle" size={48} color={dangerColor} />
      </View>
      
      <ThemedText style={[styles.title, { color: textColor }]}>
        Something went wrong
      </ThemedText>
      
      <ThemedText style={[styles.message, { color: textColor }]}>
        {error ? ErrorHandler.getUserFriendlyMessage(error) : 'An unexpected error occurred'}
      </ThemedText>
      
      <ThemedText style={[styles.hint, { color: textColor }]}>
        Please restart the app or contact support if the problem persists
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
});
