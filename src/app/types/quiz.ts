export type Proposal = {
    text: string | null;
}

export type QuizCreator = {
    id: string;
    name: string;
}

export type Question = {
    text: string | null;
    imageId: string | null;
    details: string | null;
    proposals: Proposal[];
    correctProposalIds: number[];
}

export type Quiz = {
    id: string | null;
    themes: string[];
    title: string;
    imageId: string | null;
    questions: Question[];
    creator: QuizCreator | null;
}

export const defaultQuestion: Question = {
    details: null,
    imageId: null,
    proposals: [
        {
            text: null
        },
        {
            text: null
        }
    ],
    text: 'null',
    correctProposalIds: []
}