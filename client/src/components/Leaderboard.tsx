import { useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { LeaderboardResponse } from "../types/leaderboard";

export default function Leaderboard() {
    const url = useMemo(
        () => `http://localhost:8080/leaderboard`,
        []
    );

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

    const [getLeaderboard, { data, loading, error }] =
        useFetch<LeaderboardResponse>(url, defaultOptions, false);

    useEffect(() => {
        getLeaderboard();
    }, [getLeaderboard]);

    return (
        <section>
            {loading && <p>Loading leaderboard...</p>}
            {error && <p>Error loading leaderboard...</p>}
            <h3 className="text-lg text-center font-semibold">
                Leaderboard
            </h3>
            <article className="grid grid-cols-3 gap-2">
                {data?.leaderboard.map((item) => {
                    return (
                        <div key={item.username}>
                            <p className="col-span-1">
                                Username: {item.username}
                            </p>
                            <p className="col-span-2">
                                Answer count: {item.answerCount}
                            </p>
                            <p className="col-span-3">
                                Rep: {item.reputation}
                            </p>
                        </div>
                    );
                })}
            </article>
        </section>
    );
}
