import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";

export default function Upvote({
    upvotes,
    id,
}: {
    upvotes: number | undefined;
    id: string;
}) {
    const [currentUpvotes, setCurrentUpvotes] = useState<number | undefined>(
        upvotes
    );

    const [triggerUpvote, { data }] = useFetch<{
        upvotes: number;
    }>(`https://openmatbackend.onrender.com/answers/${id}/upvotes`, {
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
    };

    return (
        <span className="flex flex-row items-center">
            <button onClick={handleUpvote}>
                <ArrowUpCircleIcon className="size-8 fill-bittersweet stroke-black active:scale-110" />
            </button>
            <p>{currentUpvotes}</p>
        </span>
    );
}
