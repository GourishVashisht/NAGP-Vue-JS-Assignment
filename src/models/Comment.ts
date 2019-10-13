import { Author } from "./Common";

export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
}
