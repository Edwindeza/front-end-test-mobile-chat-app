import { db } from './db';
import { users, chats, chatParticipants, messages } from './schema';

// Mock user data from the original useUser hook
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online' as const,
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'offline' as const,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'away' as const,
  },
  {
    id: '4',
    name: 'Sarah Williams',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'online' as const,
  },
];

// Initial chat data (similar to useChats)
const initialChats = [
  {
    id: 'chat1',
    participants: ['1', '2'],
    messages: [
      {
        id: 'msg1',
        senderId: '2',
        text: 'Hey, how are you?',
        timestamp: Date.now() - 3600000,
        status: 'read',

      },
      {
        id: 'msg2',
        senderId: '1',
        text: 'I\'m good, thanks for asking!',
        timestamp: Date.now() - 1800000,
        status: 'delivered' as const,
      },
      {
        id: 'msg3',
        senderId: '1',
        text: 'I\'m good, thanks for asking!',
        timestamp: Date.now() - 1800000,
        status: 'read',
      },
      {
        id: 'msg4',
        senderId: '1',
        text: 'I\'m good, thanks for asking!',
        timestamp: Date.now() - 1800000,
        status: 'read',
      },
      {
        id: 'msg5',
        senderId: '1',
        text: 'I\'m good, thanks for asking!',
        timestamp: Date.now() - 1800000,
        status: 'read',
      },
      {
        id: 'msg6',
        senderId: '2',
        text: 'I\'m not good, thanks for asking!',
        timestamp: Date.now() - 1800000,
        status: 'read',
      },
      {
        id: 'msg7',
        senderId: '2',
        text: 'I\'m not good, thanks for asking!',
        timestamp: Date.now() - 1800000,
        status: 'read',
      },
      {
        id: 'msg8',
        senderId: '1',
        text: 'I\'m not good, thanks for asking!',
        timestamp: Date.now() - 1800000,
        status: 'read',
      },
      {
        id: 'msg9',
        senderId: '2',
        text: 'What\'s wrong?',
        timestamp: Date.now() - 1700000,
        status: 'read',
      },
      {
        id: 'msg10',
        senderId: '1',
        text: 'Just having a rough day at work',
        timestamp: Date.now() - 1600000,
        status: 'read',
      },
      {
        id: 'msg11',
        senderId: '2',
        text: 'I understand, work can be stressful',
        timestamp: Date.now() - 1500000,
        status: 'read',
      },
      {
        id: 'msg12',
        senderId: '1',
        text: 'Yeah, my boss is being unreasonable',
        timestamp: Date.now() - 1400000,
        status: 'read',
      },
      {
        id: 'msg13',
        senderId: '2',
        text: 'That sounds frustrating',
        timestamp: Date.now() - 1300000,
        status: 'read',
      },
      {
        id: 'msg14',
        senderId: '1',
        text: 'It really is. I might need to look for another job',
        timestamp: Date.now() - 1200000,
        status: 'read',
      },
      {
        id: 'msg15',
        senderId: '2',
        text: 'That might be a good idea if it\'s affecting your wellbeing',
        timestamp: Date.now() - 1100000,
        status: 'read',
      },
      {
        id: 'msg16',
        senderId: '1',
        text: 'You\'re right, life\'s too short for toxic work environments',
        timestamp: Date.now() - 1000000,
        status: 'read',
      },
      {
        id: 'msg17',
        senderId: '2',
        text: 'Exactly! Your mental health comes first',
        timestamp: Date.now() - 900000,
        status: 'read',
      },
      {
        id: 'msg18',
        senderId: '1',
        text: 'Thanks for listening, it really helps to talk about it',
        timestamp: Date.now() - 800000,
        status: 'read',
      },
      {
        id: 'msg19',
        senderId: '2',
        text: 'Of course! That\'s what friends are for',
        timestamp: Date.now() - 700000,
        status: 'read',
      },
      {
        id: 'msg20',
        senderId: '1',
        text: 'I appreciate you so much',
        timestamp: Date.now() - 600000,
        status: 'read',
      },
      {
        id: 'msg21',
        senderId: '2',
        text: 'Anytime! Want to grab coffee this weekend?',
        timestamp: Date.now() - 500000,
        status: 'read',
      },
      {
        id: 'msg22',
        senderId: '1',
        text: 'That sounds perfect! Saturday morning?',
        timestamp: Date.now() - 400000,
        status: 'read',
      },
      {
        id: 'msg23',
        senderId: '2',
        text: 'Yes! 10 AM at the usual place?',
        timestamp: Date.now() - 300000,
        status: 'read',
      },
      {
        id: 'msg24',
        senderId: '1',
        text: 'Perfect! See you then',
        timestamp: Date.now() - 200000,
        status: 'read',
      },
      {
        id: 'msg25',
        senderId: '2',
        text: 'Great! Looking forward to it',
        timestamp: Date.now() - 100000,
        status: 'read',
      },
      {
        id: 'msg26',
        senderId: '1',
        text: 'Me too! Thanks again for everything',
        timestamp: Date.now() - 50000,
        status: 'read',
      },
      {
        id: 'msg27',
        senderId: '2',
        text: 'You\'re welcome! Take care of yourself',
        timestamp: Date.now() - 25000,
        status: 'read',
      },
      {
        id: 'msg28',
        senderId: '1',
        text: 'I will! You too 😊',
        timestamp: Date.now() - 10000,
        status: 'read',
      }
    ],
  },
  {
    id: 'chat2',
    participants: ['1', '3'],
    messages: [
      {
        id: 'msg3',
        senderId: '3',
        text: 'Did you check the project?',
        timestamp: Date.now() - 86400000,
        status: 'read',
      }
    ],
  },
];

// Check if there's any data in the users table
async function isDataSeeded() {
  try {
    const result = await db.select().from(users);
    return result.length > 0;
  } catch (error) {
    console.error('Error checking if database is seeded:', error);
    return false;
  }
}

export async function seedDatabase() {
  try {
    console.log('Seeding database...');
    
    // Insert users
    console.log('Seeding users...');
    for (const user of mockUsers) {
      await db.insert(users).values(user).onConflictDoNothing();
    }
    
    // Insert chats and their relationships
    console.log('Seeding chats...');
    for (const chat of initialChats) {
      // Insert chat
      await db.insert(chats).values({ id: chat.id }).onConflictDoNothing();
      
      // Insert participants
      console.log(`Adding participants for chat ${chat.id}...`);
      for (const userId of chat.participants) {
        await db.insert(chatParticipants).values({
          id: `cp-${chat.id}-${userId}`,
          chatId: chat.id,
          userId,
        }).onConflictDoNothing();
      }
      
      // Insert messages
      console.log(`Adding messages for chat ${chat.id}...`);
      for (const message of chat.messages) {
        await db.insert(messages).values({
          id: message.id,
          chatId: chat.id,
          senderId: message.senderId,
          text: message.text,
          timestamp: message.timestamp,
          status: message.status || 'sent',
        }).onConflictDoNothing();
      }
    }
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
} 