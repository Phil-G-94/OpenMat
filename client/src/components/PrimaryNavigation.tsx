import { NavLink } from "react-router-dom";

export default function PrimaryNavigation() {
    return (
        <header className="sticky top-5">
            <nav>
                <ul className="flex flex-col gap-4">
                    <li className="hover:underline hover:underline-offset-4 hover:decoration-bittersweet hover:decoration-[0.25rem]">
                        <NavLink to="/"> Home </NavLink>
                    </li>
                    <li className="hover:underline hover:underline-offset-4 hover:decoration-bittersweet hover:decoration-[0.25rem]">
                        <NavLink to="questions">
                            Post Question
                        </NavLink>
                    </li>

                    <li className="hover:underline hover:underline-offset-4 hover:decoration-bittersweet hover:decoration-[0.25rem]">
                        <NavLink to="auth/signup"> Sign up </NavLink>
                    </li>
                    <li className="hover:underline hover:underline-offset-4 hover:decoration-bittersweet hover:decoration-[0.25rem]">
                        <NavLink to="auth/login"> Log In </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
