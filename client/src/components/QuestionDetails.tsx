import { useParams } from "react-router";
import { QuestionResponse, PopulatedUser } from "../types/question";
import useFetch from "../hooks/useFetch";
import { useEffect, useMemo } from "react";
import AddAnswer from "./AddAnswer";

export default function QuestionDetail() {
    const { questionId } = useParams<{ questionId: string }>();

    const url = useMemo(
        () => `http://localhost:8080/questions/${questionId}`,
        [questionId]
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

    const [getQuestion, { data, loading, error }] =
        useFetch<QuestionResponse>(
            url,
            defaultOptions,
            undefined,
            true
        );

    const question = data?.question;

    console.log(data);

    const isUserPopulated = (
        author: string | PopulatedUser
    ): author is PopulatedUser => {
        return typeof author !== "string" && "username" in author;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            void getQuestion();
        }, 300000);

        return () => clearInterval(interval);
    }, [getQuestion]);

    return (
        <>
            <article>
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-2xl">{question?.title}</p>
                        <p>{question?.description}</p>
                        <div className="flex flex-row justify-evenly gap-6">
                            <p>
                                Posted on:{" "}
                                {question?.createdAt
                                    ? new Date(
                                          question?.createdAt
                                      ).toLocaleString()
                                    : "Unknown date"}
                            </p>
                            <p>
                                Posted by:{" "}
                                {question?.authorId &&
                                isUserPopulated(question?.authorId)
                                    ? question.authorId.username
                                    : "Unknown Author"}
                            </p>
                            <p>
                                Rank:{" "}
                                {question?.authorId &&
                                isUserPopulated(question?.authorId)
                                    ? question.authorId.rank
                                    : "Unknown Author"}
                            </p>
                        </div>
                    </div>
                )}
                {error && <p>{error}</p>}
            </article>
            <AddAnswer />
        </>
    );
}
