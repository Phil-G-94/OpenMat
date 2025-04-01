/**
 * API response types
 */

export interface Answer {
    _id: string;
    questionId: string;
    authorId: {
        username: string;
        createdAt: string;
    };
    content: string;
    upvotes?: number;
    downvotes?: number;
}

export interface PopulatedUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    reputation: number;
    rank: string;
}

export interface Question {
    _id: string;
    title: string;
    description: string;
    authorId: string | PopulatedUser;
    answers: Answer[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface QuestionsResponse {
    message: string;
    questions: Question[];
    limit: number;
    page: number;
    totalPages: number;
}

export interface QuestionResponse {
    question: Question;
    answer: Answer[];
}

export interface LeaderboardEntry {
    username: string;
    answerCount: number;
    reputation?: number;
}

export interface LeaderboardResponse {
    leaderboard: LeaderboardEntry[];
}
