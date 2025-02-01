import TextareaAutosize from "react-textarea-autosize";
import { FormEvent, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function AddAnswer() {
    const [text, setText] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const [postAnswerForm, { loading, error }] = useFetch<{
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

        if (!(event.target instanceof HTMLFormElement)) {
            return;
        }

        const form = event.currentTarget;

        const formData = new FormData(event.target);

        const formDataObject = Object.fromEntries(formData.entries());

        await postAnswerForm({
            body: JSON.stringify(formDataObject),
        });

        form.reset();
    };

    const onCancelHandler = () => {
        setText("");
    };

    return (
        <section>
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
        </section>
    );
}
