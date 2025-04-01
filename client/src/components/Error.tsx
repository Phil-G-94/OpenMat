import { useRouteError } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function Error() {
    const routeError = useRouteError() as {
        data: string;
        error: {
            message: string;
            stack: string;
        };
        status: number;
        statusText: string;
    };

    const errorText = (
        <div>
            <h1 className="text-4xl text-center">
                {routeError.status} Error: {routeError.statusText}
            </h1>
            <p className="text-xl text-center">{routeError.error.message}</p>
        </div>
    );

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
