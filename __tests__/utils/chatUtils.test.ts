import { formatChatTime, getChatName } from '../../src/shared/utils/chatUtils';
import { formatTime } from '../../src/shared/utils/timeUtils';
import type { User } from '@/shared/types';

describe('chatUtils', () => {
  describe('formatChatTime', () => {
    it('should format time for today', () => {
      const now = new Date();
      const today = new Date(now.getTime());

      const result = formatChatTime(today.getTime());
      
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('should format time for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const result = formatChatTime(yesterday.getTime());
      
      expect(result).toBe('Yesterday');
    });

    it('should format time for this week', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      
      const result = formatChatTime(threeDaysAgo.getTime());
      
      expect(result).toMatch(/^(lun|mar|mié|jue|vie|sáb|dom)$/);
    });

    it('should format time for older dates', () => {
      const oldDate = new Date('2023-01-15');
      
      const result = formatChatTime(oldDate.getTime());
      
      expect(result).toMatch(/^\d{1,2} (ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)$/);
    });
  });

  describe('getChatName', () => {
    const mockUsers: User[] = [
      { id: '1', name: 'Alice', avatar: 'avatar1.png', status: 'online' },
      { id: '2', name: 'Bob', avatar: 'avatar2.png', status: 'online' },
      { id: '3', name: 'Charlie', avatar: 'avatar3.png', status: 'online' },
    ];

    it('should return "No participants" when no other participants', () => {
      const result = getChatName([mockUsers[0]], '1');
      expect(result).toBe('No participants');
    });

    it('should return participant name for single participant', () => {
      const result = getChatName([mockUsers[0], mockUsers[1]], '1');
      expect(result).toBe('Bob');
    });

    it('should return formatted name for two participants', () => {
      const result = getChatName([mockUsers[0], mockUsers[1], mockUsers[2]], '1');
      expect(result).toBe('Bob & 1 other');
    });

    it('should return formatted name for multiple participants', () => {
      const result = getChatName([mockUsers[0], mockUsers[1], mockUsers[2]], '1');
      expect(result).toBe('Bob & 1 other');
    });

    it('should handle empty participants array', () => {
      const result = getChatName([], '1');
      expect(result).toBe('No participants');
    });
  });
});

describe('timeUtils', () => {
  describe('formatTime', () => {
    it('should format timestamp to HH:MM format', () => {
      const timestamp = new Date('2023-01-15T14:30:00').getTime();
      
      const result = formatTime(timestamp);
      
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('should handle different times correctly', () => {
      const morning = new Date('2023-01-15T09:05:00').getTime();
      const afternoon = new Date('2023-01-15T15:45:00').getTime();
      const evening = new Date('2023-01-15T23:59:00').getTime();
      
      expect(formatTime(morning)).toMatch(/^\d{2}:\d{2}$/);
      expect(formatTime(afternoon)).toMatch(/^\d{2}:\d{2}$/);
      expect(formatTime(evening)).toMatch(/^\d{2}:\d{2}$/);
    });

    it('should handle edge cases', () => {
      const midnight = new Date('2023-01-15T00:00:00').getTime();
      const noon = new Date('2023-01-15T12:00:00').getTime();
      
      expect(formatTime(midnight)).toMatch(/^\d{2}:\d{2}$/);
      expect(formatTime(noon)).toMatch(/^\d{2}:\d{2}$/);
    });
  });
});
