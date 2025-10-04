
import { put, del } from '@vercel/blob';

/**
 * Upload file to Vercel Blob
 * @param file - File or Buffer to upload
 * @param userId - User ID for organizing files
 * @param filename - Original filename
 * @returns Public URL of uploaded file
 */
export async function uploadToBlob(
  file: File | Buffer,
  userId: string,
  filename: string
): Promise<{ url: string; pathname: string }> {
  try {
    // Create organized path: thumbnails/userId/timestamp-filename
    const timestamp = Date.now();
    const pathname = `thumbnails/${userId}/${timestamp}-${filename}`;

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: false, // We're adding timestamp ourselves
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
    };
  } catch (error) {
    console.error('Blob upload failed:', error);
    throw new Error('Failed to upload image to storage');
  }
}

/**
 * Upload processed thumbnail to Blob
 * @param dataUrl - Canvas data URL (base64)
 * @param userId - User ID
 * @param originalFilename - Original filename for reference
 * @returns Public URL of uploaded thumbnail
 */
export async function uploadThumbnailToBlob(
  dataUrl: string,
  userId: string,
  originalFilename: string
): Promise<{ url: string; pathname: string; size: number }> {
  try {
    // Convert data URL to buffer
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Create filename
    const timestamp = Date.now();
    const cleanFilename = originalFilename.replace(/\.[^/.]+$/, ''); // Remove extension
    const pathname = `thumbnails/${userId}/processed-${timestamp}-${cleanFilename}.png`;

    const blob = await put(pathname, buffer, {
      access: 'public',
      contentType: 'image/png',
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
      size: buffer.length,
    };
  } catch (error) {
    console.error('Thumbnail upload failed:', error);
    throw new Error('Failed to upload thumbnail');
  }
}

/**
 * Delete file from Vercel Blob
 * @param url - Full URL of the blob to delete
 */
export async function deleteFromBlob(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Blob deletion failed:', error);
    throw new Error('Failed to delete image');
  }
}