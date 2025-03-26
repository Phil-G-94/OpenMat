import { useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import { QuestionsResponse } from "../types/question";
import QuestionCard from "./QuestionCard";
import Leaderboard from "./Leaderboard";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/16/solid";

const ITEMS_PER_PAGE = 4;

export default function Questions() {
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const url = useMemo(
        () =>
            `http://localhost:8080/questions?page=${page}&limit=${ITEMS_PER_PAGE}`,
        [page]
    );

    const defaultOptions = useMemo(
        () =>
            ({
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }) as RequestInit,
        []
    );

    const [getData, { data, loading, error }] =
        useFetch<QuestionsResponse>(url, defaultOptions, true);

    useEffect(() => {
        void getData();
    }, [getData, page]);

    useEffect(() => {
        if (data?.totalPages) {
            setTotalPages(data.totalPages);
        }
    }, [data]);

    return (
        <>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl text-center">Questions</h2>

                <article className="grid grid-cols-1 md:grid-cols-3 place-items-center">
                    <section className="col-span-1 self-start">
                        <Leaderboard />
                    </section>

                    <section>
                        {loading ? (
                            <p className="text-center">
                                Loading questions...
                            </p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {data?.questions.map((question) => {
                                    return (
                                        <QuestionCard
                                            key={question._id}
                                            question={question}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </article>

                {data?.questions.length === 0 && (
                    <p className="text-center">
                        No questions - ask one!
                    </p>
                )}
            </section>

            {!loading && (
                <div className="flex flex-row gap-[0.25em] sm:gap-2 md:gap-4 place-items-center fixed top-3/4">
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
            )}

            {error && <p>{error}</p>}
        </>
    );
}
