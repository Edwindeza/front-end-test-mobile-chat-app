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
  },
  dark: {
    text: '#F2F2F7',
    background: '#000000',
    tint: tintColorDark,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    tabBarBackground: '#1C1C1E',
    tabBarBorder: '#2C2C2E',
    border: '#2C2C2E',
    searchInputBg: '#2C2C2E',
    messageBubbleBg: '#3A3A3C', 
    disabledButtonBg: 'rgb(17, 24, 39)',
  },
};
