import { Question } from "../types/question";
import { PopulatedUser } from "../types/question";

const isUserPopulated = (
    author: string | PopulatedUser
): author is PopulatedUser => {
    return typeof author !== "string" && "username" in author;
};

export default function QuestionCard({
    question,
}: {
    question: Question;
}) {
    return (
        <article>
            <p className="text-xl">{question.title}</p>
            <p>{question.description}</p>
            <p>
                Posted on:{" "}
                {new Date(question.createdAt).toLocaleString()}
            </p>
            <p>
                Posted by:{" "}
                {isUserPopulated(question.authorId)
                    ? question.authorId.username
                    : "Unknown Author"}
            </p>
            <p>
                Rank:{" "}
                {isUserPopulated(question.authorId)
                    ? question.authorId.rank
                    : "Unknown Author"}
            </p>
        </article>
    );
}
