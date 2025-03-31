import TextareaAutosize from "react-textarea-autosize";
import { FormEvent, useState } from "react";
import useFetch from "../hooks/useFetch";
import { PopulatedUser } from "../types/user";

export default function AddAnswer({
    questionId,
    authorId,
    refreshAnswers,
}: {
    questionId: string | undefined;
    authorId: string | PopulatedUser | undefined;
    refreshAnswers: () => void;
}) {
    const [text, setText] = useState("");
    const [loadingAi, setLoadingAI] = useState(false);

    const [postAnswerForm, { error }] = useFetch<{
        body: string;
    }>("http://localhost:8080/answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const onSubmitHandler = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const answer = {
            questionId,
            authorId,
            content: text,
        };

        await postAnswerForm({
            body: JSON.stringify(answer),
        });

        refreshAnswers?.();

        setText("");
    };

    const onAIAnswerHandler = async () => {
        setLoadingAI(true);
        try {
            const response = await fetch(
                "http://localhost:8080/answers/ai-answer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ questionId }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch AI answer");
            }

            const data = await response.json();

            setText(data.aiAnswer);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAI(false);
        }
    };

    const onCancelHandler = () => {
        setText("");
    };

    return (
        <section>
            {!error && (
                <form
                    onSubmit={onSubmitHandler}
                    id="post_answer_form"
                    className="w-full border-2 p-4 border-onyx rounded-lg shadow-sm bg-inherit"
                >
                    <label htmlFor="answer"></label>
                    <TextareaAutosize
                        id="answer"
                        name="answer"
                        placeholder="Post an answer..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        minRows={2}
                        maxRows={10}
                        className="w-full border-none focus:outline-none resize-none font-mono bg-inherit placeholder-onyx"
                        required
                    />
                    <span className="flex flex-row md:gap-3 justify-center md:justify-end">
                        <button
                            onClick={onCancelHandler}
                            type="reset"
                            form="post_answer_form"
                            className="rounded-lg bg-yellow border-2 border-bittersweet text-onyx sm:pl-1 sm:pr-1 sm:pt-1 sm:pb-1 md:pl-2 md:pr-2 md:pt-1 md:pb-1"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={onAIAnswerHandler}
                            className="rounded-lg bg-yellow border-2 border-bittersweet text-onyx sm:pl-1 sm:pr-1 sm:pt-1 sm:pb-1 md:pl-2 md:pr-2 md:pt-1 md:pb-1"
                        >
                            {loadingAi
                                ? "Loading..."
                                : "Suggest Answer"}
                        </button>

                        <button
                            type="submit"
                            form="post_answer_form"
                            className="rounded-lg bg-yellow border-2 border-bittersweet text-onyx sm:pl-1 sm:pr-1 sm:pt-1 sm:pb-1 md:pl-2 md:pr-2 md:pt-1 md:pb-1"
                        >
                            Post Answer
                        </button>
                    </span>
                </form>
            )}

            {error && (
                <p className="text-center">
                    There was an error with posting your answer.
                    Please refresh the page and try again.
                </p>
            )}
        </section>
    );
}
