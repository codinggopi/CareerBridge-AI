/**
 * Centralized API Service for CareerBridge AI
 * Contains all endpoint definitions and network request logic.
 */

import { toast } from 'react-hot-toast';

//export const API_BASE_URL = "http://localhost:8000";
export const API_BASE_URL = "https://career-bridge-ai-six.vercel.app";

/**
 * Resolves an avatar URL. If it's a relative path (e.g. /uploads/avatars/x.jpg),
 * prepends the API base URL. Full URLs are passed through unchanged.
 */
export const resolveAvatarUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  return `${API_BASE_URL}${url}`;
};

/**
 * Core API Client
 * Handles headers, JSON parsing, error handling, and authentication tokens.
 */
export const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
  const token = typeof window !== 'undefined' ? (localStorage.getItem('careerbridge_token') || sessionStorage.getItem('careerbridge_token')) : null;
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('careerbridge_token');
        sessionStorage.removeItem('careerbridge_token');
      }
      window.location.href = '/sign-in';
      toast.error('Session expired. Please log in again.');
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const errorMessage = error.detail || error.message || 'API Error';
      // Suppress 404 toast errors for mock data endpoints
      if (response.status !== 404) {
        toast.error(`Error: ${errorMessage}`);
      }
      throw new Error(errorMessage);
    }

    return await response.json().catch(() => ({}));
  } catch (error) {
    // Distinguish between network errors and already handled errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      toast.error('Network error. Is the backend running?');
    }
    throw error;
  }
};


// ==========================================
// 🚀 ALL API ENDPOINTS
// ==========================================

export const getStudentDashboard = () => apiClient('/api/dashboard/student');
export const getAdminDashboard = () => apiClient('/api/dashboard/admin');
export const getSkillGapAnalysis = () => apiClient('/api/analysis/skill-gap');
export const getPlacementReadiness = () => apiClient('/api/analysis/placement-readiness');
export const getNotifications = () => apiClient('/api/notifications');
export const getProfile = () => apiClient('/api/profile');
export const updateProfile = (data) => apiClient('/api/profile', { body: data, method: 'PUT' });
export const getSettings = () => apiClient('/api/settings');
export const saveSettings = (data) => apiClient('/api/settings', { body: data, method: 'PUT' });
export const getMockInterview = () => apiClient('/api/interviews/mock');
export const sendInterviewMessage = (message) => apiClient('/api/interviews/mock/message', { body: { message }, method: 'POST' });
export const getLearningRoadmap = () => apiClient('/api/learning/roadmap');
export const getLearningResources = () => apiClient('/api/learning/resources');
export const getCareerIntelligence = () => apiClient('/api/career/intelligence');
export const getAICoach = () => apiClient('/api/coach/session');
export const sendCoachMessage = (message) => apiClient('/api/coach/message', { body: { message }, method: 'POST' });
export const getResume = () => apiClient('/api/resume');
export const saveResume = (data) => apiClient('/api/resume', { body: data, method: 'POST' });

// Special case for FormData (file upload)
export const analyzeResume = (formData) => {
  const token = localStorage.getItem('careerbridge_token') || sessionStorage.getItem('careerbridge_token');
  return fetch(`${API_BASE_URL}/api/resume/analyze`, {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: formData
  }).then(res => res.json());
};

// Avatar upload via multipart/form-data
export const uploadAvatar = async (file) => {
  const token = localStorage.getItem('careerbridge_token') || sessionStorage.getItem('careerbridge_token');
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE_URL}/api/profile/avatar`, {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: formData
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Avatar upload failed');
  }
  return response.json();
};

// --- Auth Endpoints ---
export const loginStudent = (data) => apiClient('/api/auth/login', { body: data });
export const registerStudent = (data) => apiClient('/api/auth/register', { body: data });
export const resetPassword = (data) => apiClient('/api/auth/reset-password', { body: data });
export const fetchSecurityQuestion = (email) => apiClient('/api/auth/security-question', { body: { email } });
export const updateSecurityQuestion = (data) => apiClient('/api/settings/security-question', { body: data, method: 'PUT' });
