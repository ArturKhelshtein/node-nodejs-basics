import path from 'path';
import { promises } from 'fs';
import { fileURLToPath } from 'url';

const rename = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const renameFilePath = path.join(__dirname, 'files', 'properFilename.md');

    try {
        await promises.access(renameFilePath);
        throw new Error('FS operation failed, already exist');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            if (error.message === 'FS operation failed, already exist') {
                throw error;
            }
            throw new Error('FS operation failed, unexpected');
        }
    }

    try {
        await promises.access(filePath);
        await promises.rename(filePath, renameFilePath);
    } catch (error) {
        throw new Error('FS operation failed, source file missed');
    }
};

await rename();