import { Movie } from "./movie";
import { Session } from "./session";

export interface Showtime{
    id: number;
    movie: Movie;
    session: Session;
}