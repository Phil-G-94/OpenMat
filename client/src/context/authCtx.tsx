import { createContext } from "react";

interface AuthContextType {
    isAuthed: boolean | null;
    loadingAuth: boolean | null;
    fetchAuthentication: () => Promise<void | undefined>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
