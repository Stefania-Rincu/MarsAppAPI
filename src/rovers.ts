import axios from "axios";
import { NASA_API_BASE_URL } from "./server";

export interface Rover {
    id: number;
    name: string;
    landingDate: Date;
    launchDate: Date;
    status: string;
    totalPhotos: number;
}

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

export const fetchRovers = async (): Promise<Rover[]> => {
    const response = await axios.get<RoversResponse>(`${NASA_API_BASE_URL}?api_key=${process.env.API_KEY}`);
    const roversData: RoversAPIData[] = response.data.rovers;

    return roversData.map((rover: RoversAPIData): Rover => {
        return {
            id: rover.id,
            name: rover.name,
            landingDate: rover.landing_date,
            launchDate: rover.launch_date,
            status: rover.status,
            totalPhotos: rover.total_photos
        }
    });
}