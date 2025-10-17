import { Platform } from 'react-native';
import { Colors } from '../constants/Colors';

export const createTabBarStyles = (colorScheme: 'light' | 'dark' | null) => {
  const colors = Colors[colorScheme ?? 'light'];

  return {
    tabBarStyle: {
      backgroundColor: colors.tabBarBackground,
      borderTopWidth: 1,
      borderTopColor: colors.tabBarBorder,
      ...Platform.select({
        ios: {
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
          position: "absolute" as const,
        },
        android: {
          height: 54,
        },
      }),
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600' as const,
    },
  };
};

export const getTabBarColors = (colorScheme: 'light' | 'dark' | null) => {
  const colors = Colors[colorScheme ?? 'light'];

  return {
    activeTintColor: colors.tabIconSelected,
    inactiveTintColor: colors.tabIconDefault,
  };
};