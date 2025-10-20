import { create } from 'zustand';
import { MediaFile, MediaMessage } from '../types/media.type';

interface MediaState {
  mediaFiles: MediaFile[];
  uploadingMedia: string[];
  
  addMediaFile: (media: MediaFile) => void;
  removeMediaFile: (mediaId: string) => void;
  updateMediaStatus: (mediaId: string, status: 'uploading' | 'uploaded' | 'failed') => void;
  setUploading: (mediaId: string, isUploading: boolean) => void;
  clearMediaFiles: () => void;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  mediaFiles: [],
  uploadingMedia: [],

  addMediaFile: (media: MediaFile) => {
    set(state => ({
      mediaFiles: [...state.mediaFiles, media],
    }));
  },

  removeMediaFile: (mediaId: string) => {
    set(state => ({
      mediaFiles: state.mediaFiles.filter(media => media.id !== mediaId),
      uploadingMedia: state.uploadingMedia.filter(id => id !== mediaId),
    }));
  },

  updateMediaStatus: (mediaId: string, status: 'uploading' | 'uploaded' | 'failed') => {
    set(state => ({
      mediaFiles: state.mediaFiles.map(media =>
        media.id === mediaId ? { ...media, status } : media
      ),
    }));
  },

  setUploading: (mediaId: string, isUploading: boolean) => {
    set(state => ({
      uploadingMedia: isUploading
        ? [...state.uploadingMedia, mediaId]
        : state.uploadingMedia.filter(id => id !== mediaId),
    }));
  },

  clearMediaFiles: () => {
    set({
      mediaFiles: [],
      uploadingMedia: [],
    });
  },
}));
