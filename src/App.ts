import express from 'express';
import morgan = require("morgan");
import {RequestHandler} from "express";
import * as path from "path";
import * as fs from "fs";
// const cors = require('cors');
const helmet = require('helmet');
const rfs = require('rotating-file-stream');


export default class App {
    public app: express.Application;
    public port: number;

    constructor(components: Component[], port: number) {
        this.app = express();
        this.port = port;
        this.initializeMiddleware();
        this.initializeComponents(components);
    }

    private initializeMiddleware() {
        this.app.use(helmet());
        this.app.use(express.json({
            limit: '2mb'
        })); // parse request body

        //TODO: implement CORS if needed
        // this.app.use(cors());

        this.initializeLogs();

    }

    private initializeLogs() {
        const logDirectory = path.join(__dirname, 'log');

        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        let accessLogStream = rfs('server.log', {
            interval: '1d', // rotate daily
            path: logDirectory
        });

        this.app.use(morgan('combined', { stream: accessLogStream }));

    }

    private initializeComponents(component: Component[]) {
        component.forEach((component: Component) => {
            component.initializeControllers(this.app);
        });
    }

    public start() {
        require("http").createServer(this.app)
            .listen(this.port, () => {
                console.info('Server started successfully on port ' + this.port);
            });
    }

}



//TODO:
// this can be a completely separated SDK
/**
 * Component interface
 * every component must comply to this interface
 * it will allow it to handle give paths
 */
export interface Component {
    initializeControllers(app: express.Application): void;
}

/**
 * Compoinent for static content
 */
export abstract class StaticComponent implements Component {

    protected constructor(private path: string, private resourceName: string) {
    }

    initializeControllers(app: express.Application): void {
        app.use(this.path, express.static('dist/' + this.resourceName));
    }
}

/**
 * Controller class
 * Every controller must extend this class
 * it will allow them to handle a give route
 */
export abstract class Controller {
    path: string;
    router: express.Router;

    protected constructor(path: string) {
        this.path = path;
        this.router = express.Router();
    }

    abstract initializeRoutes(): void;

    handle(subPath: string, handler: RequestHandler) {
        this.router.get(this.path + subPath, handler);
    }
}


