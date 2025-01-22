import { Outlet } from "react-router";
import PrimaryNavigation from "../components/PrimaryNavigation";

export default function RootLayout() {
    return (
        <main>
            <PrimaryNavigation />
            <Outlet />
        </main>
    );
}
