/**
 * Utility functions for handling image URLs, including Google Drive compatibility
 */

/**
 * Convert Google Drive sharing URL to direct image URL
 * @param url - The Google Drive sharing URL
 * @returns Direct image URL that can be used in img src
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;
  
  console.log('Converting URL:', url); // Debug log
  
  // Check if it's a Google Drive URL - support multiple formats
  const driveRegex1 = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_\-\.]+)(?:\/view)?(?:\?[^\/]*)?/;
  const driveRegex2 = /https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_\-\.]+)/;
  const driveRegex3 = /https:\/\/drive\.google\.com\/uc\?id=([a-zA-Z0-9_\-\.]+)/;
  
  let match = url.match(driveRegex1);
  if (!match) {
    match = url.match(driveRegex2);
  }
  if (!match) {
    match = url.match(driveRegex3);
  }
  
  if (match) {
    const fileId = match[1];
    const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    console.log('Converted to:', convertedUrl); // Debug log
    return convertedUrl;
  }
  
  console.log('Not a Google Drive URL, returning as is'); // Debug log
  // If it's not a Google Drive URL, return as is
  return url;
}

/**
 * Get optimized image URL for display
 * @param url - Original image URL
 * @param fallbackUrl - Fallback URL if original fails
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(url?: string, fallbackUrl?: string): string {
  if (!url) return fallbackUrl || '';
  
  // Convert Google Drive URLs
  const optimizedUrl = convertGoogleDriveUrl(url);
  
  return optimizedUrl || fallbackUrl || '';
}

/**
 * Validate if URL is a valid image URL format
 * @param url - URL to validate
 * @returns boolean indicating if URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  // Check for common image extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
  
  // Check for Google Drive URLs
  const driveRegex1 = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_\-\.]+)(?:\/view)?(?:\?[^\/]*)?/;
  const driveRegex2 = /https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_\-\.]+)/;
  const driveRegex3 = /https:\/\/drive\.google\.com\/uc\?id=([a-zA-Z0-9_\-\.]+)/;
  
  // Check for other valid URLs
  const urlRegex = /^https?:\/\/.+/;
  
  return imageExtensions.test(url) || driveRegex1.test(url) || driveRegex2.test(url) || driveRegex3.test(url) || urlRegex.test(url);
}

/**
 * Extract file ID from Google Drive URL
 * @param url - Google Drive URL
 * @returns File ID or null if not a valid Google Drive URL
 */
export function extractGoogleDriveFileId(url: string): string | null {
  const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  return match ? match[1] : null;
}
