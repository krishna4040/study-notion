import express, { Application, Request, Response } from 'express'
require('dotenv').config();
const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Home page</h1>');
});

app.listen(process.env.PORT, () => {
    console.log("App is running succsesfully at", process.env.PORT);
});