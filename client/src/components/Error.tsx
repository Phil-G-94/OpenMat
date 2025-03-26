import { useRouteError } from "react-router-dom";

export default function Error() {
    const routeError = useRouteError() as {
        data: string;
        status: number;
        statusText: string;
    };

    return (
        <section>
            <h1>Error {routeError.status}</h1>
            <div>
                <ul>
                    <li>{routeError.statusText}</li>

                    <li>{routeError.data}</li>
                </ul>
            </div>
        </section>
    );
}
