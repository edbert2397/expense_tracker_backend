import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js"
import FriendRoute from "./routes/FriendRoute.js"
import ActivityRoute from "./routes/ActivityRoute.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(UserRoute);
// app.use(IncomeRoute);
// app.use(OutcomeRoute);
app.use(FriendRoute);
app.use(ActivityRoute);


const port = 8080;

app.get('/',(req,res) => {
    res.send('Hello World!');
})

app.listen(port,() => console.log(`App listening on port ${port}!`));
