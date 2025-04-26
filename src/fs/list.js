import path from 'path';
import { promises } from 'fs';
import { fileURLToPath } from 'url';

const list = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const srcDir = path.join(__dirname, 'files');

    try {
        const files = await promises.readdir(srcDir);
        console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed, source folder missed');
        }
        throw new Error('FS operation failed, unexpected');
    }
};

await list();