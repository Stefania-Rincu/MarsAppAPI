import axios from "axios";

export interface Rover {
    id: number;
    name: string;
    landingDate: Date;
    launchDate: Date;
    status: string;
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

export const fetchRovers = async () => {
    const response = await axios.get<RoversResponse>(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`);
    const roversData = response.data.rovers;

    const rovers: Rover[] = roversData.map(rover => {
        return {
            id: rover.id,
            name: rover.name,
            landingDate: rover.landing_date,
            launchDate: rover.launch_date,
            status: rover.status,
            total_photos: rover.total_photos
        }
    })

    return rovers;
}