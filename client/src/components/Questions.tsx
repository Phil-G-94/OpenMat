import { useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { QuestionsResponse } from "../types/question";
import QuestionCard from "./QuestionCard";

export default function Questions() {
    const url = useMemo(() => "http://localhost:8080/questions", []);
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
        useFetch<QuestionsResponse>(
            url,
            defaultOptions,
            undefined,
            true
        );

    useEffect(() => {
        const interval = setInterval(() => {
            void getData();
        }, 300000);

        return () => clearInterval(interval);
    }, [getData]);

    return (
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

            {error && <p>{error}</p>}
        </section>
    );
}
