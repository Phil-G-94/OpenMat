import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./authCtx";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

    const fetchAuthentication = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/secure`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                setIsAuthed(true);
            } else {
                setIsAuthed(false);
            }
        } catch (err) {
            setIsAuthed(false);
            throw err;
        } finally {
            setLoadingAuth(false);
        }
    };

    useEffect(() => {
        fetchAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthed, fetchAuthentication, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
