import React, {createContext, useState, useEffect} from "react";

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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const handleLogout = () => {
        setIsAuthenticated(false);
        console.log(isAuthenticated)
    };

    const authContextValue: AuthContextType = {
        isAuthenticated,
        setIsAuthenticated,
        handleLogout,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
