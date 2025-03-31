import { useRouteError } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function Error() {
    let errorText;

    const routeError = useRouteError() as {
        data: string;
        status: number;
        statusText: string;
    };

    const cause = routeError.data.split(": ")[1];

    if (routeError.status === 404) {
        errorText = (
            <div>
                <h1 className="text-4xl text-center">
                    404 Error: Page not found!
                </h1>
                <p className="text-center">{cause}</p>
            </div>
        );
    }

    if (routeError.status === 401) {
        errorText = (
            <div className="flex justify-center">
                <h1 className="text-4xl text-center">
                    401 Error: Unauthorised request!
                </h1>
                <p className="text-center">{cause}</p>
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
