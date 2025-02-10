import { Outlet } from "react-router";
import PrimaryNavigation from "../components/PrimaryNavigation";

export default function RootLayout() {
    return (
        <main>
            <div className="flex h-screen">
                <section className="sticky top-4">
                    <PrimaryNavigation />
                </section>
                <section className="flex-1 ">
                    <Outlet />
                </section>
            </div>
        </main>
    );
}
