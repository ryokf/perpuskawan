import API_URL from '../config/apiUrl';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/Auth';

const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || 'Login failed',
            };
        }

        // Save token to localStorage
        if (data?.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.data));
        }

        return {
            success: true,
            message: 'Login successful',
            data: data.data,
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login',
        };
    }
};

const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Registration failed',
            };
        }

        return {
            success: true,
            message: 'Registration successful',
            data: result.data,
        };
    } catch (error) {
        console.error('Register error:', error);
        return {
            success: false,
            message: 'An error occurred during registration',
        };
    }
};

const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};

const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

const isAuthenticated = (): boolean => {
    return !!getToken();
};

export { login, register, logout, getToken, isAuthenticated };
