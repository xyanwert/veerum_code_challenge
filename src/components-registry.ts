import {Component, Controller, StaticComponent} from "./App";
import express from 'express'
import {MoviesController} from "./api/controllers/MoviesController";

/**
 * API
 */
export class ApiComponent implements Component {

    static handle(basePath: string): ApiComponent {

        return new ApiComponent(basePath, [
            MoviesController.handle("/movies"),
        ]);
    }

    private constructor(private basePath: string, private controllers: Controller[]) {}

    initializeControllers(app: express.Application): void {
        this.controllers.forEach(controller => {
            app.use(this.basePath, controller.router);
        });
    }
}

/**
 * Client
 */
export class ClientComponent extends StaticComponent {

    static bootstrap(basePath: string): StaticComponent {
        return new ClientComponent(basePath, 'client');
    }
}