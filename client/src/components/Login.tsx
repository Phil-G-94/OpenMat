import { FormEvent } from "react";
import useFetch from "../hooks/useFetch";

export default function Login() {
    const [postLoginUser, { loading, error }] = useFetch<{
        username: string;
        password: string;
    }>(
        "http://localhost:8080/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        },
        false,
        false
    );

    const onSubmitHandler = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!(event.target instanceof HTMLFormElement)) {
            return;
        }

        const formData = new FormData(event.target);

        const formDataObject = Object.fromEntries(formData.entries());

        await postLoginUser({
            body: JSON.stringify(formDataObject),
        });
    };

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
                />
                <button className="text-lg">
                    {loading ? "Logging in" : "Log in"}
                </button>
            </form>

            {error && <p>{error}</p>}
        </section>
    );
}
