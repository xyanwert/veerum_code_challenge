import {SearchService} from "./SearchService";
import {FilmData} from "../model/FilmData";
import {MapsService} from "./MapsService";
import {GeoLocation} from "../model/GeoLocation";
import {GoogleMapsService} from "./GoogleMapsService";
const soda = require('soda-js');
import * as GeoLocationsBuffer from '../../geo-location-buffer.json'

/**
 * Search service that will requiere to obtain the data
 * from the DataSF web service
 * `https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am`
 * Dataset Identifier: wwmu-gmzc
 * Total Rows: 1622
 * Source Domain: data.sfgov.org
 * Created: 2011-11-10, 11:13:33 AM
 * Last Updated: 2017-10-27, 5:24:53 PM
 * Category: Culture and Recreation
 * Attribution: San Francisco Film Commission
 */
export class DataSFSearchService implements SearchService {

    ///////////////////
    /// CLASS       ///
    ///////////////////

    /**
     * considering that last update was 2017-10-27
     * and the total rows at the time was 1622
     * this should be enough.
     * Note: there is not value that will set a 'limit=none'
     * */
    private static TotalRows = 1800;

    /**
     * Source Domain: data.sfgov.org
     */
    private static SourceDomain = 'data.sfgov.org';

    /**
     * Dataset Identifier: wwmu-gmzc
     */
    private static DatasetIdentifier = 'wwmu-gmzc';

    /**
     * Factory pattern, some services requiere initialization and additional
     * services to be injected
     */
    static get(): DataSFSearchService {
        return new DataSFSearchService(GoogleMapsService.sanFrancisco(process.env.GoogleApiKey))
    }

    ///////////////////
    /// INSTANCE    ///
    ///////////////////

    /** hide */
    private constructor(private googleMapsService: MapsService){}

    /**
     * Simply return all data
     * https://data.sfgov.org/resource/wwmu-gmzc.json
     */
    all(): Promise<FilmData[]>{
        return this.search(null);
    }

    /**
     * Find film data using any
     * search term, this can include authors, location, writers, etc.
     * @param searchTerm
     */
    search(searchTerm?: string): Promise<FilmData[]> {

        return new Promise<FilmData[]>((resolve, reject) => {

            let consumer = new soda.Consumer(DataSFSearchService.SourceDomain);

            consumer.query()
                .withDataset(DataSFSearchService.DatasetIdentifier)
                .limit(searchTerm ? DataSFSearchService.TotalRows : 400) // default to only 400 records if there is not search term
                .q(searchTerm)
                .getRows()
                .on('success', function(rows: any[]) {
                    let allFilmData: FilmData[] = rows
                        .map(raw => FilmData.fromRaw(raw))
                        .filter(filmData => filmData.locations != null); // we are no interested in films with no locations
                    resolve(allFilmData);
                })
                .on('error', function(error: any) {
                    console.error(error);
                    reject(error);
                });
        })
            .then((allFilmData: FilmData[]) => {

                // return allFilmData;
                let allGeoDataPromises: Promise<FilmData>[] = [];

                allFilmData.forEach(filmData => {
                    allGeoDataPromises.push(this.findFilmGeoLocation(filmData))
                });

                return Promise.all(allGeoDataPromises)

            })
            .then((filmWithGeoLocation: FilmData[]) => {
                // remove also those where the geo-location cannot be found, aka is null
                return filmWithGeoLocation.filter(film => film.geoLocation != null);
            });
    }


    /**
     * Finds the geo-location for the film location
     * First it will try to find the location in the locations buffer
     * this is an static places buffer created and shipped with the service
     * based in the fact that those location will never change, so we are saving up to 1600+ calls
     * to the api maps per user.
     *
     * @param film
     */
    private findFilmGeoLocation(film: FilmData): Promise<FilmData> {


        // Attempt to find it first in the buffer
        let location = this.findFromBuffer(film.locations);

        if (location != null) {

            film.geoLocation = location;
            return Promise.resolve(film);
        }


        // If buffer fails, attempt to find in using the
        // google API
        return this.findFromGoogleMaps(film.locations)
            .then(loc => {
                film.geoLocation = loc;
                return film;
            });
    }


    private findFromBuffer(placeName: string): GeoLocation {

        let bufferArray = GeoLocationsBuffer as {location: string, lat: number, lng: number}[];

        for (let itemKey in bufferArray) {

            let item = bufferArray[itemKey];

            if (item.location == placeName) {
                return new GeoLocation(item.lat, item.lng);
            }

        }

        return null;
    }

    /**
     * Find using the Google Maps Geocode API
     * @param placeName
     */
    private findFromGoogleMaps(placeName: string): Promise<GeoLocation> {
        console.debug("Running search for", placeName);
        return GoogleMapsService.sanFrancisco(process.env.GoogleApiKey).search(placeName)
    }
}