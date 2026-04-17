/**
 * Notification service for managing toast messages
 */

import { NOTIFICATION_TYPES } from '../constants';

class NotificationService {
  constructor() {
    this.notifications = [];
    this.listeners = [];
    this.nextId = 1;
  }

  /**
   * Add a notification
   * @param {string} type - Notification type (success, error, warning, info)
   * @param {string} message - Notification message
   * @param {number} duration - Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
   * @param {Object} options - Additional options
   * @returns {number} Notification ID
   */
  show(type, message, duration = 5000, options = {}) {
    const notification = {
      id: this.nextId++,
      type,
      message,
      duration,
      timestamp: Date.now(),
      ...options
    };

    this.notifications.push(notification);
    this.notifyListeners();

    // Auto-dismiss if duration is set
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(notification.id);
      }, duration);
    }

    return notification.id;
  }

  /**
   * Show success notification
   * @param {string} message - Success message
   * @param {number} duration - Auto-dismiss duration
   * @returns {number} Notification ID
   */
  success(message, duration = 4000) {
    return this.show(NOTIFICATION_TYPES.SUCCESS, message, duration);
  }

  /**
   * Show error notification
   * @param {string} message - Error message
   * @param {number} duration - Auto-dismiss duration (0 = manual dismiss)
   * @returns {number} Notification ID
   */
  error(message, duration = 0) {
    return this.show(NOTIFICATION_TYPES.ERROR, message, duration);
  }

  /**
   * Show warning notification
   * @param {string} message - Warning message
   * @param {number} duration - Auto-dismiss duration
   * @returns {number} Notification ID
   */
  warning(message, duration = 6000) {
    return this.show(NOTIFICATION_TYPES.WARNING, message, duration);
  }

  /**
   * Show info notification
   * @param {string} message - Info message
   * @param {number} duration - Auto-dismiss duration
   * @returns {number} Notification ID
   */
  info(message, duration = 5000) {
    return this.show(NOTIFICATION_TYPES.INFO, message, duration);
  }

  /**
   * Dismiss a notification by ID
   * @param {number} id - Notification ID
   */
  dismiss(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index > -1) {
      this.notifications.splice(index, 1);
      this.notifyListeners();
    }
  }

  /**
   * Dismiss all notifications
   */
  dismissAll() {
    this.notifications = [];
    this.notifyListeners();
  }

  /**
   * Get all current notifications
   * @returns {Array} Array of notifications
   */
  getAll() {
    return [...this.notifications];
  }

  /**
   * Subscribe to notification changes
   * @param {Function} listener - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners of changes
   */
  notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.notifications);
      } catch (error) {
        console.error('Error in notification listener:', error);
      }
    });
  }

  /**
   * Clear expired notifications
   */
  clearExpired() {
    const now = Date.now();
    const initialLength = this.notifications.length;
    
    this.notifications = this.notifications.filter(notification => {
      if (notification.duration === 0) return true; // Never expire manual dismiss
      return (now - notification.timestamp) < notification.duration;
    });

    if (this.notifications.length !== initialLength) {
      this.notifyListeners();
    }
  }

  /**
   * Get notification count by type
   * @param {string} type - Notification type
   * @returns {number} Count of notifications
   */
  getCountByType(type) {
    return this.notifications.filter(n => n.type === type).length;
  }

  /**
   * Check if there are any error notifications
   * @returns {boolean} True if there are error notifications
   */
  hasErrors() {
    return this.getCountByType(NOTIFICATION_TYPES.ERROR) > 0;
  }

  /**
   * Get the most recent notification
   * @returns {Object|null} Most recent notification or null
   */
  getLatest() {
    if (this.notifications.length === 0) return null;
    return this.notifications[this.notifications.length - 1];
  }
}

// Create singleton instance
const notificationService = new NotificationService();

// Clean up expired notifications periodically
setInterval(() => {
  notificationService.clearExpired();
}, 1000);

export default notificationService;