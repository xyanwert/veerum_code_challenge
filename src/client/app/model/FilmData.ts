import {GeoLocation} from "./GeoLocation";

export class FilmData {

    static fromRaw(raw: any): FilmData {
        let data = new FilmData();
        data.title = raw['title'];
        data.releaseYear = raw['release_year'];
        //TODO: locations: comma-separated values doesnt  really  work, as the locations itself
        // sometimes has "," in them, find an "smart" way to do it, for now use it
        // as is.
        data.locations = raw['locations']/*raw['locations']? raw['locations'].split(",") : [];*/;
        data.funFacts = raw['fun_facts'];
        data.productionCompany = raw['production_company'];
        data.distributor = raw['distributor'];
        data.director = raw['director'];
        data.writer = raw['writer'];

        // cannot assume every item has 3 actors
        data.actors = [];
        if (raw['actor_1']) {
            data.actors.push(raw['actor_1']);
        }

        if (raw['actor_2']) {
            data.actors.push(raw['actor_2']);
        }

        if (raw['actor_3']) {
            data.actors.push(raw['actor_3']);
        }

        return data;
    }

    /**
     * Title
     */
    title: string;

    /**
     * Release Year
     */
    releaseYear: number;

    /**
     * Comma separated values of the
     * locations in San Francisco
     */
    locations: string;

    /**
     * Fun Facts (not used in filter)
     */
    funFacts?: string;

    /**
     * Production Company name
     */
    productionCompany: string;

    /**
     * Distributor
     */
    distributor: string;

    /**
     * Film director (1)
     */
    director: string;

    /**
     * Film writer (1)
     */
    writer: string;

    /**
     * List of actors in order of
     * importance:
     * 0 means Protagonist, 1 means Secondary roles
     */
    actors: string[];


    /**
     * Geo Location, search google maps
     * bias: San Francisco
     */
    public geoLocation: GeoLocation;
}
