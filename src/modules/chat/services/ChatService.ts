import { db } from '@/shared/database/db';
import { chats, chatParticipants, messages } from '@/shared/database/schema';
import { eq, inArray, desc } from 'drizzle-orm';
import { Chat, Message } from '@/modules/chat/types/chat.type';

export class ChatService {
  static async getUserChats(currentUserId: string): Promise<Chat[]> {
    console.time('ChatService.getUserChats');

    const userChats = await db
      .select({ chatId: chatParticipants.chatId })
      .from(chatParticipants)
      .where(eq(chatParticipants.userId, currentUserId));

    const chatIds = userChats.map(row => row.chatId);

    if (chatIds.length === 0) {
      console.timeEnd('ChatService.getUserChats');
      return [];
    }

    const allParticipants = await db
      .select({
        chatId: chatParticipants.chatId,
        participantId: chatParticipants.userId,
      })
      .from(chatParticipants)
      .where(inArray(chatParticipants.chatId, chatIds));

    const messageData = await db
      .select()
      .from(messages)
      .where(inArray(messages.chatId, chatIds))
      .orderBy(desc(messages.timestamp));

    console.timeEnd('ChatService.getUserChats');

    const chatMap = new Map<string, {
      participants: Set<string>;
      messages: Message[];
    }>();

    allParticipants.forEach(row => {
      if (!chatMap.has(row.chatId)) {
        chatMap.set(row.chatId, {
          participants: new Set(),
          messages: [],
        });
      }

      const chat = chatMap.get(row.chatId)!;
      chat.participants.add(row.participantId);
    });

    messageData.forEach(message => {
      if (chatMap.has(message.chatId)) {
        const chat = chatMap.get(message.chatId)!;
        chat.messages.push({
          id: message.id,
          senderId: message.senderId,
          text: message.text,
          timestamp: message.timestamp,
        });
      }
    });

    const loadedChats: Chat[] = Array.from(chatMap.entries()).map(([chatId, data]) => {
      const participantIds = Array.from(data.participants) as string[];
      const chatMessages = data.messages;

      const lastMessage = chatMessages.length > 0
        ? chatMessages[chatMessages.length - 1]
        : undefined;

      return {
        id: chatId,
        participants: participantIds,
        messages: chatMessages,
        lastMessage,
      };
    });

    console.log(`ChatService: Loaded ${loadedChats.length} chats`);
    return loadedChats;
  }

  static async createChat(participantIds: string[]): Promise<Chat> {
    const chatId = `chat${Date.now()}`;

    await db.insert(chats).values({
      id: chatId,
    });

    for (const userId of participantIds) {
      await db.insert(chatParticipants).values({
        id: `cp-${chatId}-${userId}`,
        chatId: chatId,
        userId: userId,
      });
    }

    return {
      id: chatId,
      participants: participantIds,
      messages: [],
    };
  }


  static async sendMessage(chatId: string, text: string, senderId: string): Promise<Message> {
    const messageId = `msg${Date.now()}`;
    const timestamp = Date.now();
    
    await db.insert(messages).values({
      id: messageId,
      chatId: chatId,
      senderId: senderId,
      text: text,
      timestamp: timestamp,
    });
    
    return {
      id: messageId,
      senderId,
      text,
      timestamp,
    };
  }
}
