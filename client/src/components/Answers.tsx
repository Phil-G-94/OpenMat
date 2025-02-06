import { Answer } from "../types/question";
import Upvote from "./Upvote";
import Downvote from "./Downvote";

export default function Answers({
    answers,
}: {
    answers: [Answer] | undefined;
}) {
    return (
        <section>
            {answers?.map((answer) => {
                return (
                    <article
                        className="border-2 border-black rounded-md p-4"
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
                        <p>{answer.content}</p>
                        <div className="flex flex-row gap-2">
                            <Upvote
                                upvotes={answer.upvotes}
                                id={answer._id}
                            />
                            <Downvote
                                downvotes={answer.downvotes}
                                id={answer._id}
                            />
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
