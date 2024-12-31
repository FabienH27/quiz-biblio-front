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