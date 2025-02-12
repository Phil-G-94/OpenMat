import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { IconArrowBigDown } from "@tabler/icons-react";

export default function Downvote({
    downvotes,
    id,
}: {
    downvotes: number | undefined;
    id: string;
}) {
    const [currentDownvotes, setCurrentDownvotes] = useState<
        number | undefined
    >(downvotes);

    const [triggerDownvote, { loading, error }] = useFetch<{
        downvotes: number;
    }>(`http://localhost:8080/answers/${id}/downvotes`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const handleDownvote = async () => {
        await triggerDownvote();

        if (!loading && !error) {
            setCurrentDownvotes((prev) => (prev ? prev + 1 : prev));
        }
    };

    /**
     * Note:
     * doesn't current render `data` from useFetch
     * instead it optimistically updates the UI, assuming successful increment
     * if !loading and !error
     *
     * doesn't update the page "live" - refresh needed.
     * unexpected behaviour: when currentDownvote value > 0; it will increment as expected, i.e "live"
     * delay otherwise - probably because of the way I set up the useEffect() call in Thread.tsx
     */

    return (
        <span className="flex flex-row">
            <button onClick={handleDownvote}>
                {" "}
                <IconArrowBigDown className="hover:fill-bittersweet hover:animate-bounce" />
            </button>
            <p>{currentDownvotes}</p>
        </span>
    );
}
