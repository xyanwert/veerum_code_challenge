import {GoogleMapsService} from "../src/api/services/GoogleMapsService";
import {GeoLocation} from "../src/api/model/GeoLocation";
import * as dotenv from "dotenv";

describe('Google Geo-location service', () => {

    beforeEach(()=> {
        dotenv.config();
    });

    it('will find the right location', () => {

        GoogleMapsService.sanFrancisco(process.env.GoogleApiKey)
            .search("Embarcadero Freeway")
            .then( (geo: GeoLocation) => {
                console.debug(geo);
            })
            .catch(err => {
                console.error(err);
            })
    });
});