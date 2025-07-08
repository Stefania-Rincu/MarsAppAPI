import express from "express";
import { fetchRovers } from "./rovers"
import { fetchPhotos } from "./photos";
import * as dotenv from "dotenv";
import {marsJob} from "./info";
dotenv.config();

const app = express();
const port = 8000;
export const NASA_API_BASE_URL: string = `https://api.nasa.gov/mars-photos/api/v1/rovers`;

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


router.get('/rovers/:roverName/photos/:cameraType', async (req, res) => {
    const roverName: string = req.params.roverName;
    const cameraType: string = req.params.cameraType;

    try {
        const photos = await fetchPhotos(roverName, cameraType);
        res.json(photos);
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});

marsJob();


app.use('/', router);


app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
