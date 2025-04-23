import path from 'path';
import { promises } from 'fs';
import { fileURLToPath } from 'url';

const remove = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await promises.unlink(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed, the file is already deleted');
        }
        throw new Error('FS operation failed, unexpected');
    }
};

await remove();