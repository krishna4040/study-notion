import express, { Application, Request, Response } from 'express'
import expressFileUpload, { Options } from 'express-fileupload'
import cookieParser from 'cookie-parser'
import cors from 'cors'
require('dotenv').config();
import { dbConnect } from './config/dbConnect'
import { cloudinaryConnect } from './config/cdConnect'

import courseRouter from './router/course'
import paymentRouter from './router/payment'
import profileRouter from './router/profile'
import userRouter from './router/user'

const app: Application & Options = express();
dbConnect();
cloudinaryConnect();

app.use(
    cors({
        origin: '*',
        credentials: true
    })
);
app.use(express.json());
app.use(expressFileUpload(
    {
        useTempFiles: true,
        tempFileDir: '/temp'
    }
));
app.use(cookieParser());

app.use('/api/auth', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/course', courseRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Home page</h1>');
});

app.listen(process.env.PORT, () => {
    console.log("App is running succsesfully at", process.env.PORT);
});