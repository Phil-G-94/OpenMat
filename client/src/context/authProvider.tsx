import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./authCtx";

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);

    const fetchAuthentication = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/secure",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            if (response.ok) {
                setIsAuthed(true);
            } else {
                setIsAuthed(false);
            }
        } catch (err) {
            console.log(err);
            setIsAuthed(false);
        }
    };

    useEffect(() => {
        fetchAuthentication();
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthed, fetchAuthentication }}
        >
            {children}
        </AuthContext.Provider>
    );
};
