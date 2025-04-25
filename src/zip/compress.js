import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream, } from 'fs';
import process from 'node:process';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';

const compress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const srcDir = createReadStream(path.join(__dirname, 'files', 'fileToCompress.txt'));
    const destDir = createWriteStream(path.join(__dirname, 'files', 'archive.gz'));
    const gzip = createGzip();
    
    pipeline(srcDir, gzip, destDir, (err) => {
        if (err) {
          console.error('An error occurred:', err);
          process.exitCode = 1;
        }
      });
};

await compress();