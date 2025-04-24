import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'node:fs/promises';
import { createHash } from 'crypto';

const calculateHash = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    try {
        const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
        const fileContent = await readFile(filePath);
        const hash = createHash('sha256');
        hash.update(fileContent);
        const hexHash = hash.digest('hex');
        console.log(hexHash);
    } catch (error) {
        throw new Error('Operation failed');
    }
    
};

await calculateHash();