import { FormEvent } from "react";

export default function Login() {
    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
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
                <button className="text-lg">Log In</button>
            </form>
        </section>
    );
}
