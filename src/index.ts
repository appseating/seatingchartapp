import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();
const buildPath: string = path.join(__dirname, '..', 'web-app', 'build');

console.log('using web-app build path: ', buildPath);

app.use(express.static(buildPath));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
