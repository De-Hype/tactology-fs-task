export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
