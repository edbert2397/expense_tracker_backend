import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js"
import FriendRoute from "./routes/FriendRoute.js"
import ActivityRoute from "./routes/ActivityRoute.js"
import AuthRoute from "./routes/AuthRoute.js"
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressSession from 'express-session';
import { PrismaClient } from "@prisma/client";
dotenv.config();

const app = express();

app.use(expressSession({
    cookie:{
        maxAge: 24*60*60*1000
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUnintialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))


app.use(cors());
app.use(express.json());

app.use(UserRoute);
app.use(AuthRoute);   
app.use(FriendRoute);
app.use(ActivityRoute);

const port = 8080;

app.get('/',(req,res) => {
    res.send('Hello World!');
})

app.listen(port,() => console.log(`App listening on port ${port}!`));
