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
    answers: [Answer];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Answer {
    _id: ObjectId;
    questionId: ObjectId;
    authorId: ObjectId;
    content: string;
    upvotes?: number;
    downvotes?: number;
}

interface QuestionsResponse {
    message: string;
    questions: Question[];
    limit: number;
    page: number;
    totalPages: number;
}

interface QuestionResponse {
    question: Question;
    answer: Answer[];
}

export {
    PopulatedUser,
    Question,
    Answer,
    QuestionsResponse,
    QuestionResponse,
};
