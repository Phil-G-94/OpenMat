import { FormEvent } from "react";

export default function Login() {
    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <section>
            <form
                action="/auth/login"
                name="loginForm"
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="login_username">Username</label>
                <input
                    type="text"
                    name="login_username"
                    id="login_username"
                    autoComplete="username"
                />
                <label htmlFor="login_password">Username</label>
                <input
                    type="password"
                    name="login_password"
                    id="login_password"
                    autoComplete="current-password"
                />
            </form>
        </section>
    );
}
