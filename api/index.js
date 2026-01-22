import express from "express";
import "dotenv/config";

import cors from "cors";

import categoryRouter from "./routes/category.router.js";
import expenseRouter from "./routes/expense.router.js";
import authRouter from "./routes/auth.router.js";

import { handleError } from "./middlewares/common.middleware.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use(authRouter);
app.use(categoryRouter);
app.use(expenseRouter);

app.use(handleError);

const port = process.env.PORT;
const base_url = process.env.BASE_URL;
app.listen(port, () => {
  console.log(`Server Listening on ${base_url}:${port}`);
});
