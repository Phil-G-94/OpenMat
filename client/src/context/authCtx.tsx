import { createContext } from "react";

interface AuthContextType {
    isAuthed: boolean | null;
    // logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
