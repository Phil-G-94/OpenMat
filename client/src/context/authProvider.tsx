import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./authCtx";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

    const fetchAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:8080/secure", {
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
