import express from "express";
import { fetchRovers } from "./rovers"

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req: any, res: any) => res.send('Hello world !'));

router.get('/rovers', async (req, res) => {
    try {
        const rovers = await fetchRovers();
        res.json(rovers);
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
