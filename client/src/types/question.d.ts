interface Question {
    _id: string;
    title: string;
    description: string;
    authorId: string;
    answers: [string];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface QuestionsResponse {
    message: string;
    questions: Question[];
}

export { Question, QuestionsResponse };
