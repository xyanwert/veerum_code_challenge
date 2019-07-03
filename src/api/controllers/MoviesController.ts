import {Request, RequestHandler, Response} from "express";
import {SearchService} from "../services/SearchService";
import {DataSFSearchService} from "../services/DataSFSearchService";
import {FilmData} from "../model/FilmData";
import {Controller} from "../../App";

/**
 * Movies controller:
 * will handle any request routed through: '/movies/'
 */
export class MoviesController extends Controller {


    ///////////////////
    /// CLASS       ///
    ///////////////////
    /**
     * Factory pattern: some controllers require initialization
     * to inject services.
     */
    static handle(path: string): MoviesController {
        return new MoviesController(path, DataSFSearchService.get()).initializeRoutes();
    }

    /** hide */
    private constructor(path: string, private searchService: SearchService) {
        super(path);
    }

    initializeRoutes(): MoviesController {
        this.handle("/search/:term?", this.handleSearch);
        return this;
    }


    ///////////////////
    /// HANDLERS    ///
    ///////////////////
    /**
     * Route handler
     * GET -> /movies/search
     * @param request
     * @param response
     */
    handleSearch: RequestHandler =  (request: Request, response: Response) => {
        let searchTerm: string = request.params.term;
        this.getFilmData(searchTerm)
            .catch((error: any) => response.status(500).send(error))
            .then((data: FilmData[]) => {
                response.send(data);
            });
    };

    ///////////////////



    /**
     * Finds film data based on a search parameter
     * this paramter includes author, writer, location, etc.
     * @param searchTerm
     */
     getFilmData(searchTerm?: string): Promise<FilmData[]> {

        if (searchTerm == null || searchTerm.length == 0) {
            return this.searchService.all();
        }

        return this.searchService.search(searchTerm);
    }
}