import { FormEvent } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
    const navigate = useNavigate();
    const [postSignupUser, { loading, error }] = useFetch<{
        username: string;
        email: string;
        password: string;
    }>(
        `${API_BASE_URL}/auth/signup`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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

        await postSignupUser({
            body: JSON.stringify(formDataObject),
        });

        event.target.reset();
        navigate("/auth/login");
    };

    const errorData = !error
        ? []
        : Object.entries(error).map(([key, value]) => ({
              key,
              value: typeof value === "object" ? JSON.stringify(value) : value,
          }));

    return (
        <section className="flex flex-col items-center gap-6">
            <h2 className="text-2xl">Sign up</h2>
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
                    required
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
                    required
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
                    required
                />
                <button className="rounded-full bg-yellow border-2 border-bittersweet text-onyx pl-2 pr-2 pt-1 pb-1">
                    {loading ? `Signing up` : `Sign up`}
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
