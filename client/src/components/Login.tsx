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
                <label>
                    <input
                        type="text"
                        name="login_username"
                        id="login_username"
                        autoComplete="username"
                    />
                    <input
                        type="password"
                        name="login_password"
                        id="login_password"
                        autoComplete="current-password"
                    />
                </label>
            </form>
        </section>
    );
}
