interface PopulatedUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    reputation: number;
    rank: string;
}

interface Question {
    _id: string;
    title: string;
    description: string;
    authorId: string | PopulatedUser;
    answers: [string];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface QuestionsResponse {
    message: string;
    questions: Question[];
}

export { Question, QuestionsResponse, PopulatedUser };
