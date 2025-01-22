import { Outlet } from "react-router";
import PrimaryNavigation from "../components/PrimaryNavigation";

export default function RootLayout() {
    return (
        <main className="container mx-auto">
            <PrimaryNavigation />
            <Outlet />
        </main>
    );
}
