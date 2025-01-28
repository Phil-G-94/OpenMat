import { Question } from "../types/question";

export default function QuestionCard({
    question,
}: {
    question: Question;
}) {
    return (
        <article key={question._id}>
            <p className="text-xl">{question.title}</p>
            <p>{question.description}</p>
            <p>{new Date(question.createdAt).toLocaleString()}</p>
        </article>
    );
}
