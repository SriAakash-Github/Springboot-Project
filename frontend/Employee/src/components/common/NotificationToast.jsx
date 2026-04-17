import React, { useState, useEffect } from 'react';
import { NOTIFICATION_TYPES } from '../../constants';
import './NotificationToast.css';

/**
 * Individual toast notification component
 * @param {Object} props - Component props
 * @param {Object} props.notification - Notification object
 * @param {Function} props.onDismiss - Dismiss callback
 * @returns {JSX.Element} NotificationToast component
 */
const NotificationToast = ({ notification, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(notification.id);
    }, 300); // Match CSS transition duration
  };

  const getIcon = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return '✓';
      case NOTIFICATION_TYPES.ERROR:
        return '✕';
      case NOTIFICATION_TYPES.WARNING:
        return '⚠';
      case NOTIFICATION_TYPES.INFO:
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  const toastClasses = [
    'notification-toast',
    `notification-toast--${notification.type}`,
    isVisible ? 'notification-toast--visible' : '',
    isExiting ? 'notification-toast--exiting' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={toastClasses}>
      <div className="notification-toast__icon">
        {getIcon()}
      </div>
      <div className="notification-toast__content">
        <div className="notification-toast__message">
          {notification.message}
        </div>
        {notification.timestamp && (
          <div className="notification-toast__timestamp">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
      <button
        className="notification-toast__close"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

/**
 * Toast container component that manages multiple notifications
 * @param {Object} props - Component props
 * @param {Array} props.notifications - Array of notifications
 * @param {Function} props.onDismiss - Dismiss callback
 * @param {string} props.position - Position of toast container
 * @returns {JSX.Element} ToastContainer component
 */
export const ToastContainer = ({ 
  notifications = [], 
  onDismiss, 
  position = 'top-right' 
}) => {
  if (notifications.length === 0) return null;

  const containerClasses = [
    'toast-container',
    `toast-container--${position}`
  ].join(' ');

  return (
    <div className={containerClasses}>
      {notifications.map(notification => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default NotificationToast;