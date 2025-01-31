export type Proposal = {
    id: string | null;
    text: string | null;
}

export type QuizCreator = {
    id: string;
    name: string;
}

export type Question = {
    id: string | null;
    text: string | null;
    image: string | null;
    details: string | null;
    proposals: Proposal[];
    correctProposalIds: number[];
}

export type Quiz = {
    id: string | null;
    themes: string[];
    title: string;
    image: string | null;
    questions: Question[];
    creator: QuizCreator;
}

export const defaultQuestion: Question = {
    details: null,
    id: null,
    image: null,
    proposals: [
        {
            id: null,
            text: null
        },
        {
            id: null,
            text: null
        }
    ],
    text: 'null',
    correctProposalIds: []
}