import { Question, PopulatedUser } from "../types/question";

export default function QuestionDetail({
    question,
    error,
    loading,
}: {
    question: Question | undefined;
    error: string | null;
    loading: boolean;
}) {
    const isUserPopulated = (
        author: string | PopulatedUser
    ): author is PopulatedUser => {
        return typeof author !== "string" && "username" in author;
    };

    return (
        <section>
            <article className="w-full">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-2xl">{question?.title}</p>
                        <p>{question?.description}</p>
                        <div className="flex flex-row justify-evenly gap-6">
                            <p>
                                Posted on:{" "}
                                {question?.createdAt
                                    ? new Date(
                                          question?.createdAt
                                      ).toLocaleString()
                                    : "Unknown date"}
                            </p>
                            <p>
                                Posted by:{" "}
                                {question?.authorId &&
                                isUserPopulated(question?.authorId)
                                    ? question.authorId.username
                                    : "Unknown Author"}
                            </p>
                            <p>
                                Rank:{" "}
                                {question?.authorId &&
                                isUserPopulated(question?.authorId)
                                    ? question.authorId.rank
                                    : "Unknown Author"}
                            </p>
                        </div>
                    </div>
                )}
                {error && <p>{error}</p>}
            </article>
        </section>
    );
}
