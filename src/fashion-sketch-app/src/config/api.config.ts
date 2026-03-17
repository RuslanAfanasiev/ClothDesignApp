export const API_BASE_URL = 'http://192.168.0.140:3000/api/v1';
export const AUTH_BASE_URL = 'http://192.168.0.140:8080/api/v1.0';

export const API_ENDPOINTS = {
  // Projects
  PROJECTS: '/projects',
  PROJECT: (id: string) => `/projects/${id}`,
  // Sketches
  SKETCHES: (projectId: string) => `/projects/${projectId}/sketches`,
  SKETCH: (projectId: string, id: string) => `/projects/${projectId}/sketches/${id}`,
  // Templates
  TEMPLATES: '/templates',
  TEMPLATE: (id: string) => `/templates/${id}`,
  // Upload
  UPLOAD: '/upload',
  // Auth
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    PROFILE: '/profile',
    IS_AUTHENTICATED: '/is-authenticated',
    SEND_OTP: '/send-otp',
    VERIFY_OTP: '/verify-otp',
    SEND_RESET_OTP: '/send-reset-otp',
    RESET_PASSWORD: '/reset-password',
  },
} as const;
