import fs from 'fs';
import axios from 'axios';

export default class FileUtil {
    public static async download(url: string, savePath: string) {
        const writer = fs.createWriteStream(savePath);
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
        });
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
}
