import path from 'path';
import { promises } from 'fs';
import { fileURLToPath } from 'url';

const copy = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const srcDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    try {
        await promises.access(srcDir);

        try {
            await promises.access(destDir);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }

            await promises.mkdir(destDir);
            const files = await promises.readdir(srcDir);

            for (const file of files) {
                await promises.copyFile(
                    path.join(srcDir, file),
                    path.join(destDir, file)
                );
            }
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await copy();
