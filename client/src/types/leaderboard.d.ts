interface LeaderboardEntry {
    username: string;
    answerCount: number;
    reputation?: number;
}

interface LeaderboardResponse {
    leaderboard: LeaderboardEntry[];
}

export { LeaderboardResponse };
