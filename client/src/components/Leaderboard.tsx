import { useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";

interface LeaderboardEntry {
    username: string;
    answerCount: number;
    reputation?: number;
}

interface LeaderboardResponse {
    leaderboard: LeaderboardEntry[];
}

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

    console.log(data);

    return (
        <section>
            {loading && <p>Loading leaderboard...</p>}
            {error && <p>Error loading leaderboard...</p>}
            <h3 className="text-lg font-semibold">Leaderboard</h3>
            <div>
                {data?.leaderboard.map((item) => {
                    return (
                        <div key={item.username}>
                            <p>
                                Username: {item.username} | Answer
                                count: {item.answerCount} | Rep:
                                {item.reputation}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
