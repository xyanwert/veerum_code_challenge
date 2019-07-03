import dotenv from "dotenv";
import App from "./App";
import {ApiComponent, ClientComponent} from "./components-registry";

//NOTE:
// for local development only, will read a .env to simulate
// environment variables.
// set ENV proper variables in production environment
dotenv.config();

// configuration
const port: number = parseInt(process.env.Port); // default port to listen
const app  = new App([
    ClientComponent.bootstrap("/"),
    ApiComponent.handle("/api")
], port);

app.start();