import { apiClient } from './apiClient';

/**
 * Fallback loader for mock data when the backend API is unavailable.
 * We use a switch statement to ensure bundlers statically analyze the imports.
 */
const loadFallback = async (mockFileName) => {
  console.warn(`[API Fallback] Loading local mock data for ${mockFileName} as backend is unreachable.`);
  
  switch (mockFileName) {
    case 'mockDashboard.json': return (await import('../data/mockDashboard.json')).default;
    case 'mockAdminDashboard.json': return (await import('../data/mockAdminDashboard.json')).default;
    case 'mockSkillGap.json': return (await import('../data/mockSkillGap.json')).default;
    case 'mockReadiness.json': return (await import('../data/mockReadiness.json')).default;
    case 'mockNotifications.json': return (await import('../data/mockNotifications.json')).default;
    case 'mockProfile.json': return (await import('../data/mockProfile.json')).default;
    case 'mockInterview.json': return (await import('../data/mockInterview.json')).default;
    case 'mockRoadmap.json': return (await import('../data/mockRoadmap.json')).default;
    case 'mockResources.json': return (await import('../data/mockResources.json')).default;
    case 'mockCareerIntelligence.json': return (await import('../data/mockCareerIntelligence.json')).default;
    case 'mockCoach.json': return (await import('../data/mockCoach.json')).default;
    default:
      throw new Error(`Fallback mock file not found: ${mockFileName}`);
  }
};

/**
 * Standardized API call with built-in mock fallback.
 */
const fetchWithFallback = async (endpoint, mockFileName) => {
  try {
    // Attempt real API call
    return await apiClient(endpoint);
  } catch (error) {
    // Fallback to local mock JSON
    return await loadFallback(mockFileName);
  }
};

// --- Frontend Endpoints ---

export const getStudentDashboard = () => fetchWithFallback('/api/v1/dashboard/student', 'mockDashboard.json');
export const getAdminDashboard = () => fetchWithFallback('/api/v1/dashboard/admin', 'mockAdminDashboard.json');
export const getSkillGapAnalysis = () => fetchWithFallback('/api/v1/analysis/skill-gap', 'mockSkillGap.json');
export const getPlacementReadiness = () => fetchWithFallback('/api/v1/analysis/placement-readiness', 'mockReadiness.json');
export const getNotifications = () => fetchWithFallback('/api/v1/notifications', 'mockNotifications.json');
export const getProfile = () => fetchWithFallback('/api/v1/profile', 'mockProfile.json');
export const getMockInterview = () => fetchWithFallback('/api/v1/interviews/mock', 'mockInterview.json');
export const getLearningRoadmap = () => fetchWithFallback('/api/v1/learning/roadmap', 'mockRoadmap.json');
export const getLearningResources = () => fetchWithFallback('/api/v1/learning/resources', 'mockResources.json');
export const getCareerIntelligence = () => fetchWithFallback('/api/v1/career/intelligence', 'mockCareerIntelligence.json');
export const getAICoach = () => fetchWithFallback('/api/v1/coach/session', 'mockCoach.json');
