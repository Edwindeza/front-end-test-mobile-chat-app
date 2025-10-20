import * as FileSystem from 'expo-file-system';

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
}
