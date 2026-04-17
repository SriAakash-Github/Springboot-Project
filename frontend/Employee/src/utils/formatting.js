/**
 * Utility functions for formatting data
 */

/**
 * Format salary as currency
 * @param {string|number} salary - The salary amount
 * @param {string} currency - Currency code (default: USD)
 * @param {string} locale - Locale for formatting (default: en-US)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (salary, currency = 'USD', locale = 'en-US') => {
  if (!salary || isNaN(salary)) return '$0.00';
  
  const amount = typeof salary === 'string' ? parseFloat(salary) : salary;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format employee name for display
 * @param {string} name - Employee name
 * @returns {string} Formatted name
 */
export const formatEmployeeName = (name) => {
  if (!name) return '';
  return name.trim().replace(/\s+/g, ' ');
};

/**
 * Format department name
 * @param {string} department - Department name
 * @returns {string} Formatted department name
 */
export const formatDepartment = (department) => {
  if (!department) return '';
  return department.trim().toUpperCase();
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};