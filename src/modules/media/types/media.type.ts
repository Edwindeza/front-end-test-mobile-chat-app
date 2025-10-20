export type MediaType = 'image' | 'video' | 'audio' | 'document';

export type MediaStatus = 'uploading' | 'uploaded' | 'failed';

export type MediaFile = {
  id: string;
  type: MediaType;
  uri: string;
  name: string;
  size: number;
  mimeType: string;
  status: MediaStatus;
  thumbnailUri?: string;
  duration?: number;
};

export type MediaMessage = {
  id: string;
  chatId: string;
  senderId: string;
  text?: string;
  media: MediaFile;
  timestamp: number;
  status: MediaStatus;
};
