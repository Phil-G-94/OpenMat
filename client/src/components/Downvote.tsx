import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { IconArrowBigDown } from "@tabler/icons-react";

export default function Downvote({
    downvotes,
    id,
    // onDownvoteSuccess,
}: {
    downvotes: number | undefined;
    id: string;
    // onDownvoteSuccess: () => void;
}) {
    const [currentDownvotes, setCurrentDownvotes] = useState<
        number | undefined
    >(downvotes);

    const [triggerDownvote, { data }] = useFetch<{
        downvotes: number;
    }>(`http://localhost:8080/answers/${id}/downvotes`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });

    useEffect(() => {
        if (data?.downvotes !== undefined) {
            setCurrentDownvotes(data.downvotes);
        }
    }, [data]);

    const handleDownvote = async () => {
        await triggerDownvote();
        // onDownvoteSuccess?.(); // refresh answers if needed
    };

    return (
        <span className="flex flex-row">
            <button onClick={handleDownvote}>
                <IconArrowBigDown className="hover:fill-bittersweet hover:animate-bounce" />
            </button>
            <p>{currentDownvotes}</p>
        </span>
    );
}
