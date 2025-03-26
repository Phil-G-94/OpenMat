export interface Question {
    _id: string;
    title: string;
    description: string;
    authorId: string | PopulatedUser;
    answers: [Answer];
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
