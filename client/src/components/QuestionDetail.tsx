import { FetchError } from "../hooks/useFetch";
import { Question, PopulatedUser } from "../types/api";

export default function QuestionDetail({
    question,
    error,
    loading,
}: {
    question: Question | undefined;
    error: FetchError | null;
    loading: boolean;
}) {
    const isUserPopulated = (
        author: string | PopulatedUser
    ): author is PopulatedUser => {
        return typeof author !== "string" && "username" in author;
    };

    const errorData = !error
        ? []
        : Object.entries(error).map(([key, value]) => ({
              key,
              value: typeof value === "object" ? JSON.stringify(value) : value,
          }));

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
                                    ? new Date(question?.createdAt).toLocaleString()
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
                {errorData.map(({ key, value }) => {
                    return (
                        <div key={key}>
                            <p className="text-xl text-center text-red-600">
                                {value}
                            </p>
                        </div>
                    );
                })}
            </article>
        </section>
    );
}
