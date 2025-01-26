import { FormEvent } from "react";
import useFetch from "../hooks/useFetch";

export default function QuestionForm() {
    const [postQuestionForm, { loading, error }] = useFetch<{
        title: string;
        body: string;
    }>(
        "http://localhost:8080/questions",
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

        await postQuestionForm({
            body: JSON.stringify(formDataObject),
        });

        form.reset();
    };

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
                />
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="post_body"
                >
                    Body
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-72 h-56 text-wrap"
                    name="post_body"
                    id="post_body"
                />
                <button>{loading ? "Posting" : "Post"}</button>
            </form>

            {error && <p>{error}</p>}
        </section>
    );
}
