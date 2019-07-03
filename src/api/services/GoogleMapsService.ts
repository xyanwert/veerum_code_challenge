import {MapsService} from "./MapsService";
import {GeoLocation} from "../model/GeoLocation";
import {
    createClient,
    GeocodingRequest,
    GeocodingResult,
    GoogleMapsClient,
} from "@google/maps";

export class GoogleMapsService implements MapsService {

    static SanFranciscoBounds: any = {south: 37.707497, west: -122.508925, north: 37.834051, east: -122.354118};


    /**
     * Bias to San Francisco
     * @param apiKey
     */
    static sanFrancisco(apiKey: string): GoogleMapsService {
        return GoogleMapsService.get(apiKey, GoogleMapsService.SanFranciscoBounds)
    }

    /**
     * Bias optional
     * @param apiKey
     * @param bias
     */
    static get(apiKey: string, bias?: GeoLocation): GoogleMapsService {

        let client = createClient({
            key: apiKey,
            Promise: Promise
        });

        return new GoogleMapsService(client, bias)
    }


    /** hide */
    private constructor(private client: GoogleMapsClient, private bias?: any) {}

    /**
     *
     * @param address
     */
    search(address: string): Promise<GeoLocation> {

        let query: GeocodingRequest = {};
        query.address = address;

        if (this.bias) {
            query.bounds = this.bias;
        }

        return this.client.geocode(query).asPromise()
            .then((response)=> {

                if (response.json.status != 'OK') { // this will also check for "ZERO RESULTS"
                    console.error('cannot find location for', address, response.json.status, response.json.error_message);
                    return null;
                }

                let geoLoc: GeocodingResult = response.json.results[0];
                return new GeoLocation(geoLoc.geometry.location.lat, geoLoc.geometry.location.lng)
            })
    }
}