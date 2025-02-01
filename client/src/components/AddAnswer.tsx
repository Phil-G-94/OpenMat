import TextareaAutosize from "react-textarea-autosize";
import { FormEvent, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { PopulatedUser } from "../types/question";

export default function AddAnswer({
    questionId,
    authorId,
}: {
    questionId: string | undefined;
    authorId: string | PopulatedUser | undefined;
}) {
    const [text, setText] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const [postAnswerForm, { error }] = useFetch<{
        body: string;
    }>(
        "http://localhost:8080/answers",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        false,
        false
    );

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

        setText("");
    };

    const onCancelHandler = () => {
        setText("");
    };

    return (
        <section>
            {!error && (
                <form
                    ref={formRef}
                    onSubmit={onSubmitHandler}
                    action=""
                    id="post_answer_form"
                    className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                >
                    <label htmlFor="answer"></label>
                    <TextareaAutosize
                        name="answer"
                        className="w-full p-2 text-gray-800 border-none focus:outline-none resize-none font-mono"
                        placeholder="Post an answer..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        minRows={2}
                        maxRows={10}
                    />
                    <span className="flex flex-row gap-3 justify-end">
                        <button
                            onClick={onCancelHandler}
                            type="reset"
                            form="post_answer_form"
                        >
                            Cancel
                        </button>
                        <button type="submit" form="post_answer_form">
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
