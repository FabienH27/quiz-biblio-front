import { Proposal, Question, Quiz } from "./quiz";

type QuizPayload = Omit<Quiz, 'id' | 'questions'> & {
    questions: (Omit<Question, 'id' | 'proposals'> & {
      proposals: Omit<Proposal, 'id'>[];
    })[];
};

export function prepareQuizPayload(quiz: Quiz): QuizPayload {
    return {
        title: quiz.title,
        themes: quiz.themes,
        image: quiz.image ?? null,
        questions: quiz.questions.map((q) => ({
            ...q,
            proposals: q.proposals.map(({ id, ...rest }) => rest),
        })).map(({ id, ...rest }) => rest),
        creator: quiz.creator
    };
}