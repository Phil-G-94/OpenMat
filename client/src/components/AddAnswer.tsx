import TextareaAutosize from "react-textarea-autosize";
import { FormEvent, useState } from "react";
import useFetch from "../hooks/useFetch";
import { PopulatedUser } from "../types/question";

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

    const onCancelHandler = () => {
        setText("");
    };

    return (
        <section>
            {!error && (
                <form
                    onSubmit={onSubmitHandler}
                    action=""
                    id="post_answer_form"
                    className="border-2 p-4 border-onyx rounded-lg shadow-sm bg-inherit"
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
                    <span className="flex flex-row gap-3 justify-end">
                        <button
                            onClick={onCancelHandler}
                            type="reset"
                            form="post_answer_form"
                            className="rounded-full bg-yellow border-2 border-bittersweet text-onyx pl-2 pr-2 pt-1 pb-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="post_answer_form"
                            className="rounded-full bg-yellow border-2 border-bittersweet text-onyx pl-2 pr-2 pt-1 pb-1"
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
