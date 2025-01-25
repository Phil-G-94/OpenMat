import { ReactNode, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./authCtx";

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [userId, setUserId] = useState<{ userId: string } | null>(
        null
    );

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));

        if (token) {
            try {
                const payload = jwtDecode<{ userId: string }>(
                    token.split("=")[1]
                );

                setUserId({ userId: payload.userId });
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    const logout = () => {
        document.cookie = "token=; Max-Age=0; path=/";
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ userId, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
