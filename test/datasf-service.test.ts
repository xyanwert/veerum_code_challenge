import * as dotenv from "dotenv";
import {FilmData} from "../src/api/model/FilmData";
import {DataSFSearchService} from "../src/api/services/DataSFSearchService";
import * as fs from 'fs'
import {GeoLocation} from "../src/api/model/GeoLocation";

/**
 * Test the DATA SF data service
 */
describe('Data SF service', () => {

    beforeEach(()=> {
        dotenv.config();
    });

    /**
     * all
     */
    it ('should retrieve all data', () => {

        DataSFSearchService.get().search("Hulk")
            .then( (data: FilmData[]) => {

                // create a locations map to ensure
                // you only create a buffer with
                // unique values for `locations`
                let locationsMap: Map<string, GeoLocation> = new Map();

                // buffer data to be saved
                let buffer: {
                    location: string,
                    lat: number,
                    lng: number
                }[] = [];

                // save the data map
                data.forEach(film => {
                    locationsMap.set(film.locations, film.geoLocation);
                });

                // Create a buffer to be saved as file
                locationsMap.forEach(((loc: GeoLocation, locations: string) => {
                    buffer.push({
                        location : locations,
                        lat: loc.latitude,
                        lng: loc.longitude
                    });
                }));
                // Save it
                // fs.writeFileSync('geo-location-buffer.json', JSON.stringify(buffer));

            })
            .catch((err: any) => {
                console.error(err);
            })
    });

    /**
     * search
     */
    it('should search with term', () => {

    });


});