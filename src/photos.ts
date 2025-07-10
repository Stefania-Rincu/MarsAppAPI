import axios from "axios";
import {Camera} from "./cameras";
import {Rover} from "./rovers";
import {NASA_API_BASE_URL} from "./server";

interface TrimmedPhoto {
    id: number;
    cameraName: string;
    roverName: string;
    imgSrc: string;
    earthDate: Date;
}

interface PhotoAPIData {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: Date;
    rover: Rover;
}

interface PhotoResponse {
    photos: PhotoAPIData[]
}

export const fetchPhotos = async (roverName: string, cameraType: string): Promise<TrimmedPhoto[]> => {
    const photoResponse = await axios.get<PhotoResponse>(`${NASA_API_BASE_URL}/${roverName}/photos?sol=1000&camera=${cameraType}&api_key=${process.env.API_KEY}`);
    const photos: PhotoAPIData[] = photoResponse.data.photos;

    return photos.map((photo: PhotoAPIData): TrimmedPhoto => {
        console.log(photo.camera);
        return {
            id: photo.id,
            cameraName: photo.camera.name,
            roverName: photo.rover.name,
            imgSrc: photo.img_src,
            earthDate: photo.earth_date,
        }
    });
}