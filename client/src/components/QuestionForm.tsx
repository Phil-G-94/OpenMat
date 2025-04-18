import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useFetch } from "../hooks/useFetch";

export default function QuestionForm() {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [postQuestionForm, { loading, error }] = useFetch<{
        title: string;
        body: string;
    }>(
        "https://openmatbackend.onrender.com/questions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        false
    );

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!(event.target instanceof HTMLFormElement)) {
            return;
        }

        const form = event.currentTarget;

        const formData = new FormData(event.target);

        const formDataObject = Object.fromEntries(formData.entries());

        await postQuestionForm({
            body: JSON.stringify(formDataObject),
        });

        form.reset();

        navigate("/");
    };

    const errorData = !error
        ? []
        : Object.entries(error).map(([key, value]) => ({
              key,
              value: typeof value === "object" ? JSON.stringify(value) : value,
          }));

    return (
        <section className="flex flex-col items-center">
            <h2 className="text-2xl">Ask a question!</h2>
            <form
                id="post_question_form"
                className="flex flex-col gap-2"
                onSubmit={onSubmitHandler}
            >
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="post_title"
                >
                    Title
                </label>
                <input
                    className="shadow appearance-none border rounded"
                    type="text"
                    name="post_title"
                    id="post_title"
                    required
                />
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="post_body"
                >
                    Body
                </label>

                <TextareaAutosize
                    id="post_body"
                    name="post_body"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    minRows={10}
                    maxRows={20}
                    className="w-full border-none focus:outline-none resize-none placeholder-onyx"
                    required
                />
                <button className="rounded-full bg-yellow border-2 border-bittersweet text-onyx pl-2 pr-2 pt-1 pb-1">
                    {loading ? "Posting" : "Post"}
                </button>
            </form>

            {errorData.map(({ key, value }) => {
                return (
                    <div key={key}>
                        <p className="text-xl text-center text-red-600">{value}</p>
                    </div>
                );
            })}
        </section>
    );
}
