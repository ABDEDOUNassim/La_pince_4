import express from 'express';
import 'dotenv/config';
import "./models/index.js";
import HttpError from "./utils/HttpError.js";
import expenseRouter from "./router/expense.router.js";
import devUser from "./middlewares/devUser.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API online");

});

app.use(devUser);

app.use("/expense", expenseRouter);


app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});


const port = process.env.PORT;
const base_url = process.env.BASE_URL;
app.listen(port, () => {
    console.log(`Server Listening on ${base_url}:${port}`)
});
