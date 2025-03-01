import { Outlet } from "react-router";
import PrimaryNavigation from "../components/PrimaryNavigation";

export default function RootLayout() {
    return (
        <main className="container mx-auto">
            <section>
                <PrimaryNavigation />
            </section>
            <section>
                <Outlet />
            </section>
        </main>
    );
}
