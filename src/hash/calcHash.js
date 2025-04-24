import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

const calculateHash = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');
    
    return new Promise((resolve, reject) => {
        const stream = createReadStream(filePath);
        
        stream.on('error', reject);
        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => {
            const hexHash = hash.digest('hex');
            console.log(hexHash);
            resolve(hexHash);
        });
    });
};

await calculateHash();