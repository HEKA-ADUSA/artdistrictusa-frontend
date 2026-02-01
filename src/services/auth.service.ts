import api from '@/lib/api';

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        isArtist: boolean;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface BecomeArtistData {
    artistName?: string;
    bio?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    city?: string;
    state?: string;
    country?: string;
    languages?: string[];
    subscriptionTier?: string;
}

class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<{ user: any; message: string }> {
        const response = await api.post('/auth/register', data);
        return response.data;
    }

    /**
     * Login existing user
     */
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post('/auth/login', data);

        // Store tokens in localStorage
        if (response.data.tokens) {
            localStorage.setItem('token', response.data.tokens.accessToken);
            localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    }

    /**
     * Logout current user
     */
    async logout(): Promise<void> {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                await api.post('/auth/logout', { refreshToken });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }

        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    /**
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<any> {
        const response = await api.get('/auth/me');
        return response.data.user;
    }

    /**
     * Upgrade user to artist role
     */
    async becomeArtist(data: BecomeArtistData): Promise<any> {
        const response = await api.post('/auth/become-artist', data);

        // Update user in localStorage
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    /**
     * Get stored user
     */
    getStoredUser(): any | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    }

    /**
     * Refresh access token
     */
    async refreshToken(): Promise<void> {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await api.post('/auth/refresh', { refreshToken });

        if (response.data.tokens) {
            localStorage.setItem('token', response.data.tokens.accessToken);
            localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        }
    }
}

export default new AuthService();
