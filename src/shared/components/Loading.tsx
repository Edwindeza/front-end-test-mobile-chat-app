import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/shared/components/ThemedText';
import { ThemedView } from '@/shared/components/ThemedView';
import { useThemeColor } from '@/shared/hooks/useThemeColor';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 'large',
  overlay = false,
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');

  const containerStyle = overlay
    ? [styles.overlayContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]
    : [styles.container, { backgroundColor }];

  return (
    <ThemedView style={containerStyle}>
      <View style={styles.content}>
        <ActivityIndicator size={size} color={tabIconDefault} />
        {message && (
          <ThemedText style={[styles.message, { color: textColor }]}>
            {message}
          </ThemedText>
        )}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});
