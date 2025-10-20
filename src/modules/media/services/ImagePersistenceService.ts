import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export class ImagePersistenceService {
  private static readonly PERMANENT_DIR = `${FileSystem.documentDirectory}chat_images/`;

  static async ensureDirectoryExists(): Promise<void> {
    const dirInfo = await FileSystem.getInfoAsync(this.PERMANENT_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(this.PERMANENT_DIR, { intermediates: true });
    }
  }

  static async saveImagePermanently(temporaryUri: string): Promise<string> {
    await this.ensureDirectoryExists();
    
    const fileName = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
    const permanentUri = `${this.PERMANENT_DIR}${fileName}`;
    
    await FileSystem.copyAsync({
      from: temporaryUri,
      to: permanentUri,
    });
    
    return permanentUri;
  }

  static async deleteImage(uri: string): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(uri);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  static async cleanupOldImages(): Promise<void> {
    try {
      await this.ensureDirectoryExists();
      const files = await FileSystem.readDirectoryAsync(this.PERMANENT_DIR);
      
      const now = Date.now();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
      
      for (const file of files) {
        const filePath = `${this.PERMANENT_DIR}${file}`;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        
        if (fileInfo.exists && fileInfo.modificationTime) {
          const fileAge = now - (fileInfo.modificationTime * 1000);
          if (fileAge > maxAge) {
            await FileSystem.deleteAsync(filePath);
          }
        }
      }
    } catch (error) {
      console.error('Error cleaning up old images:', error);
    }
  }
}
