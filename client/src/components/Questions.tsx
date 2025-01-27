import { useState, useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";

export default function Questions() {
    interface Question {
        _id: string;
        title: string;
        description: string;
        authorId: string;
        answers: [string];
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    interface QuestionsResponse {
        message: string;
        questions: Question[];
    }

    const [dataUpdateTrigger, setDataUpdateTrigger] = useState(false);
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

    const [, { data, loading, error }] = useFetch<QuestionsResponse>(
        url,
        defaultOptions,
        dataUpdateTrigger,
        true
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setDataUpdateTrigger((prev) => !prev);
        }, 300000);

        return () => clearInterval(interval);
    }, [data]);

    /* work on data, loading, error */

    return (
        <section>
            <h2>The Questions component</h2>
            <p>Where we display all the stored questions</p>
        </section>
    );
}
