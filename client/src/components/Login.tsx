import { FormEvent, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Login() {
    const navigate = useNavigate();
    const { fetchAuthentication } = useAuth();

    const [postLoginUser, { data, loading, error }] = useFetch<{
        username: string;
        password: string;
    }>(
        `${API_BASE_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        false
    );

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!(event.target instanceof HTMLFormElement)) {
            return;
        }

        const formData = new FormData(event.target);

        const formDataObject = Object.fromEntries(formData.entries());

        await postLoginUser({
            body: JSON.stringify(formDataObject),
        });

        await fetchAuthentication();
    };

    useEffect(() => {
        if (!data) return;
        if (data) navigate("/");
    }, [data, navigate]);

    const errorData = !error
        ? []
        : Object.entries(error).map(([key, value]) => ({
              key,
              value: typeof value === "object" ? JSON.stringify(value) : value,
          }));

    return (
        <section className="flex flex-col items-center gap-6">
            <h2 className="text-2xl">Log In</h2>
            <form
                className="flex flex-col gap-2"
                action="/auth/login"
                name="loginForm"
                onSubmit={onSubmitHandler}
            >
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="login_username"
                >
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="login_username"
                    id="login_username"
                    autoComplete="username"
                    required
                />
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="login_password"
                >
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="login_password"
                    id="login_password"
                    autoComplete="current-password"
                    required
                />
                <button className="rounded-full bg-yellow border-2 border-bittersweet text-onyx pl-2 pr-2 pt-1 pb-1">
                    {loading ? "Logging in" : "Log in"}
                </button>
            </form>
            {errorData.map(({ key, value }) => {
                return (
                    <div key={key}>
                        <p className="text-xl text-center text-red-600">{value}</p>
                    </div>
                );
            })}
        </section>
    );
}
