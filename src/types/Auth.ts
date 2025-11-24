export interface User {
  id: number;
  username: string;
  email: string;
  status: string;
  role?: 'user' | 'staff';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
