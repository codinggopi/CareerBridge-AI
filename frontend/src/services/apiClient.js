import { API_URL } from '../utils/constants';

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

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API Error');
  }

  return response.json().catch(() => ({}));
};