// User Types
export const USER_TYPES = {
  JOB_SEEKER: 'seeker',
  RECRUITER: 'recruiter',
};

// Qualifications
export const QUALIFICATIONS = [
  'Doctorate/PhD',
  'Masters/Post-Graduation',
  'Graduation/Diploma',
  '12th',
  '10th',
  'Below 10th',
];

// Course Types
export const COURSE_TYPES = [
  'Full Time',
  'Part Time',
  'Distance Learning',
  'Online',
];

// Grading Systems
export const GRADING_SYSTEMS = [
  'Scale 10 Grading System',
  'Scale 4 Grading System',
  '% Marks of 100 Maximum',
];

// Job Categories
export const JOB_CATEGORIES = [
  'Technology',
  'Marketing',
  'Sales',
  'Design',
  'Finance',
  'Healthcare',
  'Education',
  'Engineering',
  'Hospitality',
  'Other',
];

// Experience Levels
export const EXPERIENCE_LEVELS = [
  'Fresher',
  '1-2 Years',
  '2-5 Years',
  '5-10 Years',
  '10+ Years',
];

// Employment Types
export const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
];

// Messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful!',
    REGISTER: 'Registration successful!',
    UPDATE: 'Updated successfully!',
    DELETE: 'Deleted successfully!',
  },
  ERROR: {
    LOGIN: 'Login failed. Please check your credentials.',
    REGISTER: 'Registration failed. Please try again.',
    UPDATE: 'Update failed. Please try again.',
    DELETE: 'Deletion failed. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
  },
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Debounce time (in milliseconds)
export const DEBOUNCE_TIME = 300;

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'user',
  PREFERENCES: 'preferences',
};

// Colors
export const COLORS = {
  PRIMARY: '#39C5B9',
  SECONDARY: '#10B981',
  DANGER: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#3B82F6',
  SUCCESS: '#10B981',
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};
