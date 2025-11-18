import type { DetailBook } from "./Book";

export interface Loan {
    id: number;
    bookId: number;
    userId: number;
    isDone: boolean;
    isLate: boolean;
    returnDate: string;
    photo: string;
    isDamaged: boolean;
    book: DetailBook
}