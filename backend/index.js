import express from "express";
import cors from "cors";
import sql from "mysql2";
import bodyParser from "body-parser";
import { UserRouter } from "./routes/usersRoute.js";
import { config } from "dotenv";
import { BlogRouter } from "./routes/blogsRoute.js";

const app = express();

config();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = 9990;
export const db = sql.createConnection({
    host: "127.0.0.1",
    user: "psk",
    password: process.env.USER_PASSWORD,
    database: "nodejs_react",
});

//userRoute
app.use(UserRouter);
app.use("/blogs", BlogRouter);

app.listen(port, () => {
    if (db) {
        console.log("Connected to database");
    } else {
        console.error("Error connecting to the database");
    }
});
