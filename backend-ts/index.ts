import express, { Express, Request, Response} from "express"
// import dotenv from 'dotenv'

const app: Express = express();
const port = 5000;

app.get("/", (req : express.Request, res : express.Response) => {
    console.log(req);
    res.send("start");
})

app.listen(4000, () => console.log("start"));