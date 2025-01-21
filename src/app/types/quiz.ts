export type Proposal = {
    id: number | null;
    text: string | null;
}

export type Question = {
    id: number | null;
    text: string | null;
    image: string | null;
    details: string | null;
    proposals: Proposal[];
    correctProposalIds: number[];
}

export type Quiz = {
    id: number | null;
    themes: string[];
    title: string;
    image: string | null;
    questions: Question[];
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