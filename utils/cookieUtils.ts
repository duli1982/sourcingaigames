/**
 * Cookie Utilities for Session Token Persistence
 * Provides functions to set, get, and delete cookies with secure defaults
 */

/**
 * Set a cookie with a value and expiration
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Days until expiration (default: 365 days = 1 year)
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  try {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;

    // Set cookie with secure options
    // Note: Secure flag requires HTTPS in production
    const isSecure = window.location.protocol === 'https:';
    const secureFlag = isSecure ? '; Secure' : '';

    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax${secureFlag}`;
  } catch (error) {
    console.error('Failed to set cookie:', error);
  }
}

/**
 * Get a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  try {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to get cookie:', error);
    return null;
  }
}

/**
 * Delete a cookie by name
 * @param name - Cookie name
 */
export function deleteCookie(name: string): void {
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } catch (error) {
    console.error('Failed to delete cookie:', error);
  }
}

/**
 * Generate a unique session token (UUID v4)
 * @returns UUID string
 */
export function generateSessionToken(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
