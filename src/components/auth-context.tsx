import React, {createContext, useState} from "react";

type Props = {
    children: React.ReactNode
}

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {
    },
    handleLogout: () => {
    },
});

export const AuthProvider: React.FC<Props> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const authContextValue: AuthContextType = {
        isAuthenticated,
        setIsAuthenticated,
        handleLogout,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
