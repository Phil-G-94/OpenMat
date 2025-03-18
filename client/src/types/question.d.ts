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

export { Question, QuestionsResponse, QuestionResponse };
