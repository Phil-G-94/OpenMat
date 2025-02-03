import { useParams } from "react-router";
import { QuestionResponse } from "../types/question";
import useFetch from "../hooks/useFetch";
import { useEffect, useMemo } from "react";
import AddAnswer from "./AddAnswer";
import Answers from "./Answers";
import QuestionDetail from "./QuestionDetail";

export default function Thread() {
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
        useFetch<QuestionResponse>(url, defaultOptions, true, true);

    const question = data?.question;

    const answers = data?.question.answers;

    useEffect(() => {
        /* needs more work */

        const interval = setInterval(() => {
            void getQuestion();
        }, 60000);

        return () => clearInterval(interval);
    }, [getQuestion, data]);

    return (
        <div className="grid grid-cols-2 justify-items-center gap-6">
            <div className="col-span-full">
                <QuestionDetail
                    question={question}
                    error={error}
                    loading={loading}
                />
            </div>
            <div className="col-span-full w-full">
                <AddAnswer
                    questionId={questionId}
                    authorId={question?.authorId}
                />
            </div>

            <div className="col-span-full w-1/2">
                <Answers answers={answers} />
            </div>
        </div>
    );
}
