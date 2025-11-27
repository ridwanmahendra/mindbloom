// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
    CHAT: `${API_URL}/api/chat`,
    HEALTH: `${API_URL}/api/health`
};
