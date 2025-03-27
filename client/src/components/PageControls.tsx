import { BackwardIcon, ForwardIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function PageControls({
    page,
    totalPages,
    setPage,
}: {
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <div className="flex flex-row self-center gap-2 place-items-center md:gap-4 ">
            <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="disabled:text-gray-400"
            >
                <BackwardIcon className="size-6" /> Prev
            </button>
            <span className="hidden sm:inline">
                Page {page} ({totalPages})
            </span>
            <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="disabled:text-gray-400"
            >
                <ForwardIcon className="size-6" />
                Next
            </button>
        </div>
    );
}
