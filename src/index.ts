import express, { Express } from "express";
import fileUpload from "express-fileupload"; 
import cors from "cors";
import routing from "./routing";

const app:Express = express();
const port:number = 3000;

app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 }
}));

routing(app);

app.listen(port);
