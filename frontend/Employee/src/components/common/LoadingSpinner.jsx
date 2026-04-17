import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner component with different sizes and overlay options
 * @param {Object} props - Component props
 * @param {string} props.size - Size of spinner (small, medium, large)
 * @param {boolean} props.overlay - Whether to show overlay
 * @param {string} props.message - Optional loading message
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} LoadingSpinner component
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  overlay = false, 
  message = 'Loading...', 
  className = '' 
}) => {
  const spinnerClasses = [
    'loading-spinner',
    `loading-spinner--${size}`,
    className
  ].filter(Boolean).join(' ');

  const spinner = (
    <div className={spinnerClasses}>
      <div className="loading-spinner__circle"></div>
      {message && <div className="loading-spinner__message">{message}</div>}
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-spinner-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;