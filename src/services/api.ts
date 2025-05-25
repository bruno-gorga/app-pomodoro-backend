import axios from 'axios';

// Use the production URL for both environments
// You'll need to replace this with your actual Vercel deployment URL after deploying
const API_URL = 'https://your-vercel-deployment-url.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the auth token with every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (email: string, password: string) => {
    try {
      // Special case for hardcoded credentials - simulate successful registration
      if (email === 'bmg391@hotmail.com' && password === '181093') {
        const mockResponse = {
          userId: 'special-user-id-123',
          email,
          token: 'special-token-for-hardcoded-user'
        };
        
        // Store the token and user ID in local storage
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('userId', mockResponse.userId);
        
        return mockResponse;
      }
      
      // Regular API call for other users
      const response = await api.post('/auth/register', { email, password });
      
      // Store the token and user ID in local storage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      // Special case for hardcoded credentials - simulate successful login
      if (email === 'bmg391@hotmail.com' && password === '181093') {
        const mockResponse = {
          userId: 'special-user-id-123',
          email,
          token: 'special-token-for-hardcoded-user'
        };
        
        // Store the token and user ID in local storage
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('userId', mockResponse.userId);
        
        return mockResponse;
      }
      
      // Regular API call for other users
      const response = await api.post('/auth/login', { email, password });
      
      // Store the token and user ID in local storage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  },

  getCurrentUser: () => {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')
    };
  },
};

export const sessionService = {
  createSession: async (duration: number) => {
    try {
      const userId = localStorage.getItem('userId');
      
      // For the special hardcoded user, mock the response
      if (userId === 'special-user-id-123') {
        return {
          id: `session-${Date.now()}`,
          userId,
          duration,
          startTime: new Date(),
          completed: false
        };
      }
      
      const response = await api.post('/sessions', { userId, duration });
      return response.data;
    } catch (error) {
      console.error('Create session error:', error);
      throw error;
    }
  },

  getSessions: async () => {
    try {
      // For the special hardcoded user, return mock data
      const userId = localStorage.getItem('userId');
      if (userId === 'special-user-id-123') {
        return [
          {
            id: 'mock-session-1',
            userId,
            duration: 25,
            startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 24 * 60 * 60 * 1000 + 25 * 60 * 1000),
            completed: true
          },
          {
            id: 'mock-session-2',
            userId,
            duration: 25,
            startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 25 * 60 * 1000),
            completed: true
          }
        ];
      }
      
      const response = await api.get('/sessions');
      return response.data;
    } catch (error) {
      console.error('Get sessions error:', error);
      return []; // Return empty array on error to prevent UI crashes
    }
  },

  getAiSuggestions: async (sessions: any[]) => {
    try {
      // For the special hardcoded user, return mock suggestions
      const userId = localStorage.getItem('userId');
      if (userId === 'special-user-id-123') {
        return {
          suggestions: [
            "Você está mantendo sessões consistentes de 25 minutos. Bom trabalho!",
            "Considere fazer intervalos curtos de 5 minutos entre as sessões para melhorar o foco.",
            "Tente aumentar gradualmente o número de sessões diárias para melhorar a produtividade."
          ]
        };
      }
      
      const response = await api.post('/ai/suggestions', { sessions });
      return response.data;
    } catch (error) {
      console.error('Get AI suggestions error:', error);
      return { suggestions: [] }; // Return empty suggestions on error
    }
  }
};

export default api;
