import { useEffect, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { LeaderboardResponse } from "../types/api";

export default function Leaderboard() {
    const url = useMemo(() => `http://localhost:8080/leaderboard`, []);

    const defaultOptions = useMemo(
        () =>
            ({
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }) as RequestInit,
        []
    );

    const [getLeaderboard, { data }] = useFetch<LeaderboardResponse>(
        url,
        defaultOptions,
        false
    );

    useEffect(() => {
        getLeaderboard();
    }, [getLeaderboard]);

    return (
        <section>
            <h3 className="text-lg text-center font-semibold">Leaderboard</h3>
            <article className="grid grid-cols-2 justify-between just gap-8">
                {data?.leaderboard.map((item) => {
                    return (
                        <div
                            key={item.username}
                            className="flex flex-col items-center"
                        >
                            <p className="text-lg">{item.username}</p>
                            <p>Answers: {item.answerCount}</p>
                            <p>Rep: {item.reputation}</p>
                        </div>
                    );
                })}
            </article>
        </section>
    );
}
