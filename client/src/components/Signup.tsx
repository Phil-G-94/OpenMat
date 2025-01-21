import { FormEvent } from "react";

export default function Signup() {
    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <section>
            <form
                action="/auth/signup"
                name="signupForm"
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="">
                    <input
                        type="text"
                        name="signup_username"
                        id="signup_username"
                        autoComplete="username"
                    />
                </label>
                <label htmlFor="">
                    <input
                        type="email"
                        name="signup_email"
                        id="signup_email"
                        autoComplete="email"
                    />
                </label>
                <label htmlFor="">
                    <input
                        type="password"
                        name="signup_password"
                        id="signup_password"
                        autoComplete="new-password"
                    />
                </label>
            </form>
        </section>
    );
}
