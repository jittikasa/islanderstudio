/**
 * Calculate estimated reading time from content
 * @param {string} content - HTML or plain text content
 * @param {number} wordsPerMinute - Reading speed (default: 200 wpm)
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  if (!content) return 0;

  // Strip HTML tags to get plain text
  const text = content.replace(/<[^>]*>/g, '');

  // Count words (split by whitespace)
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate minutes, minimum 1 minute for any content
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return minutes;
}

/**
 * Format reading time for display
 * @param {number|string} minutes - Reading time in minutes or content to calculate from
 * @returns {string} Formatted reading time string
 */
export function formatReadingTime(minutes) {
  if (typeof minutes === 'string') {
    minutes = calculateReadingTime(minutes);
  }

  if (!minutes || minutes <= 0) return '';

  return `${minutes} min read`;
}
