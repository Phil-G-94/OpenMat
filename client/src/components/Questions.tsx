import { useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import { QuestionsResponse } from "../types/question";
import QuestionCard from "./QuestionCard";

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

                {loading ? (
                    <p className="text-center">Loading...</p>
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

            {!loading && (
                <div className="flex flex-row gap-6 justify-center">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        ⬅ Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next ➡
                    </button>
                </div>
            )}

            {error && <p>{error}</p>}
        </>
    );
}
