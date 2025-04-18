import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

export default function Downvote({
    downvotes,
    id,
}: {
    downvotes: number | undefined;
    id: string;
}) {
    const [currentDownvotes, setCurrentDownvotes] = useState<number | undefined>(
        downvotes
    );

    const [triggerDownvote, { data }] = useFetch<{
        downvotes: number;
    }>(`https://openmatbackend.onrender.com/answers/${id}/downvotes`, {
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
    };

    return (
        <span className="flex flex-row items-center">
            <button onClick={handleDownvote}>
                <ArrowDownCircleIcon className="size-8 fill-bittersweet stroke-black active:scale-110" />
            </button>
            <p>
                {currentDownvotes === 0 ? "" : "-"}
                {currentDownvotes}
            </p>
        </span>
    );
}
