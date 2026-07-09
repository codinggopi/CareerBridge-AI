/**
 * Centralized API Service for CareerBridge AI
 * Contains all endpoint definitions and network request logic.
 */

const API_BASE_URL = "http://localhost:8000";

/**
 * Core API Client
 * Handles headers, JSON parsing, error handling, and authentication tokens.
 */
export const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('careerbridge_token') : null;
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

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    localStorage.removeItem('careerbridge_token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || 'API Error');
  }

  return response.json().catch(() => ({}));
};


// ==========================================
// 🚀 ALL API ENDPOINTS
// ==========================================

export const getStudentDashboard = () => apiClient('/api/v1/dashboard/student');
export const getAdminDashboard = () => apiClient('/api/v1/dashboard/admin');
export const getSkillGapAnalysis = () => apiClient('/api/v1/analysis/skill-gap');
export const getPlacementReadiness = () => apiClient('/api/v1/analysis/placement-readiness');
export const getNotifications = () => apiClient('/api/v1/notifications');
export const getProfile = () => apiClient('/api/v1/profile');
export const updateProfile = (data) => apiClient('/api/v1/profile', { body: data, method: 'PUT' });
export const getSettings = () => apiClient('/api/v1/settings');
export const saveSettings = (data) => apiClient('/api/v1/settings', { body: data, method: 'PUT' });
export const getMockInterview = () => apiClient('/api/v1/interviews/mock');
export const sendInterviewMessage = (message) => apiClient('/api/v1/interviews/mock/message', { body: { message }, method: 'POST' });
export const getLearningRoadmap = () => apiClient('/api/v1/learning/roadmap');
export const getLearningResources = () => apiClient('/api/v1/learning/resources');
export const getCareerIntelligence = () => apiClient('/api/v1/career/intelligence');
export const getAICoach = () => apiClient('/api/v1/coach/session');
export const sendCoachMessage = (message) => apiClient('/api/v1/coach/message', { body: { message }, method: 'POST' });
export const getResume = () => apiClient('/api/v1/resume');
export const saveResume = (data) => apiClient('/api/v1/resume', { body: data, method: 'POST' });

// Special case for FormData (file upload)
export const analyzeResume = (formData) => {
  const token = localStorage.getItem('token');
  return fetch('/api/v1/resume/analyze', {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: formData
  }).then(res => res.json());
};

// --- Auth Endpoints ---
export const loginStudent = (data) => apiClient('/api/v1/auth/login', { body: data });
export const registerStudent = (data) => apiClient('/api/v1/auth/register', { body: data });
