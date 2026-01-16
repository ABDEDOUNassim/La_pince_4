import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import categoryRouter from './routes/category.router.js'; 

import { handleError } from './middlewares/common.middleware.js';

const app = express();

// Here CORS is enable for Frontend port. If cors() is called with no argument, CORS is enabled for all origin
app.use(cors({origin: "http://localhost:5173"}));
// To use json in request body
app.use(express.json()); 

///// Routers /////
app.use(categoryRouter);
///// End routers //////

app.use(handleError);

const port = process.env.PORT;
const base_url = process.env.BASE_URL;
app.listen(port, () => {
    console.log(`Server Listening on ${base_url}:${port}`)
});