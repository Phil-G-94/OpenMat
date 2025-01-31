import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

export default function AddAnswer() {
    const [text, setText] = useState("");

    return (
        <section>
            <form
                action=""
                id="add_answer"
                className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
                <label htmlFor=""></label>
                <TextareaAutosize
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    minRows={2}
                    maxRows={10}
                    className="w-full p-2 text-gray-800 border-none focus:outline-none resize-none font-mono"
                />
                <span className="flex flex-row gap-3 justify-end">
                    <button>Cancel</button>
                    <button>Post Answer</button>
                </span>
            </form>
        </section>
    );
}
