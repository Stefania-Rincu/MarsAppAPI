import axios from "axios";
import cron from "node-cron";
import fs from "fs";

const automaticCall = async () => {
    try {
        const response = await axios.get(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`);
        console.log('a');
        const jsonData = JSON.stringify({timestamp: new Date().toISOString(), response: response.data}, null, 4);

        fs.writeFileSync(`data${new Date().getTime()}.json`, jsonData, {flag: 'w'});
    } catch (error) {
        const jsonData = JSON.stringify({timestamp: new Date().toISOString(), response: error}, null, 4);

        fs.writeFileSync(`data${new Date().getTime()}.json`, jsonData, {flag: 'w'});
    }

}

export function marsJob() {
    cron.schedule("*/1 * * * *", async () => {
       await automaticCall()
    });
}
