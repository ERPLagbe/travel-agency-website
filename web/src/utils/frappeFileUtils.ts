/**
 * Utility functions for handling Frappe file URLs
 */

/**
 * Converts a Frappe file path to a full URL
 * @param filePath - The file path from Frappe (e.g., "/private/files/image.jpg")
 * @param baseUrl - The base URL of the Frappe server (default: "http://localhost:8000")
 * @returns Full URL to the file
 */
export const getFrappeFileUrl = (filePath: string, baseUrl: string = 'http://localhost:8000'): string | null => {
  if (!filePath) return null;
  
  // If it's already a full URL, return as is
  if (filePath.startsWith('http')) {
    return filePath;
  }
  
  // If it's a Frappe file path, convert to full URL
  if (filePath.startsWith('/private/files/') || filePath.startsWith('/files/')) {
    return `${baseUrl}${filePath}`;
  }
  
  // If it's a relative path, assume it's from the public files
  if (filePath.startsWith('/')) {
    return `${baseUrl}${filePath}`;
  }
  
  return filePath;
};

/**
 * Gets the file URL with proper error handling
 * @param filePath - The file path from Frappe
 * @param fallbackUrl - Fallback URL if the file path is invalid
 * @param baseUrl - The base URL of the Frappe server
 * @returns Full URL to the file or fallback URL
 */
export const getFileUrlWithFallback = (
  filePath: string, 
  fallbackUrl: string = 'https://via.placeholder.com/1200x600/4F46E5/FFFFFF?text=No+Image',
  baseUrl: string = 'http://localhost:8000'
): string => {
  const fileUrl = getFrappeFileUrl(filePath, baseUrl);
  return fileUrl || fallbackUrl;
};
