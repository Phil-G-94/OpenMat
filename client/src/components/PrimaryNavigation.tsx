import { NavLink } from "react-router";

export default function PrimaryNavigation() {
    return (
        <header>
            <nav>
                <ul className="flex flex-row gap-4">
                    <li>
                        <NavLink to="/"> Home </NavLink>
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
