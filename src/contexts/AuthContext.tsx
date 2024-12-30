import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Set up Axios interceptor to include token in headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Menambahkan token ke header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Define available roles and their permissions
export type UserRole = 'admin' | 'editor' | 'user';

interface RolePermissions {
  dashboard: boolean;
  analytics: boolean;
  users: boolean;
  settings: boolean;
  transactions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  admin: {
    dashboard: true,
    analytics: true,
    users: true,
    settings: true,
    transactions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  editor: {
    dashboard: true,
    analytics: true,
    users: false,
    settings: false,
    transactions: {
      view: true,
      edit: true,
      delete: false,
    },
  },
  user: {
    dashboard: true,
    analytics: false,
    users: false,
    settings: false,
    transactions: {
      view: true,
      edit: false,
      delete: false,
    },
  },
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: keyof Omit<RolePermissions, 'transactions'>) => boolean;
  hasTransactionPermission: (action: keyof RolePermissions['transactions']) => boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    console.log('Stored User:', storedUser);
    console.log('Token Expiration:', tokenExpiration);

    if (storedUser && tokenExpiration) {
      const isExpired = Date.now() > parseInt(tokenExpiration);
      console.log('Is Expired:', isExpired);
      if (isExpired) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      const { data } = response;

      if (data.active) {
        const userWithoutPassword = {
          id: data.id,
          email: username,
          name: data.fullname,
          role: data.role as UserRole,
        };
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 jam dalam milidetik
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', data.token); // Store the token if needed
        localStorage.setItem('tokenExpiration', expirationTime.toString()); // Simpan waktu kedaluwarsa
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      throw new Error('Login failed: ' + (error as Error).message);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (permission: keyof Omit<RolePermissions, 'transactions'>): boolean => {
    if (!user) return false;
    return rolePermissions[user.role][permission];
  };

  const hasTransactionPermission = (action: keyof RolePermissions['transactions']): boolean => {
    if (!user) return false;
    return rolePermissions[user.role].transactions[action];
  };

  console.log(API_BASE_URL)

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      hasPermission,
      hasTransactionPermission 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}