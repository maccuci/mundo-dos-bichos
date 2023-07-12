import React, { createContext, useState, useMemo } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  handleLogout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const authContextValue: AuthContextType = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    handleLogout,
  }), [isAuthenticated]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
