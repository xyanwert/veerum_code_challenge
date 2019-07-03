import {GeoLocation} from "../model/GeoLocation";

export interface MapsService {
    search(term: string): Promise<GeoLocation>
}