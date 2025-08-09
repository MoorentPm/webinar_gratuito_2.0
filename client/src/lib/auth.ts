export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Simple in-memory auth state for demo purposes
let authState: AuthState = {
  user: null,
  isAuthenticated: false
};

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  if (email === "admin@moorentpm.it" && password === "admin123") {
    const user: User = {
      id: "1",
      email,
      name: "Admin"
    };
    
    authState = {
      user,
      isAuthenticated: true
    };
    
    return user;
  }
  
  throw new Error("Invalid credentials");
};

export const logout = (): void => {
  authState = {
    user: null,
    isAuthenticated: false
  };
};

export const getCurrentUser = (): User | null => {
  return authState.user;
};

export const isAuthenticated = (): boolean => {
  return authState.isAuthenticated;
};
