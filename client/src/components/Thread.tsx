import { useParams } from "react-router";
import { QuestionResponse } from "../types/question";
import useFetch from "../hooks/useFetch";
import { useMemo } from "react";
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

    const [, { data, loading, error }, refreshAnswers] =
        useFetch<QuestionResponse>(url, defaultOptions, true);

    const question = data?.question;

    const answers = data?.question.answers;

    return (
        <div className="grid grid-cols-2 justify-items-center gap-6">
            <div className="col-span-full">
                <QuestionDetail
                    question={question}
                    error={error}
                    loading={loading}
                />
            </div>
            <div className="col-span-full w-1/2">
                <AddAnswer
                    questionId={questionId}
                    authorId={question?.authorId}
                    refreshAnswers={refreshAnswers}
                />
            </div>

            <div className="col-span-full w-1/2">
                <Answers
                    answers={answers}
                    refreshAnswers={refreshAnswers}
                />
            </div>
        </div>
    );
}
