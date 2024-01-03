import express, { Request, Response, Application } from 'express'
const app: Application = express();
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Node + Ts</h1>');
})
app.listen(4000, () => {
    console.log("app started");
});