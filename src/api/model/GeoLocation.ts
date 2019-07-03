export class GeoLocation {
    latitude: number;
    longitude: number;

    constructor(lat: number, lng: number) {
        this.latitude = lat;
        this.longitude = lng;
    }

    /**
     * Create a google geo-location point
     * example: point:37.7319439,-122.5198967
     */
    asGooglePoint(): string {
        return "point:" + this.latitude + "," + this.longitude;
    }
}