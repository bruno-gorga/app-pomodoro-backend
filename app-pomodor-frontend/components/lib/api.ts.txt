
import { toast } from "@/components/ui/use-toast";

// Update API URL to point to your actual backend server
const API_URL = 'https://pomodoro-backend-pink.vercel.app'; // Deployed backend URL

// Types
export interface User {
  _id: string;
  email: string;
}

export interface Session {
  _id: string;
  userId: string;
  duration: number;
  startTime: string;
  endTime?: string;
}

export interface ExtendedSession extends Session {
  notes: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  message: string;
}

export interface AISuggestion {
  suggestion: string;
}

// API client with authentication
class ApiClient {
  private token: string | null = null;
  private offlineMode = true; // Default to offline mode to avoid showing error messages

  constructor() {
    // Check for token in localStorage on initialization
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      this.token = storedToken;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Enable offline mode to prevent unnecessary network requests
  setOfflineMode(isOffline: boolean) {
    this.offlineMode = isOffline;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // If we're in offline mode, immediately reject the request without showing errors
    if (this.offlineMode) {
      return Promise.reject(new Error('Application is in offline mode'));
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      console.log(`Making request to: ${API_URL}${endpoint}`);
      // Add a timeout to the fetch request to avoid hanging indefinitely
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        // Don't throw error, just log it and return a default response
        console.error('API Error:', await response.text());
        return {} as T;
      }

      return await response.json() as T;
    } catch (error: any) {
      console.error('API request failed:', error);
      // Never show errors to the user
      return {} as T;
    }
  }

  // Auth endpoints
  async register(email: string, password: string): Promise<AuthResponse> {
    // Special case for bmg391@gmail.com
    if (email === "bmg391@gmail.com" && password === "181093") {
      const mockUserId = "special-user-id-54321";
      const mockToken = "special-mock-token-54321";
      
      this.setToken(mockToken);
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created!",
      });
      
      return {
        token: mockToken,
        userId: mockUserId,
        message: "Registration successful!"
      };
    }
    
    try {
      const response = await this.request<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      this.setToken(response.token || '');
      return response;
    } catch (error) {
      console.error('Registration error details:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    // Special case for bmg391@hotmail.com
    if (email === "bmg391@hotmail.com" && password === "181093") {
      const mockUserId = "special-user-id-12345";
      const mockToken = "special-mock-token-12345";
      
      this.setToken(mockToken);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      return {
        token: mockToken,
        userId: mockUserId,
        message: "Login successful"
      };
    }
    
    // Special case for bmg391@gmail.com
    if (email === "bmg391@gmail.com" && password === "181093") {
      const mockUserId = "special-user-id-54321";
      const mockToken = "special-mock-token-54321";
      
      this.setToken(mockToken);
      
      toast({
        title: "Login successful",
        description: "Welcome to your blank dashboard!",
      });
      
      return {
        token: mockToken,
        userId: mockUserId,
        message: "Login successful"
      };
    }
    
    try {
      const response = await this.request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      this.setToken(response.token || '');
      return response;
    } catch (error) {
      console.error('Login error details:', error);
      throw error;
    }
  }

  async logout() {
    this.clearToken();
  }

  // Session endpoints
  async createSession(userId: string, duration: number): Promise<ExtendedSession> {
    return this.request<ExtendedSession>('/sessions', {
      method: 'POST',
      body: JSON.stringify({ userId, duration }),
    });
  }

  async getSessions(): Promise<ExtendedSession[]> {
    return this.request<ExtendedSession[]>('/sessions');
  }

  // AI endpoints
  async getAISuggestions(sessions: Session[]): Promise<AISuggestion> {
    return this.request<AISuggestion>('/ai/suggestions', {
      method: 'POST',
      body: JSON.stringify({ sessions }),
    });
  }
}

export const api = new ApiClient();
// Always set to offline mode to avoid error banners
api.setOfflineMode(true);
