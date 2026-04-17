/**
 * Validation utilities for forms
 */

import { VALIDATION_MESSAGES } from '../constants';

/**
 * Validate required field
 * @param {string} value - Field value
 * @returns {string|null} Error message or null if valid
 */
export const validateRequired = (value) => {
  if (!value || value.toString().trim() === '') {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  return null;
};

/**
 * Validate employee name
 * @param {string} name - Employee name
 * @returns {string|null} Error message or null if valid
 */
export const validateEmployeeName = (name) => {
  const requiredError = validateRequired(name);
  if (requiredError) return requiredError;
  
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (name.trim().length > 100) {
    return 'Name must be less than 100 characters';
  }
  
  return null;
};

/**
 * Validate salary
 * @param {string} salary - Salary value
 * @returns {string|null} Error message or null if valid
 */
export const validateSalary = (salary) => {
  const requiredError = validateRequired(salary);
  if (requiredError) return requiredError;
  
  const numericSalary = parseFloat(salary);
  
  if (isNaN(numericSalary)) {
    return VALIDATION_MESSAGES.INVALID_SALARY;
  }
  
  if (numericSalary < 0) {
    return 'Salary cannot be negative';
  }
  
  if (numericSalary > 10000000) {
    return 'Salary seems too high';
  }
  
  return null;
};

/**
 * Validate department
 * @param {string} department - Department name
 * @returns {string|null} Error message or null if valid
 */
export const validateDepartment = (department) => {
  const requiredError = validateRequired(department);
  if (requiredError) return requiredError;
  
  if (department.trim().length < 2) {
    return 'Department must be at least 2 characters long';
  }
  
  if (department.trim().length > 50) {
    return 'Department must be less than 50 characters';
  }
  
  return null;
};

/**
 * Validate entire employee form
 * @param {Object} employee - Employee data
 * @returns {Object} Validation errors object
 */
export const validateEmployeeForm = (employee) => {
  const errors = {};
  
  const nameError = validateEmployeeName(employee.empName);
  if (nameError) errors.empName = nameError;
  
  const salaryError = validateSalary(employee.empSal);
  if (salaryError) errors.empSal = salaryError;
  
  const departmentError = validateDepartment(employee.empDept);
  if (departmentError) errors.empDept = departmentError;
  
  return errors;
};

/**
 * Check if form has any validation errors
 * @param {Object} errors - Errors object
 * @returns {boolean} True if form is valid
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};