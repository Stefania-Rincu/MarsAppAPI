import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

interface RoversAPIData {
    id: number;
    name: string;
    landing_date: Date;
    launch_date: Date;
    status: string;
    max_sol: number;
    max_date: Date;
    total_photos: number;
    cameras: string[];
}

interface RoversResponse {
    rovers: RoversAPIData[]
}

export const fetchRovers = async () => {
    const response = await axios.get<RoversResponse>(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`);
    const roversData: RoversResponse = response.data;

    return roversData;
}