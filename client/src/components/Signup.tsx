import { FormEvent } from "react";

export default function Signup() {
    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <section className="flex justify-center">
            <form
                className="flex flex-col justify-center gap-2"
                action="/auth/signup"
                name="signupForm"
                onSubmit={onSubmitHandler}
            >
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="signup_username"
                >
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="signup_username"
                    id="signup_username"
                    autoComplete="username"
                />
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="signup_email"
                >
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="signup_email"
                    id="signup_email"
                    autoComplete="email"
                />
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="signup_password"
                >
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="signup_password"
                    id="signup_password"
                    autoComplete="new-password"
                />
            </form>
        </section>
    );
}
