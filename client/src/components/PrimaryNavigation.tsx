import { NavLink } from "react-router-dom";

export default function PrimaryNavigation() {
    return (
        <header className="sticky top-5">
            <nav>
                <ul className="flex flex-col gap-4">
                    <li>
                        <NavLink to="/"> Home </NavLink>
                    </li>
                    <li>
                        <NavLink to="questions">
                            Post Question
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="auth/signup"> Sign up </NavLink>
                    </li>
                    <li>
                        <NavLink to="auth/login"> Log In </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
