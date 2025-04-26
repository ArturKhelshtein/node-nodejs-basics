import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';

const read = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    const readStream = createReadStream(filePath);
    readStream.pipe(process.stdout);
};

await read();