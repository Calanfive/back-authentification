import express from "express";
import 'dotenv/config';
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030

app.get('/random-between/:min/:max', (req, res) => {
    const min = parseInt(req.params.min)
    const max = parseInt(req.params.max)
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('number' + random);
    res.send(random.toString())
})

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})