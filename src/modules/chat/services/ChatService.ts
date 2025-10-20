import { db } from '@/shared/database/db';
import { chats, chatParticipants, messages } from '@/shared/database/schema';
import { eq, inArray, desc, and, ne } from 'drizzle-orm';
import { Chat, Message } from '@/modules/chat/types/chat.type';
import { AppError } from '@/shared/errors/AppError';

export class ChatService {
  static async getUserChats(currentUserId: string): Promise<Chat[]> {
    try {
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
          text: message.text || undefined,
          timestamp: message.timestamp,
          status: message.status as any,
          media: message.media ? JSON.parse(message.media) : undefined,
        });
      }
    });

    const loadedChats: Chat[] = Array.from(chatMap.entries()).map(([chatId, data]) => {
      const participantIds = Array.from(data.participants) as string[];
      const chatMessages = data.messages;

      const lastMessage = chatMessages.length > 0
        ? chatMessages[0]
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
  } catch (error) {
    console.timeEnd('ChatService.getUserChats');
    throw new AppError(
      'Failed to load chats',
      'database',
      'LOAD_CHATS_ERROR',
      error
    );
  }
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


  static async sendMessage(chatId: string, text: string, senderId: string, media?: {
    id: string;
    type: 'image' | 'video' | 'audio' | 'document';
    uri: string;
    name: string;
    size: number;
    mimeType: string;
    thumbnailUri?: string;
  }): Promise<Message> {
    const messageId = `msg${Date.now()}`;
    const timestamp = Date.now();
    
    await db.insert(messages).values({
      id: messageId,
      chatId: chatId,
      senderId: senderId,
      text: text || null,
      timestamp: timestamp,
      status: 'sent',
      media: media ? JSON.stringify(media) : null,
    });
    
    return {
      id: messageId,
      senderId,
      text: text || undefined,
      timestamp,
      status: 'sent',
      media,
    };
  }

  static async markMessagesAsRead(chatId: string, currentUserId: string): Promise<void> {
    await db.update(messages)
      .set({ status: 'read' })
      .where(
        and(
          eq(messages.chatId, chatId),
          ne(messages.senderId, currentUserId)
        )
      );
  }

  static async markMessageAsRead(messageId: string): Promise<void> {
    await db.update(messages)
      .set({ status: 'read' })
      .where(eq(messages.id, messageId));
  }

  static async deleteMessage(messageId: string): Promise<void> {
    await db.delete(messages)
      .where(eq(messages.id, messageId));
  }

  static async editMessage(messageId: string, newText: string): Promise<void> {
    await db.update(messages)
      .set({ text: newText })
      .where(eq(messages.id, messageId));
  }
}
