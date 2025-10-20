/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = 'rgb(17, 24, 39)';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    tabBarBackground: '#FFFFFF',
    tabBarBorder: '#E1E1E1',
    border: '#E1E1E1',
    disabledButtonBg: 'red',
    placeholderTextColor: '#8E8E93',
    headerIcon: '#007AFF',
    messageBubbleBg: '#F2F2F7',
    searchInputBg: '#F2F2F7',
    buttonBg: '#007aff',
    danger: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    info: '#007AFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
    borderLight: '#E5E5E7'
  },
  dark: {
    text: '#F2F2F7',
    background: 'rgb(17, 24, 39)',
    tint: tintColorDark,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    tabBarBackground: '#1C1C1E',
    tabBarBorder: '#2C2C2E',
    border: '#2C2C2E',
    searchInputBg: '#1C1C1E',
    messageBubbleBg: '#2C2C2E',
    disabledButtonBg: 'rgb(17, 24, 39)',
    placeholderTextColor: '#8E8E93',
    headerIcon: '#FFFFFF',
    buttonBg: '#007aff',
    danger: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    info: '#007AFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
    borderLight: '#2C2C2E'
  },
};
