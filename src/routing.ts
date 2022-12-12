import { Express, Request, Response } from "express";
import Router, { routes, iRequest } from "./Application/router";
import { controllers } from "./Application/Controllers";

const router = new Router(routes);

controllers;

export default function routing(app:Express) {
  app.get('*', async (req:Request, res:Response) => {
    try {
      const payload:iRequest = {
        path: req.originalUrl,
        method: "GET",
        query: req.query,
        headers: req.headers
      };

      const response:any = await router.direct(payload);
      res.status(200).send(response);
    } catch (err:any) {
      res.status(err.status).json(err.stack);
    }
  });

  app.post('*', async (req:Request, res:Response) => {
    try {
      const payload:iRequest = {
        path: req.originalUrl,
        method: "POST",
        query: req.query,
        headers: req.headers,
        body: req.body,
        files: req.files
      };

      const response:any = await router.direct(payload);
      res.status(200).send(response);
    } catch (err:any) {
      res.status(err.status).json(err.stack);
    }
  });
}
