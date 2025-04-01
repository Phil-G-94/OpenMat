import { Answer } from "../types/api";
import Upvote from "./Upvote";
import Downvote from "./Downvote";

export default function Answers({
    answers,
}: {
    answers: Answer[] | undefined;
    refreshAnswers: () => void;
}) {
    return (
        <section className="flex flex-col gap-4">
            {answers?.map((answer) => {
                return (
                    <article
                        className="border-2 border-black rounded-md p-4 flex flex-col gap-4"
                        key={answer._id}
                    >
                        <span className="flex flex-row gap-2">
                            <p>
                                {answer.authorId.username} |{" "}
                                {new Date(
                                    answer.authorId.createdAt
                                ).toLocaleString()}
                            </p>
                        </span>
                        <p className="whitespace-pre-wrap">{answer.content}</p>
                        <div className="flex flex-row gap-2">
                            <Upvote upvotes={answer.upvotes} id={answer._id} />
                            <Downvote downvotes={answer.downvotes} id={answer._id} />
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
