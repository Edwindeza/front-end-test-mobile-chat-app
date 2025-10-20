import { MediaFile, MediaType } from '../types/media.type';

export class MediaService {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024;

  static async createMediaFile(uri: string): Promise<MediaFile> {
    try {
      const fileInfo = await this.getFileInfo(uri);
      const mediaId = `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const optimizedSize = Math.min(fileInfo.size, 500 * 1024);

      return {
        id: mediaId,
        type: fileInfo.type,
        uri: uri,
        name: fileInfo.name,
        size: optimizedSize,
        mimeType: fileInfo.mimeType,
        status: 'uploaded',
        thumbnailUri: uri,
      };
    } catch (error) {
      console.error('Error creating media file:', error);
      throw new Error('Failed to create media file');
    }
  }

  static async getFileInfo(uri: string): Promise<{
    name: string;
    size: number;
    mimeType: string;
    type: MediaType;
  }> {
    try {
      const filename = uri.split('/').pop() || 'unknown';

      const extension = filename.split('.').pop()?.toLowerCase() || '';
      const mimeType = this.getMimeType(extension);
      const type = this.getMediaType(mimeType);

      const estimatedSize = this.estimateFileSize(type);

      return {
        name: filename,
        size: estimatedSize,
        mimeType,
        type,
      };
    } catch (error) {
      console.error('Error getting file info:', error);
      throw new Error('Failed to get file info');
    }
  }

  private static estimateFileSize(type: MediaType): number {
    switch (type) {
      case 'image':
        return 500 * 1024;
      case 'video':
        return 5 * 1024 * 1024;
      case 'audio':
        return 2 * 1024 * 1024;
      case 'document':
        return 1 * 1024 * 1024;
      default:
        return 100 * 1024;
    }
  }

  private static getMimeType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',

      mp4: 'video/mp4',
      mov: 'video/quicktime',
      avi: 'video/x-msvideo',

      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      aac: 'audio/aac',

      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      txt: 'text/plain',
    };

    return mimeTypes[extension] || 'application/octet-stream';
  }

  private static getMediaType(mimeType: string): MediaType {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  }
}
