import { useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";

interface LeaderboardEntry {
    username: string;
    answerCount: number;
    reputation?: number;
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
        useFetch<LeaderboardEntry>(url, defaultOptions, false);

    useEffect(() => {
        getLeaderboard();
    }, [getLeaderboard]);

    console.log(data);

    return (
        <section>
            {loading && <p>Loading leaderboard...</p>}
            {error && <p>Error loading leaderboard...</p>}
            <div>{/* iterate over data */}</div>
        </section>
    );
}
