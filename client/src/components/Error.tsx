import { useRouteError } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function Error() {
    let errorText;

    const routeError = useRouteError() as {
        data: string;
        status: number;
        statusText: string;
    };

    if (routeError) {
        errorText = (
            <div>
                <h1 className="text-4xl text-center">
                    Error {routeError.status}
                </h1>
                <p className="text-center">{routeError.statusText}</p>
                <p className="text-center">{routeError.data}</p>
            </div>
        );
    }

    return (
        <section>
            <article>
                <section className="flex flex-col items-center">
                    <ExclamationCircleIcon className="size-64 fill-bittersweet stroke-black" />
                    {errorText}
                </section>
            </article>
        </section>
    );
}
