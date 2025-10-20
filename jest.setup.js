import 'react-native-gesture-handler/jestSetup';

// Mock expo modules
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
  setOptions: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSegments: () => ['login'],
  Stack: ({ children }) => children,
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true, null],
}));

jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn(),
    readTransaction: jest.fn(),
  })),
  openDatabaseSync: jest.fn(() => ({
    run: jest.fn(),
    get: jest.fn(),
    all: jest.fn(),
    exec: jest.fn(),
  })),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('drizzle-orm', () => ({
  drizzle: jest.fn(() => ({
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  })),
}));

jest.mock('expo-drizzle-studio-plugin', () => ({}), { virtual: true });
