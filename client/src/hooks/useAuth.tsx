import { useContext } from "react";
import { AuthContext } from "../context/authCtx";

export default function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Hook must be used within a Provider");
    }

    return context;
}
