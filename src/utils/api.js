// API Base URL
export const API_BASE_URL = 'http://localhost:4518/gknbvg/SkillPort-user';
export const RECRUITER_API_BASE_URL = 'http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok';
export const PAYMENT_API_BASE_URL = 'http://localhost:4518/api/payments';

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  VERIFY_OTP: `${API_BASE_URL}/verify-otp`,
};

// Education Endpoints
export const EDUCATION_ENDPOINTS = {
  ADD_EDUCATION: (userId) => `${API_BASE_URL}/${userId}/add-education`,
  GET_EDUCATION: (userId) => `${API_BASE_URL}/${userId}/education`,
  UPDATE_EDUCATION: (userId, educationId) => `${API_BASE_URL}/${userId}/education/${educationId}`,
  DELETE_EDUCATION: (userId, educationId) => `${API_BASE_URL}/${userId}/education/${educationId}`,
};

// Job Endpoints
export const JOB_ENDPOINTS = {
  GET_JOBS: `${API_BASE_URL}/jobs`,
  GET_JOB: (jobId) => `${API_BASE_URL}/jobs/${jobId}`,
  SEARCH_JOBS: `${API_BASE_URL}/jobs/search`,
  APPLY_JOB: (jobId) => `${API_BASE_URL}/jobs/${jobId}/apply`,
};

// API Helper function
export const apiCall = async (url, options = {}, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
