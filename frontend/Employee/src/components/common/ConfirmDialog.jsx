import React, { useEffect, useRef } from 'react';
import './ConfirmDialog.css';

/**
 * ConfirmDialog component for destructive actions
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether dialog is open
 * @param {string} props.title - Dialog title
 * @param {string} props.message - Dialog message
 * @param {string} props.confirmText - Confirm button text
 * @param {string} props.cancelText - Cancel button text
 * @param {string} props.type - Dialog type (danger, warning, info)
 * @param {Function} props.onConfirm - Confirm callback
 * @param {Function} props.onCancel - Cancel callback
 * @param {boolean} props.loading - Whether confirm action is loading
 * @returns {JSX.Element|null} ConfirmDialog component
 */
const ConfirmDialog = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  onConfirm,
  onCancel,
  loading = false
}) => {
  const dialogRef = useRef(null);
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the confirm button when dialog opens
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen && !loading) {
        onCancel();
      }
    };

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target) && !loading) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onCancel, loading]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (!loading) {
      onCancel();
    }
  };

  const dialogClasses = [
    'confirm-dialog',
    `confirm-dialog--${type}`
  ].join(' ');

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return '⚠️';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="confirm-dialog-overlay">
      <div 
        ref={dialogRef}
        className={dialogClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
      >
        <div className="confirm-dialog__header">
          <div className="confirm-dialog__icon">
            {getIcon()}
          </div>
          <h3 id="confirm-dialog-title" className="confirm-dialog__title">
            {title}
          </h3>
        </div>

        <div className="confirm-dialog__body">
          <p id="confirm-dialog-message" className="confirm-dialog__message">
            {message}
          </p>
        </div>

        <div className="confirm-dialog__footer">
          <button
            type="button"
            className="btn btn-secondary confirm-dialog__cancel"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            className={`btn confirm-dialog__confirm confirm-dialog__confirm--${type}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="confirm-dialog__loading-spinner"></span>
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;