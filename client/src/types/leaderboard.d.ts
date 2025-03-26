export interface LeaderboardEntry {
    username: string;
    answerCount: number;
    reputation?: number;
}

export interface LeaderboardResponse {
    leaderboard: LeaderboardEntry[];
}
