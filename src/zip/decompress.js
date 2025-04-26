import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const decompress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const srcPath = path.join(__dirname, 'files', 'archive.gz');
    const destPath = path.join(__dirname, 'files', 'fileToCompress.txt');

    try {
        const readStream = createReadStream(srcPath);
        const writeStream = createWriteStream(destPath);
        const unzip = createUnzip();

        await pipeline(readStream, unzip, writeStream);
        console.log('File decompressed successfully');
    } catch (err) {
        throw new Error('An error occurred:', err);
    }
};

await decompress();