interface Answer {
    _id: ObjectId;
    questionId: ObjectId;
    authorId: ObjectId;
    content: string;
    upvotes?: number;
    downvotes?: number;
}

export { Answer };
