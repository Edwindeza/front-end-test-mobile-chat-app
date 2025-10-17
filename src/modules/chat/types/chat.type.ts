
export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}