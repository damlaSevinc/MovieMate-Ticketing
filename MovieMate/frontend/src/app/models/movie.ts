import { Session } from "./session";

export interface Movie {
    id: number;
    name: string;
    date: Date;
    sessions: Session[]
}