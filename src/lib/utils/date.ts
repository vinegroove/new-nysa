// Date formatting and manipulation utilities

import { format, formatDistanceToNow, isPast, isFuture, parseISO } from "date-fns";

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, "PPP 'at' p");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

/**
 * Format date for form inputs (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date | string): string {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, "yyyy-MM-dd");
  } catch (error) {
    console.error("Error formatting date for input:", error);
    return "";
  }
}

/**
 * Get relative time from now (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error("Error getting relative time:", error);
    return "Unknown";
  }
}


/**
 * Parse time string to 24-hour format
 */
export function formatTime(timeString: string): string {
  try {
    // Handle time strings like "14:30" or "2:30 PM"
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, "h:mm a");
  } catch (error) {
    console.error("Error formatting time:", error);
    return timeString;
  }
}