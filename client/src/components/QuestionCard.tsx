import { Link } from "react-router-dom";
import { Question } from "../types/question";
export default function QuestionCard({
    question,
}: {
    question: Question;
}) {
    return (
        <Link to={`/questions/${question._id}`}>
            <article className="border-2 border-y-yellow border-x-0">
                <p className="text-xl">{question.title}</p>
                <p className="whitespace-pre-wrap">
                    {question.description}
                </p>
                <p>
                    Posted on:{" "}
                    {new Date(question.createdAt).toLocaleString()}
                </p>
            </article>
        </Link>
    );
}
