import { IProject } from '@/app/(page)/types/IProject';

/**
 * Get the image asset ID from a project for NextImage component
 */
export function getImageAssetId(project: IProject): string {
  return project.mediaGallery?.mediaItems?.[0]?.asset?._id || '';
}

/**
 * Get the image URL from a project for preloading
 */
export function getImageUrl(project: IProject): string {
  const firstMediaItem = project.mediaGallery?.mediaItems?.[0];
  if (!firstMediaItem?.asset) return '';

  // Mux video thumbnail
  if (firstMediaItem.asset.playbackId) {
    return `https://image.mux.com/${firstMediaItem.asset.playbackId}/thumbnail.jpg?width=800&height=1000&fit_mode=smartcrop&time=0`;
  }

  // Sanity image
  return firstMediaItem.asset.url || '';
}

/**
 * Get the background color hex from a project
 */
export function getBackgroundColor(project: IProject): string {
  return project.mediaBackgroundColor?.hex || '#000000';
}
