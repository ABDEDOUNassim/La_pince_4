import express from 'express';
import 'dotenv/config';

const app = express();


app.get("/", (req, res) => {
    res.send("API online");
});


const port = process.env.PORT;
const base_url = process.env.BASE_URL;
app.listen(port, () => {
    console.log(`Server Listening on ${base_url}:${port}`)
});