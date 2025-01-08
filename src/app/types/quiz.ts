export type Proposal = {
    text: string | null;
    isValid: boolean;
}

export type Question = {
    question: string | null;
    image: string | null;
    details: string | null;
    proposals: Proposal[];
}

export type Quiz = {
    title: string | null;
    image: string | null;
    questions:  Question[];
}

export const defaultQuestion: Question = {
    details: null,
    image: null,
    proposals: [
        {
            isValid: false,
            text: null
        },
        {
            isValid: false,
            text: null
        }
    ],
    question: null
}