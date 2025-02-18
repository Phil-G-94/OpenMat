import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function RequireAuth() {
    const { isAuthed, loadingAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loadingAuth) return;

        if (!isAuthed) {
            navigate("/auth/login", {
                state: location.pathname,
                replace: true,
            });
        }
    }, [isAuthed, location.pathname, navigate, loadingAuth]);

    return isAuthed ? <Outlet /> : null;
}
