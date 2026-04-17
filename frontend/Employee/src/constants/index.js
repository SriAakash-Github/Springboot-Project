// Application constants
export const API_BASE_URL = 'http://localhost:8080';

export const ROUTES = {
  HOME: '/',
  ADD_USER: '/adduser',
  EDIT_USER: '/edituser',
  VIEW_USER: '/viewuser'
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_SALARY: 'Please enter a valid salary amount',
  MIN_LENGTH: 'Minimum length is {min} characters'
};