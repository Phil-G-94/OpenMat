import { Answer } from "../types/question";

export default function Answers({
    answers,
}: {
    answers: [Answer] | undefined;
}) {
    console.log(answers);

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
                        <span className="flex flex-row gap-2">
                            <p></p>
                            <p>Upvotes: {answer.upvotes}</p>
                            <p>Downvotes: {answer.downvotes}</p>
                        </span>
                    </article>
                );
            })}
        </section>
    );
}
