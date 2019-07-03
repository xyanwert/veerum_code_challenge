import * as url from "url";
import * as https from "https";
import {IncomingMessage} from "http";
import request = require("request");



export class SimpleHttpGet {
    static get(): SimpleHttpGet {
        return new SimpleHttpGet()
    }

    /** hide */
    private constructor() {}

    from<T>(urlString: string, queryParameters? : any): Promise<T> {

        return new Promise<T>((resolve, reject) => {

            request({uri: urlString, qs: queryParameters}, ((error, response, body) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(body) as T)
                }

            }));
        });
    }
}

