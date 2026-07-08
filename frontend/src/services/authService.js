import { apiClient } from './apiClient';

export const authService = {
  login: async (email, password) => {
    // Mock API Call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'mock-jwt-token-123', user: { email, name: 'Alex Rivera' } });
      }, 1000);
    });
  },
  
  register: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'mock-jwt-token-456', user: { email: data.email, name: data.name } });
      }, 1000);
    });
  }
};