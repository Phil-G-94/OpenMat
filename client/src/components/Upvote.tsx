import { useEffect, useState } from "react";
import { IconArrowBigUp } from "@tabler/icons-react";
import useFetch from "../hooks/useFetch";

export default function Upvote({
    upvotes,
    id,
    // onUpvoteSuccess,
}: {
    upvotes: number | undefined;
    id: string;
    // onUpvoteSuccess: () => void;
}) {
    const [currentUpvotes, setCurrentUpvotes] = useState<
        number | undefined
    >(upvotes);

    const [triggerUpvote, { data }] = useFetch<{
        upvotes: number;
    }>(`http://localhost:8080/answers/${id}/upvotes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
    });

    useEffect(() => {
        if (data?.upvotes !== undefined) {
            setCurrentUpvotes(data.upvotes);
        }
    }, [data]);

    const handleUpvote = async () => {
        await triggerUpvote();
        // onUpvoteSuccess?.(); // refresh answer if needed
    };

    return (
        <span className="flex flex-row">
            <button onClick={handleUpvote}>
                <IconArrowBigUp className="hover:fill-bittersweet hover:animate-bounce" />
            </button>
            <p>{currentUpvotes}</p>
        </span>
    );
}
