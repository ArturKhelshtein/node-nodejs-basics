import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const compress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const srcPath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destPath = path.join(__dirname, 'files', 'archive.gz');

    try {
        const readStream = createReadStream(srcPath);
        const writeStream = createWriteStream(destPath);
        const gzip = createGzip();

        await pipeline(readStream, gzip, writeStream);
        console.log('File compressed successfully');
    } catch (err) {
        throw new Error('An error occurred:', err);
    }
};

await compress();