const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request handler
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'API request failed');
  }

  return response.json();
}

// Authentication APIs
export const authAPI = {
  register: async (userData: {
    email: string;
    password: string;
    name: string;
    age?: number;
    gender?: string;
    college?: string;
    course?: string;
    year?: string;
    phone?: string;
    emergency_contact?: string;
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Chat APIs
export const chatAPI = {
  sendMessage: async (messageData: {
    user_id?: string;
    message: string;
    session_id?: string;
  }) => {
    return apiRequest('/chat/send', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },
};

// Counselor APIs
export const counselorAPI = {
  getCounselors: async () => {
    return apiRequest('/counselors');
  },
};

// Appointment APIs
export const appointmentAPI = {
  bookAppointment: async (appointmentData: {
    student_id: string;
    counselor_id: string;
    scheduled_datetime: string;
    type?: string;
    mode?: string;
    notes?: string;
  }) => {
    return apiRequest('/appointments/book', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  getUserAppointments: async (userId: string) => {
    return apiRequest(`/appointments/${userId}`);
  },
};

// Resources APIs
export const resourceAPI = {
  getResources: async (filters?: {
    category?: string;
    language?: string;
  }) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/resources?${params.toString()}`);
  },
};

// Forum APIs
export const forumAPI = {
  getPosts: async (category?: string) => {
    const params = category ? `?category=${category}` : '';
    return apiRequest(`/forum/posts${params}`);
  },

  createPost: async (postData: {
    author_id: string;
    title: string;
    content: string;
    category?: string;
    tags?: string[];
    is_anonymous?: boolean;
  }) => {
    return apiRequest('/forum/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },
};

// Screening APIs
export const screeningAPI = {
  submitScreening: async (screeningData: {
    user_id: string;
    responses: Record<string, number>;
  }, screeningType: string) => {
    return apiRequest(`/screening/${screeningType}`, {
      method: 'POST',
      body: JSON.stringify(screeningData),
    });
  },
};

// Admin Analytics APIs
export const analyticsAPI = {
  getAnalytics: async () => {
    return apiRequest('/admin/analytics');
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/health');
};

export default {
  auth: authAPI,
  chat: chatAPI,
  counselors: counselorAPI,
  appointments: appointmentAPI,
  resources: resourceAPI,
  forum: forumAPI,
  screening: screeningAPI,
  analytics: analyticsAPI,
  healthCheck,
};