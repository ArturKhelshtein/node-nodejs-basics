import path from 'path';
import { promises } from 'fs';
import { fileURLToPath } from 'url';

const read = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        const data = await promises.readFile(filePath, { encoding: 'utf8' });
        console.log(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed, the file is missed');
        }
        throw new Error('FS operation failed, unexpected');
    }
};

await read();