export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  status: MessageStatus;
};

export type Chat = {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
};

export type ChatSummary = {
  id: string;
  participants: string[];
  lastMessage?: Message;
};