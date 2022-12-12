import express, { Express, Request, Response } from "express";
import Router, { routes, iRequest } from "./Application/routing";
import { controllers } from "./Application";

const app:Express = express();
const port:number = 3000;
const router = new Router(routes);

controllers;

app.get('*', async (req:Request, res:Response) => {
  try {
    const payload:iRequest = {
      path: req.originalUrl,
      method: "GET",
      query: req.query,
      headers: req.headers
    };

    const response:any = await router.direct(payload);
    res.status(200).json(response);
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
    };

    const response:any = await router.direct(payload);
    res.status(200).json(response);
  } catch (err:any) {
    res.status(err.status).json(err.stack);
  }
});

app.listen(port);
