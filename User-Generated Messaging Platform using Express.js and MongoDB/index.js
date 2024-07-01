import express from 'express';
import dotenv from "dotenv";
import router from './Router/Routes.js';
import { data } from './Db/Db.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
data();

app.use(router)

app.listen(port, () => {
    console.log(`server run port on ${port}`)
})