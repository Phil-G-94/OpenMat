import { useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import { QuestionsResponse } from "../types/question";
import QuestionCard from "./QuestionCard";
import Leaderboard from "./Leaderboard";
import PageControls from "./PageControls";

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

    const [getData, { data, loading }] = useFetch<QuestionsResponse>(
        url,
        defaultOptions,
        true
    );

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

                <article className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <section className="col-span-full md:col-span-1 p-2">
                        {data && <Leaderboard />}
                    </section>

                    <section className="col-span-full md:col-span-2">
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
                <PageControls
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            )}
        </>
    );
}
