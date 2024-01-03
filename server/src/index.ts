import express, { Application, Request, Response } from 'express'
import expressFileUpload, { Options } from 'express-fileupload'
import { JwtPayload } from 'jsonwebtoken';
require('dotenv').config();
const app: Application & Options = express();

app.use(express.json());
app.use(expressFileUpload());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Home page</h1>');
});

app.listen(process.env.PORT, () => {
    console.log("App is running succsesfully at", process.env.PORT);
});