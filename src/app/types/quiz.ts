export interface Proposal {
    text: string | null;
}

export interface QuizCreator {
    id: string;
    name: string;
}

export interface Question {
    text: string | null;
    imageId: string | null;
    details: string | null;
    proposals: Proposal[];
    correctProposalIds: number[];
}

export interface Quiz {
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