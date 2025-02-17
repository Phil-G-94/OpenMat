import { createContext } from "react";

interface AuthContextType {
    isAuthed: boolean | null;
    fetchAuthentication: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
