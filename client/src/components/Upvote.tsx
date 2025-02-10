import { useState } from "react";
import { IconArrowBigUp } from "@tabler/icons-react";
import useFetch from "../hooks/useFetch";

export default function Upvote({
    upvotes,
    id,
}: {
    upvotes: number | undefined;
    id: string;
}) {
    const [currentUpvotes, setCurrentUpvotes] = useState<
        number | undefined
    >(upvotes);

    const [triggerUpvote, { loading, error }] = useFetch<{
        upvotes: number;
    }>(`http://localhost:8080/answers/${id}/upvotes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
    });

    const handleUpvote = async () => {
        await triggerUpvote();

        if (!loading && !error) {
            setCurrentUpvotes((prev) => (prev ? prev + 1 : prev));
        }
    };

    /**
     * Note:
     * works but...
     * doesn't current render `data` from useFetch
     * instead it optimistically updates the UI, assuming successful increment
     * if !loading and !error.
     *
     * doesn't update the page "live" - refresh needed.
     * unexpected behaviour: when currentDownvote value > 0; it will increment as expected, i.e "live"
     * delay otherwise - probably because of the way I set up the useEffect() call in Thread.tsx
     */

    return (
        <span className="flex flex-row">
            <button onClick={handleUpvote}>
                <IconArrowBigUp className="hover:fill-bittersweet hover:animate-bounce" />
            </button>
            <p>{currentUpvotes}</p>
        </span>
    );
}
