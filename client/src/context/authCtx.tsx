import { createContext } from "react";

interface AuthContextType {
    userId: { userId: string } | null;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
