import { NavLink } from "react-router";

export default function PrimaryNavigation() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="signup"> Sign up</NavLink>
                    </li>
                    <li>
                        <NavLink to="login"> Log In </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
