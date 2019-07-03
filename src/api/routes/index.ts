import {Request, Response} from "express";
const routes = require('express').Router();

routes.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
