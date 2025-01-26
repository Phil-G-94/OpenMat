import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

export default function RequireAuth({
    children,
}: {
    children: ReactNode;
}) {
    const { isAuthed } = useAuth();
    const location = useLocation();

    console.log(isAuthed);

    return isAuthed ? (
        children
    ) : (
        <Navigate
            to="/auth/login"
            replace
            state={{ path: location.pathname }}
        />
    );
}
