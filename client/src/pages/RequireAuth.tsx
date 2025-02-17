import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function RequireAuth() {
    const { isAuthed } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(isAuthed);

    useEffect(() => {
        if (!isAuthed) {
            navigate("/auth/login");
        }
    }, [isAuthed, location.pathname, navigate]);

    return isAuthed ? <Outlet /> : null;
}
