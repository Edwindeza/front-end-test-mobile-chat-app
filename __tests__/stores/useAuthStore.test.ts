import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useUserStore } from '@/modules/user/store/useUserStore';
import { useChatStore } from '@/modules/chat/store/useChatStore';
import { User } from '@/modules/user/types/user.type';

jest.mock('@/modules/user/store/useUserStore');
jest.mock('@/modules/chat/store/useChatStore');

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.getState().logout();
  });

  it('should have correct initial state', () => {
    const state = useAuthStore.getState();
    
    expect(state.currentUser).toBeNull();
    expect(state.isLoggedIn).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should login successfully with valid user', async () => {
    const mockUser: User = {
      id: '1',
      name: 'Test User',
      avatar: 'avatar1.png',
      status: 'online',
    };

    const mockUsers = [mockUser];
    const mockLoadChats = jest.fn().mockResolvedValue(undefined);
    const mockSetCurrentUser = jest.fn();

    (useUserStore.getState as jest.Mock).mockReturnValue({
      users: mockUsers,
      setCurrentUser: mockSetCurrentUser,
    });

    (useChatStore.getState as jest.Mock).mockReturnValue({
      loadChats: mockLoadChats,
    });

    const { login } = useAuthStore.getState();
    const result = await login('1');

    expect(result).toBe(true);
    expect(mockSetCurrentUser).toHaveBeenCalledWith(mockUser);
    expect(mockLoadChats).toHaveBeenCalledWith('1');
    
    const state = useAuthStore.getState();
    expect(state.currentUser).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
  });
});