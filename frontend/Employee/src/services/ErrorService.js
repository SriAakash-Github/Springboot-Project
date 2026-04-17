/**
 * Error handling service for API errors and user notifications
 */

import { NOTIFICATION_TYPES } from '../constants';

class ErrorService {
  /**
   * Parse API error response and return user-friendly message
   * @param {Error} error - Axios error object
   * @returns {string} User-friendly error message
   */
  static parseApiError(error) {
    // Network error
    if (!error.response) {
      return 'Network error. Please check your connection and try again.';
    }

    const { status, data } = error.response;

    // Handle different HTTP status codes
    switch (status) {
      case 400:
        return data?.message || 'Invalid request. Please check your input.';
      case 401:
        return 'You are not authorized to perform this action.';
      case 403:
        return 'Access denied. You do not have permission.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'Conflict. The resource already exists.';
      case 422:
        return data?.message || 'Validation error. Please check your input.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return data?.message || 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Handle API error and show notification
   * @param {Error} error - Error object
   * @param {Function} showNotification - Notification function
   * @param {string} context - Context where error occurred
   */
  static handleApiError(error, showNotification, context = '') {
    const message = this.parseApiError(error);
    const contextMessage = context ? `${context}: ${message}` : message;
    
    if (showNotification) {
      showNotification(NOTIFICATION_TYPES.ERROR, contextMessage);
    }
    
    this.logError(error, context);
  }

  /**
   * Log error for debugging purposes
   * @param {Error} error - Error object
   * @param {string} context - Context where error occurred
   */
  static logError(error, context = '') {
    const timestamp = new Date().toISOString();
    const logMessage = {
      timestamp,
      context,
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status
    };

    console.error('Error logged:', logMessage);
    
    // In production, you might want to send this to an error tracking service
    // like Sentry, LogRocket, etc.
  }

  /**
   * Create a retry function for failed API calls
   * @param {Function} apiCall - The API call function to retry
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} delay - Delay between retries in milliseconds
   * @returns {Function} Retry function
   */
  static createRetryFunction(apiCall, maxRetries = 3, delay = 1000) {
    return async (...args) => {
      let lastError;
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await apiCall(...args);
        } catch (error) {
          lastError = error;
          
          // Don't retry on client errors (4xx)
          if (error.response?.status >= 400 && error.response?.status < 500) {
            throw error;
          }
          
          // Don't retry on last attempt
          if (attempt === maxRetries) {
            throw error;
          }
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
      
      throw lastError;
    };
  }

  /**
   * Check if error is a network error
   * @param {Error} error - Error object
   * @returns {boolean} True if network error
   */
  static isNetworkError(error) {
    return !error.response && error.code === 'NETWORK_ERROR';
  }

  /**
   * Check if error is a timeout error
   * @param {Error} error - Error object
   * @returns {boolean} True if timeout error
   */
  static isTimeoutError(error) {
    return error.code === 'ECONNABORTED' || error.message.includes('timeout');
  }

  /**
   * Get appropriate error message for form validation
   * @param {Object} validationErrors - Validation errors object
   * @returns {string} Combined error message
   */
  static getValidationErrorMessage(validationErrors) {
    const errors = Object.values(validationErrors).filter(Boolean);
    if (errors.length === 0) return '';
    if (errors.length === 1) return errors[0];
    return `Please fix the following errors: ${errors.join(', ')}`;
  }
}

export default ErrorService;