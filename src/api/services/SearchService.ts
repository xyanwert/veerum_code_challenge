import {FilmData} from "../model/FilmData";

export interface SearchService {
    search(searchTerm?: string): Promise<FilmData[]>;
    all(): Promise<FilmData[]>;
}